"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { IMAGE_QUALITY } from "@/lib/image-quality";
import { CONTACT } from "@/lib/site";

// Projects: one browser window (V7). Each tab is a project and swaps the details beside it.
// ARIA tabs with roving tabindex: arrow keys, Home and End move between tabs.
const PROJECTS = [
  {
    id: "breezy",
    tab: "The Breezy Exchange",
    url: "dev-the-breezy-exchange.pantheonsite.io",
    shot: "/images/work/breezy-exchange-desktop-wide.webp",
    alt: "The Breezy Exchange home page on desktop: brand menu, sneaker search, an Air Jordan 4 banner and the UK size and condition picker",
  },
  {
    id: "site",
    tab: "brianramoroka.co.za",
    url: "brianramoroka.co.za",
    shot: "/images/work/brianramoroka-desktop-wide.webp",
    alt: "The brianramoroka.co.za home page on desktop: name, introduction, two buttons and a portrait photo",
  },
];

export default function ProjectTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number, focus = false) => {
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = PROJECTS.length;
    const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <div className="pone">
      <div className="win">
        <div className="win-tabs">
          <span className="dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <div role="tablist" aria-label="Projects">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`pt-${p.id}`}
                aria-controls={`pp-${p.id}`}
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <i aria-hidden="true" />
                {/* Break before "co.za" when the name wraps on phones */}
                {p.tab.includes(".") ? (
                  <>
                    {p.tab.slice(0, p.tab.indexOf(".") + 1)}
                    <wbr />
                    {p.tab.slice(p.tab.indexOf(".") + 1)}
                  </>
                ) : (
                  p.tab
                )}
              </button>
            ))}
          </div>
        </div>
        {PROJECTS.map((p, i) => (
          <div key={p.id} role="tabpanel" id={`pp-${p.id}`} aria-labelledby={`pt-${p.id}`} hidden={active !== i}>
            <div className="win-url" aria-hidden="true">
              <span>{p.url}</span>
            </div>
            {/* Each tab shows a desktop screenshot of the project (both retaken 01/11/2026) */}
            <div className="view">
              <Image
                src={p.shot}
                alt={p.alt}
                width={1500}
                height={1130}
                // Measured 10/11/2026: 593px wide from 1160px up, 49 to 51vw between 900 and 1159px.
                sizes="(min-width: 1160px) 593px, (min-width: 900px) 52vw, 100vw"
                quality={IMAGE_QUALITY.screenshot}
              />
            </div>
          </div>
        ))}
      </div>

      <div aria-live="polite">
        {active === 0 ? (
          <div className="pinfo">
            <p className="font-semibold">WooCommerce demo store (personal project)</p>
            <h3>
              The Breezy Exchange <span className="badge">In progress</span>
            </h3>
            <p>
              A WooCommerce sneaker store I&apos;m building to show how I&apos;d set up a South African resale shop. It&apos;s a
              demo, so it never takes real orders.
            </p>
            <ul className="ticks">
              <li>Pick a UK size and a condition grade and go straight to the matching pairs</li>
              <li>Each grade has its own price in rand, VAT included</li>
              <li>Brand and model line in every collection URL</li>
            </ul>
            <div className="actions">
              <Button href="https://dev-the-breezy-exchange.pantheonsite.io/" icon={ExternalLink} variant="secondary" iconAfter external className="btn-sm">
                View the demo store
              </Button>
            </div>
            <p className="note">Pantheon shows a sandbox notice before the store loads.</p>
          </div>
        ) : (
          <div className="pinfo">
            <p className="font-semibold">Personal website</p>
            <h3>brianramoroka.co.za</h3>
            <p>
              My own website, designed and built by me with the Next.js App Router, React, TypeScript and Tailwind CSS, deployed on
              Vercel.
            </p>
            <ul className="ticks">
              <li>Page metadata, Open Graph tags and JSON-LD structured data</li>
            </ul>
            <div className="actions">
              <a
                href={CONTACT.repo}
                className="btn btn-secondary btn-sm"
                data-btn
                data-cta
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>See the code on GitHub</span>
                <GithubIcon />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
