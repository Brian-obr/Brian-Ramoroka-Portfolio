"""Compare a capture against the baseline. Exit 1 on any visual, SEO or axe regression.

Usage: python -I diff.py <baseline_dir> <new_dir>

- Screenshots: byte-identical PNGs mean 0 changed pixels (both runs use the same encoder).
- SEO: every field in seo.json and site.json must match, except html_bytes and html_sha256
  (chunk hashes change with any code edit) and requested_paths.
- axe: no violation may appear that the baseline did not have.
"""
import hashlib
import json
import sys
from pathlib import Path

base, new = Path(sys.argv[1]), Path(sys.argv[2])
fail = False

names = sorted(p.name for p in (base / "shots").glob("*.png"))
changed = [n for n in names if not (new / "shots" / n).exists()
           or hashlib.sha256((base / "shots" / n).read_bytes()).digest() != hashlib.sha256((new / "shots" / n).read_bytes()).digest()]
extra = sorted(p.name for p in (new / "shots").glob("*.png") if p.name not in names)
print(f"screenshots: {len(names)} compared, {len(changed)} changed, {len(extra)} new")
for n in changed:
    print("  CHANGED", n)
fail |= bool(changed)

IGNORE = {"html_bytes", "html_sha256", "requested_paths"}


def strip_hashes(v):
    """Chunk and asset file names carry a build hash; compare everything else."""
    if isinstance(v, dict):
        return {k: strip_hashes(x) for k, x in v.items() if k not in IGNORE}
    if isinstance(v, list):
        return [strip_hashes(x) for x in v]
    if isinstance(v, str) and "/_next/static/" in v:
        return "/_next/static/<hashed>"
    return v


def walk(a, b, path=""):
    out = []
    if isinstance(a, dict) and isinstance(b, dict):
        for k in sorted(set(a) | set(b)):
            out += walk(a.get(k, "<missing>"), b.get(k, "<missing>"), f"{path}/{k}")
    elif a != b:
        out.append((path, a, b))
    return out


for name in ("seo.json", "site.json"):
    if not (new / name).exists():
        print(f"{name}: MISSING from the new run")
        fail = True
        continue
    d = walk(strip_hashes(json.loads((base / name).read_text())), strip_hashes(json.loads((new / name).read_text())))
    print(f"{name}: {len(d)} differences")
    for path, a, b in d:
        print(f"  {path}\n    was: {json.dumps(a)[:300]}\n    now: {json.dumps(b)[:300]}")
    fail |= bool(d)

if not (new / "axe.json").exists():
    print("axe.json: MISSING from the new run")
    fail = True
else:
    a, b = json.loads((base / "axe.json").read_text()), json.loads((new / "axe.json").read_text())
    added = [(k, v["id"]) for k, vs in b.items() for v in vs if v["id"] not in {x["id"] for x in a.get(k, [])}]
    print(f"axe: {sum(len(v) for v in a.values())} violations before, {sum(len(v) for v in b.values())} now, {len(added)} new")
    for k, i in added:
        print("  NEW", k, i)
    fail |= bool(added)

sys.exit(1 if fail else 0)
