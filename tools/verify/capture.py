"""Capture a snapshot of the local production build for the cleanup run.

Usage: python -I capture.py <base_url> <out_dir> <axe.min.js> [--shots-only]

Writes, under <out_dir>:
  shots/*.png        full-page screenshots (routes) and viewport screenshots (states)
  seo.json           per route: status, head tags, JSON-LD, H1 to H3, internal links, headers
  site.json          sitemap.xml, robots.txt, llms.txt, redirects
  axe.json           axe violations per route/state, viewport and theme
  network.json       per route at 390 and 1440: requests with transfer bytes by type
  images.json        per route and viewport: every <img> with intrinsic and rendered size
  css-coverage.json  per stylesheet: rules never used on any route, state, viewport or theme
  js-coverage.json   per route: script bytes used and total (1440, light)
  inp.json           event-timing durations for real interactions, CPU throttled 4x
"""
import hashlib
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright

BASE = sys.argv[1].rstrip("/")
OUT = Path(sys.argv[2])
AXE = Path(sys.argv[3]).read_text()
SHOTS_ONLY = "--shots-only" in sys.argv

ROUTES = ["/", "/about", "/experience", "/skills", "/contact", "/privacy", "/portfolio"]
EXTRA = ["/this-page-does-not-exist", "/thank-you", "/freelance-web-developer-cape-town", "/website-health-check"]
REDIRECTS = ["/services", "/work", "/portfolio/some-project"]
VIEWPORTS = {"390": (390, 844), "1440": (1440, 900)}
THEMES = ["light", "dark"]
SITE = "https://brianramoroka.co.za"


def slug(route):
    return "home" if route == "/" else route.strip("/").replace("/", "_")


class Head(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = None
        self.meta = {}
        self.links = {}
        self.jsonld = []
        self.headings = []
        self.anchors = []
        self.h1 = 0
        self._cap = None
        self._buf = []
        self._a = None
        self.lang = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if tag == "title" and self.title is None:
            self._cap, self._buf = "title", []
        elif tag == "meta":
            key = a.get("name") or a.get("property")
            if key and "content" in a:
                self.meta.setdefault(key, []).append(a["content"])
        elif tag == "link" and a.get("rel") in ("canonical", "alternate", "manifest", "icon", "apple-touch-icon", "preload", "preconnect", "dns-prefetch"):
            self.links.setdefault(a["rel"], []).append({k: v for k, v in a.items() if k != "rel"})
        elif tag == "script" and a.get("type") == "application/ld+json":
            self._cap, self._buf = "ld", []
        elif tag in ("h1", "h2", "h3"):
            self._cap, self._buf = tag, []
        elif tag == "a" and a.get("href") is not None and self._cap not in ("h1", "h2", "h3"):
            self._a = {"href": a["href"], "rel": a.get("rel"), "text": ""}
        elif tag == "a" and a.get("href") is not None:
            self.anchors.append({"href": a["href"], "rel": a.get("rel"), "text": "(in heading)"})

    def handle_data(self, data):
        if self._cap:
            self._buf.append(data)
        if self._a is not None:
            self._a["text"] += data

    def handle_endtag(self, tag):
        if self._cap == "title" and tag == "title":
            self.title = "".join(self._buf).strip()
            self._cap = None
        elif self._cap == "ld" and tag == "script":
            raw = "".join(self._buf)
            try:
                self.jsonld.append(json.loads(raw))
            except Exception as e:  # keep the proof that a block failed to parse
                self.jsonld.append({"_parse_error": str(e), "_raw": raw[:300]})
            self._cap = None
        elif self._cap in ("h1", "h2", "h3") and tag == self._cap:
            self.headings.append([tag, re.sub(r"\s+", " ", "".join(self._buf)).strip()])
            self._cap = None
        elif tag == "a" and self._a is not None:
            self._a["text"] = re.sub(r"\s+", " ", self._a["text"]).strip()
            self.anchors.append(self._a)
            self._a = None


def seo_snapshot(ctx, route):
    r = ctx.request.get(BASE + route, max_redirects=0, headers={"Accept-Encoding": "gzip, br"})
    html = r.text()
    h = Head()
    h.feed(html)
    internal = []
    for a in h.anchors:
        href = a["href"]
        if href.startswith("/") or href.startswith(SITE) or href.startswith("#"):
            internal.append([href, a["text"]])
    hdr = r.headers
    return {
        "status": r.status,
        "lang": h.lang,
        "title": h.title,
        "description": h.meta.get("description"),
        "robots": h.meta.get("robots"),
        "canonical": [x.get("href") for x in h.links.get("canonical", [])],
        "og": {k: v for k, v in h.meta.items() if k.startswith("og:")},
        "twitter": {k: v for k, v in h.meta.items() if k.startswith("twitter:")},
        "other_meta": {k: v for k, v in h.meta.items() if not k.startswith(("og:", "twitter:")) and k not in ("description", "robots")},
        "head_links": {k: v for k, v in h.links.items() if k != "canonical"},
        "jsonld": h.jsonld,
        "headings": h.headings,
        "internal_links": sorted(internal),
        "external_links": sorted({a["href"] for a in h.anchors if a["href"].startswith("http") and not a["href"].startswith(SITE)}),
        "html_bytes": len(html.encode()),
        "html_sha256": hashlib.sha256(html.encode()).hexdigest(),
        "headers": {k: hdr.get(k) for k in ("content-type", "cache-control", "content-encoding", "content-security-policy", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy", "strict-transport-security", "x-powered-by", "vary")},
    }


def settle(page):
    """Load everything a visitor would see: fonts, lazy images, then back to the top."""
    page.wait_for_load_state("networkidle")
    page.evaluate("document.fonts.ready.then(() => 1)")
    page.evaluate(
        """async () => {
            const h = document.documentElement.scrollHeight;
            for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
            window.scrollTo(0, 0);
            // Images in hidden panels never load, so only wait for the ones that are laid out, and never forever.
            const pending = [...document.images].filter(i => !i.complete && i.getBoundingClientRect().width > 0);
            await Promise.race([Promise.all(pending.map(i => new Promise(r => { i.onload = i.onerror = r; }))), new Promise(r => setTimeout(r, 5000))]);
        }"""
    )
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(250)


def run_axe(page):
    page.evaluate(AXE)
    res = page.evaluate(
        "axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}})"
    )
    return [
        {"id": v["id"], "impact": v["impact"], "help": v["help"], "nodes": [{"target": n["target"], "html": n["html"][:200]} for n in v["nodes"]]}
        for v in res["violations"]
    ]


IMG_JS = """() => [...document.images].map(i => {
  const r = i.getBoundingClientRect();
  return {src: i.getAttribute('src'), currentSrc: i.currentSrc, alt: i.alt, naturalW: i.naturalWidth, naturalH: i.naturalHeight,
    cssW: Math.round(r.width), cssH: Math.round(r.height), top: Math.round(r.top + scrollY), visible: r.width > 0 && r.height > 0,
    loading: i.getAttribute('loading'), fetchpriority: i.getAttribute('fetchpriority'), decoding: i.getAttribute('decoding'),
    sizes: i.getAttribute('sizes'), hasSrcset: !!i.getAttribute('srcset'), widthAttr: i.getAttribute('width'), heightAttr: i.getAttribute('height')};
})"""


class Coverage:
    """Union of used CSS rules across every page load, keyed by stylesheet URL."""

    def __init__(self):
        self.text = {}
        self.used = {}
        self.all = {}

    def start(self, page):
        s = page.context.new_cdp_session(page)
        s.send("DOM.enable")
        s.send("CSS.enable")
        s.send("CSS.startRuleUsageTracking")
        return s

    def stop(self, s):
        res = s.send("CSS.stopRuleUsageTracking")
        ids = {}
        for u in res["ruleUsage"]:
            sid = u["styleSheetId"]
            if sid not in ids:
                try:
                    txt = s.send("CSS.getStyleSheetText", {"styleSheetId": sid})["text"]
                except Exception:
                    txt = None
                ids[sid] = txt
            txt = ids[sid]
            if txt is None:
                continue
            key = hashlib.sha256(txt.encode()).hexdigest()[:12]
            self.text[key] = txt
            rng = (int(u["startOffset"]), int(u["endOffset"]))
            self.all.setdefault(key, set()).add(rng)
            if u["used"]:
                self.used.setdefault(key, set()).add(rng)
        s.detach()

    def report(self):
        """CDP only returns the rules that were used, so unused rules are found by scanning the stylesheet text."""
        out = {}
        for key, txt in self.text.items():
            used = sorted(self.used.get(key, set()))
            starts = {s for s, _ in used}
            rules, stack, i, prelude_start = [], [], 0, 0
            in_str = None
            while i < len(txt):
                c = txt[i]
                if in_str:
                    if c == "\\":
                        i += 1
                    elif c == in_str:
                        in_str = None
                elif c in "\"'":
                    in_str = c
                elif txt.startswith("/*", i):
                    i = txt.index("*/", i) + 1
                elif c == "{":
                    prelude = txt[prelude_start:i].strip()
                    skip = any(f["skip"] for f in stack) or prelude.startswith(("@keyframes", "@font-face", "@property"))
                    stack.append({"start": prelude_start + (len(txt[prelude_start:i]) - len(txt[prelude_start:i].lstrip())), "prelude": prelude, "skip": skip, "kids": 0})
                    prelude_start = i + 1
                elif c == "}":
                    f = stack.pop()
                    if stack:
                        stack[-1]["kids"] += 1
                    if not f["skip"] and not f["prelude"].startswith("@") and f["kids"] == 0:
                        ctx = " ".join(x["prelude"] for x in stack if x["prelude"].startswith("@"))
                        rules.append({"start": f["start"], "end": i + 1, "selector": f["prelude"], "context": ctx})
                    prelude_start = i + 1
                elif c == ";" :
                    prelude_start = i + 1
                i += 1
            unused = [r for r in rules if r["start"] not in starts]
            out[key] = {
                "bytes": len(txt.encode()),
                "style_rules": len(rules),
                "used_ranges": len(used),
                "matched": len(rules) - len(unused),
                "unused_rules": len(unused),
                "unused_bytes": sum(r["end"] - r["start"] for r in unused),
                "unused": [{"selector": r["selector"][:200], "context": r["context"][:120], "bytes": r["end"] - r["start"]} for r in unused],
                "text": txt,
            }
        return out


def main():
    (OUT / "shots").mkdir(parents=True, exist_ok=True)
    seo, axe, network, images, jscov, inp = {}, {}, {}, {}, {}, {}
    requested = set()
    cov = Coverage()

    with sync_playwright() as p:
        browser = p.chromium.launch()

        def context(vp, theme, dpr=1):
            w, h = VIEWPORTS[vp]
            ctx = browser.new_context(viewport={"width": w, "height": h}, color_scheme=theme, reduced_motion="reduce",
                                      device_scale_factor=dpr, has_touch=(vp == "390"), is_mobile=(vp == "390"))
            # Never contact a third party from a baseline run.
            ctx.set_default_timeout(20000)
            ctx.route(lambda url: urlparse(url).hostname not in ("localhost", "127.0.0.1"), lambda r: r.abort())
            return ctx

        def shot(page, name, full=True):
            page.screenshot(path=str(OUT / "shots" / f"{name}.png"), full_page=full, animations="disabled", caret="hide")

        # 1. Routes: screenshots, axe and CSS coverage in every viewport and theme.
        for vp in VIEWPORTS:
            for theme in THEMES:
                ctx = context(vp, theme)
                for route in ROUTES + EXTRA:
                    page = ctx.new_page()
                    page.on("request", lambda rq: requested.add(urlparse(rq.url).path))
                    s = cov.start(page)
                    page.goto(BASE + route)
                    settle(page)
                    shot(page, f"route_{slug(route)}_{vp}_{theme}")
                    if not SHOTS_ONLY:
                        axe[f"{route}|{vp}|{theme}"] = run_axe(page)
                    cov.stop(s)
                    page.close()

                # 2. States on the home page and /contact.
                page = ctx.new_page()
                s = cov.start(page)
                page.goto(BASE + "/")
                settle(page)
                page.keyboard.press("Tab")
                page.keyboard.press("Tab")
                shot(page, f"state_focus-2tabs_{vp}_{theme}", full=False)
                page.locator("[data-cv-open]:visible").first.click()
                page.wait_for_timeout(300)
                shot(page, f"state_cv-dialog_{vp}_{theme}", full=False)
                if not SHOTS_ONLY:
                    axe[f"state:cv-dialog|{vp}|{theme}"] = run_axe(page)
                page.keyboard.press("Escape")
                page.wait_for_timeout(200)
                tabs = page.locator('[role="tab"]')
                if tabs.count() > 1:
                    tabs.nth(1).scroll_into_view_if_needed()
                    tabs.nth(1).click()
                    page.wait_for_timeout(300)
                    shot(page, f"state_project-tab-2_{vp}_{theme}", full=False)
                    if not SHOTS_ONLY:
                        axe[f"state:project-tab-2|{vp}|{theme}"] = run_axe(page)
                if vp == "390":
                    page.evaluate("window.scrollTo(0, 0)")
                    page.locator('[aria-controls="mobile-menu"]').click()
                    page.wait_for_timeout(300)
                    shot(page, f"state_nav-open_{vp}_{theme}", full=False)
                    if not SHOTS_ONLY:
                        axe[f"state:nav-open|{vp}|{theme}"] = run_axe(page)
                else:
                    page.evaluate("window.scrollTo(0, 0)")
                    page.locator('nav[aria-label="Main"] a').nth(1).hover()
                    page.wait_for_timeout(300)
                    shot(page, f"state_nav-hover_{vp}_{theme}", full=False)
                cov.stop(s)
                page.close()

                page = ctx.new_page()
                s = cov.start(page)
                page.goto(BASE + "/contact")
                settle(page)
                form = page.locator("form").first
                form.locator('button[type="submit"]').click()
                page.wait_for_timeout(400)
                shot(page, f"state_contact-errors_{vp}_{theme}")
                if not SHOTS_ONLY:
                    axe[f"state:contact-errors|{vp}|{theme}"] = run_axe(page)
                cov.stop(s)
                page.close()
                ctx.close()

        if SHOTS_ONLY:
            browser.close()
            (OUT / "css-coverage.json").write_text(json.dumps(cov.report(), indent=1))
            return

        # 3. SEO snapshot from the raw HTML (what a crawler gets first).
        ctx = context("1440", "light")
        for route in ROUTES + EXTRA:
            seo[route] = seo_snapshot(ctx, route)
        site = {"redirects": {}}
        for path in ("/sitemap.xml", "/robots.txt", "/llms.txt", "/manifest.webmanifest", "/.well-known/security.txt"):
            r = ctx.request.get(BASE + path)
            site[path] = {"status": r.status, "content-type": r.headers.get("content-type"), "cache-control": r.headers.get("cache-control"), "body": r.text()}
        for path in REDIRECTS:
            r = ctx.request.get(BASE + path, max_redirects=0)
            site["redirects"][path] = {"status": r.status, "location": r.headers.get("location")}
        ctx.close()

        # 4. Network and images, at DPR 2 (the prompt's "rendered size times 2").
        for vp in VIEWPORTS:
            ctx = context(vp, "light", dpr=2)
            for route in ROUTES:
                page = ctx.new_page()
                reqs = []

                def done(rq, reqs=reqs):
                    try:
                        sz = rq.sizes()
                        resp = rq.response()
                        reqs.append({"url": rq.url.replace(BASE, ""), "type": rq.resource_type, "status": resp.status if resp else None,
                                     "transfer": sz["responseBodySize"] + sz["responseHeadersSize"], "body": sz["responseBodySize"],
                                     "content-type": resp.headers.get("content-type") if resp else None,
                                     "cache-control": resp.headers.get("cache-control") if resp else None,
                                     "content-encoding": resp.headers.get("content-encoding") if resp else None})
                    except Exception as e:
                        reqs.append({"url": rq.url.replace(BASE, ""), "error": str(e)})

                page.on("requestfinished", done)
                failed = []
                page.on("requestfailed", lambda rq, failed=failed: failed.append(rq.url.replace(BASE, "")))
                page.goto(BASE + route)
                page.wait_for_load_state("networkidle")
                page.wait_for_timeout(500)
                initial = list(reqs)
                settle(page)
                page.wait_for_timeout(500)
                by_type = {}
                for r in initial:
                    by_type[r.get("type", "?")] = by_type.get(r.get("type", "?"), 0) + r.get("transfer", 0)
                network[f"{route}|{vp}"] = {"initial_total": sum(r.get("transfer", 0) for r in initial), "initial_by_type": by_type,
                                             "after_scroll_total": sum(r.get("transfer", 0) for r in reqs), "requests": reqs, "failed": failed}
                images[f"{route}|{vp}"] = page.evaluate(IMG_JS)
                page.close()
            ctx.close()

        # 5. JS coverage per route (1440, light).
        ctx = context("1440", "light")
        for route in ROUTES:
            page = ctx.new_page()
            s = ctx.new_cdp_session(page)
            s.send("Profiler.enable")
            s.send("Profiler.startPreciseCoverage", {"callCount": False, "detailed": True})
            page.goto(BASE + route)
            settle(page)
            res = s.send("Profiler.takePreciseCoverage")["result"]
            per = {}
            for sc in res:
                url = sc["url"]
                if "/_next/" not in url:
                    continue
                total = max((r["endOffset"] for f in sc["functions"] for r in f["ranges"]), default=0)
                unused = bytearray(total)
                for f in sc["functions"]:
                    for r in sorted(f["ranges"], key=lambda r: r["endOffset"] - r["startOffset"], reverse=True):
                        v = 0 if r["count"] > 0 else 1
                        unused[r["startOffset"]:r["endOffset"]] = bytes([v]) * (r["endOffset"] - r["startOffset"])
                per[url.replace(BASE, "")] = {"chars": total, "unused_chars": sum(unused)}
            jscov[route] = per
            page.close()
        ctx.close()

        # 6. Interaction timing (INP proxy): phone viewport, CPU throttled 4x.
        ctx = context("390", "light")
        page = ctx.new_page()
        s = ctx.new_cdp_session(page)
        page.goto(BASE + "/")
        settle(page)
        s.send("Emulation.setCPUThrottlingRate", {"rate": 4})
        page.evaluate("""() => { window.__ev = []; new PerformanceObserver(l => { for (const e of l.getEntries()) if (e.interactionId) window.__ev.push({name: e.name, duration: e.duration, id: e.interactionId}); }).observe({type: 'event', durationThreshold: 16, buffered: true}); }""")
        steps = {}

        def interact(name, fn):
            page.evaluate("window.__ev = []")
            fn()
            page.wait_for_timeout(700)
            ev = page.evaluate("window.__ev")
            steps[name] = max((e["duration"] for e in ev), default=None)

        interact("open CV chooser", lambda: page.locator("[data-cv-open]:visible").first.tap())
        interact("close CV chooser (Escape)", lambda: page.keyboard.press("Escape"))
        tabs = page.locator('[role="tab"]')
        if tabs.count() > 1:
            tabs.nth(1).scroll_into_view_if_needed()
            interact("switch project tab", lambda: tabs.nth(1).tap())
        page.evaluate("window.scrollTo(0, 0)")
        interact("open phone menu", lambda: page.locator('[aria-controls="mobile-menu"]').tap())
        inp = {"note": "max event-timing duration (ms) per interaction, 390x844, CPU 4x, durations under 16 ms are not reported by the browser (null)", "steps": steps}
        ctx.close()
        browser.close()

    site["requested_paths"] = sorted(requested)
    for name, data in (("seo", seo), ("site", site), ("axe", axe), ("network", network), ("images", images),
                       ("css-coverage", cov.report()), ("js-coverage", jscov), ("inp", inp)):
        (OUT / f"{name}.json").write_text(json.dumps(data, indent=1, sort_keys=True))
    print("done", len(list((OUT / 'shots').glob('*.png'))), "screenshots")


main()
