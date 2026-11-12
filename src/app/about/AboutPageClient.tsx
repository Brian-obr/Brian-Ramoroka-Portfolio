import Link from "next/link";
import Image from "next/image";
import { Check, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import CvButton from "@/components/cv/CvButton";
import { IMAGE_QUALITY } from "@/lib/image-quality";

const wrap = "mx-auto max-w-[1160px] px-[20px] md:px-[40px]";
const h2Big = "font-display text-[32px] leading-[1.1] text-text-primary min-[900px]:text-[44px]";
const h2Mid = "font-display text-[32px] leading-[1.15] text-text-primary";
const h2Small = "font-display mb-[10px] text-[22px] leading-[1.2] text-text-primary";
const rowCls = "grid gap-[16px] border-t border-border-subtle py-[40px] min-[900px]:grid-cols-[380px_minmax(0,1fr)] min-[900px]:gap-[64px] min-[900px]:py-[56px]";
const proseCls = "grid max-w-[660px] gap-[16px] text-text-body";

// Labels follow the "Open to" and "Now" rows of the contact card.
const FACTS = [
  ["Based in", "Cape Town"],
  ["Open to", "Midrand, Johannesburg, Pretoria and remote"],
  ["Notice period", "1 month"],
  ["Now", "SEO Web Developer, Rhiza Babuyile"],
] as const;

// No measured-score row (Lighthouse) until there is a real, dated measurement to show.
const CHECKS = [
  "One H1, and headings in order.",
  "Its own title, description and canonical URL.",
  "Person structured data that links my LinkedIn and GitHub.",
  "An Open Graph image at 1200 by 630 px.",
  "Text you can read with images turned off, and colour contrast that meets WCAG AA.",
];

const STEPS = [
  ["Crawling", "I crawl the site with Screaming Frog and make sure search engines can reach every page that matters."],
  ["Indexing", "I check in Google Search Console that pages are indexed, submit the XML sitemap and request indexing where it's needed."],
  ["Speed", "I test site speed and Core Web Vitals, then fix what slows the page down."],
  ["Structured data", "I add JSON-LD structured data so Google understands what the page is about."],
  ["Tracking", "I set up GA4 and Google Tag Manager, and use Microsoft Clarity heatmaps to find UX problems."],
  ["Accessibility", "I check the page against WCAG, including alt text and colour contrast."],
] as const;

const TOOLS = ["Screaming Frog", "Google Search Console", "GA4", "Google Tag Manager", "Microsoft Clarity", "Ahrefs", "Semrush", "AWR", "Rank Math", "Yoast SEO"];

const PATH = [
  ["2019", "Matric", "I finished matric at Ivory Park Secondary School."],
  ["2021 - 2024", "Diploma, CPUT", "I then studied ICT: Application Development at the Cape Peninsula University of Technology (CPUT), where Java was my main language."],
  ["07/2024", "Internship, BIIC", "I started a six-month internship at the Business Innovation & Incubation Centre (BIIC). I worked on Java and Spring Boot applications backed by PostgreSQL, in an Agile team."],
  ["03/2025", "Rhiza Babuyile", "I joined Rhiza Babuyile."],
  ["2025", "Advanced Diploma", "I completed the Advanced Diploma (NQF level 7)."],
] as const;

export default function AboutPageClient() {
  return (
    <>
      {/* Hero. Phone: H1, intro, card, then Contact me, so the CV button stays above the fold. */}
      <section>
        <div
          className={`${wrap} grid pb-[48px] pt-[24px] min-[900px]:grid-cols-[minmax(0,1fr)_400px] min-[900px]:grid-rows-[1fr_auto_auto_1fr] min-[900px]:items-center min-[900px]:gap-x-[48px] min-[900px]:py-[72px] min-[1240px]:grid-cols-[minmax(0,1fr)_460px] min-[1240px]:gap-x-[64px]`}
        >
          <div className="min-w-0 min-[900px]:col-start-1 min-[900px]:row-start-2">
            <h1 className="font-display text-[clamp(48px,15.4vw,60px)] leading-[0.92] tracking-[-0.05em] text-text-primary min-[900px]:text-[clamp(68px,calc(7.65vw+1px),96px)]">
              <span className="block">About Brian</span>{" "}
              <span className="block">Ramoroka</span>
            </h1>
            <p className="mt-[16px] max-w-[560px] text-[19px] text-text-body min-[900px]:mt-[24px]">
              I&apos;m Brian Ramoroka, a front-end developer based in Cape Town, Western Cape. I work as an{" "}
              <span className="underline decoration-amber decoration-[3px] underline-offset-[5px]">SEO Web Developer</span>{" "}
              at Rhiza
              Babuyile, and I&apos;m looking for a full-time developer role.
            </p>
          </div>

          <aside
            aria-label="Brian Ramoroka at a glance"
            className="mt-[24px] overflow-hidden rounded-[16px] border border-border-subtle bg-card shadow-[0_16px_40px_rgba(20,19,15,0.08)] min-[900px]:col-start-2 min-[900px]:row-span-4 min-[900px]:row-start-1 min-[900px]:mt-0"
          >
            <div className="flex items-center gap-[16px] p-[18px] min-[900px]:gap-[20px] min-[900px]:p-[24px]">
              <Image
                src="/images/brian-ramoroka-graduation-v2.webp"
                alt="Brian Ramoroka"
                width={112}
                height={112}
                loading="eager"
                sizes="(min-width: 900px) 112px, 84px"
                quality={IMAGE_QUALITY.photo}
                className="h-[84px] w-[84px] flex-none rounded-full border-[3px] border-amber object-cover min-[900px]:h-[112px] min-[900px]:w-[112px]"
                style={{ objectPosition: "center 20%" }}
              />
              <div className="min-w-0">
                <p className="font-display text-[21px] font-bold leading-[1.2] tracking-[-0.02em] text-text-primary min-[900px]:text-[24px]">
                  Brian Ramoroka
                </p>
                <p className="mt-[4px] inline-flex items-center gap-[8px] text-[15px] font-semibold text-text-primary">
                  <span aria-hidden="true" className="h-[10px] w-[10px] flex-none rounded-full bg-accent-green shadow-[0_0_0_4px_rgba(47,125,79,0.22)]" />
                  Open to full-time roles
                </p>
              </div>
            </div>
            <dl>
              {FACTS.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[118px_minmax(0,1fr)] gap-[12px] border-t border-border-subtle px-[18px] py-[8px] min-[900px]:grid-cols-[140px_minmax(0,1fr)] min-[900px]:px-[24px] min-[900px]:py-[13px]"
                >
                  <dt className="eyebrow pt-[3px]">{k}</dt>
                  <dd className="font-semibold text-text-primary">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-border-subtle px-[18px] py-[16px] min-[900px]:px-[24px] min-[900px]:py-[20px]">
              <ButtonGroup>
                <CvButton />
              </ButtonGroup>
            </div>
          </aside>

          <div className="mt-[16px] min-[900px]:col-start-1 min-[900px]:row-start-3 min-[900px]:mt-[24px]">
            <ButtonGroup>
              <Button href="/contact" icon={Mail} variant="secondary">
                Contact me
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Page report: proof a recruiter can check on this page. */}
      <section className="border-y border-border-subtle bg-card py-[56px] min-[900px]:py-[88px]">
        <div className={`${wrap} grid gap-[32px] min-[900px]:grid-cols-[380px_minmax(0,1fr)] min-[900px]:gap-[64px]`}>
          <div className={`${proseCls} content-start`}>
            <h2 className={h2Big}>This page, checked</h2>
            <p>I built this website myself, so you can check my work on the page you&apos;re reading.</p>
            <p>
              On my own demo store,{" "}
              <Link href="/portfolio#the-breezy-exchange" className="deep-link">
                The Breezy Exchange
              </Link>
              , I&apos;m adding product structured data and crawl control for filtered shop pages next.
            </p>
          </div>
          <div className="overflow-hidden rounded-[10px] border border-border-subtle">
            <div className="flex flex-wrap justify-between gap-[12px] border-b border-border-subtle bg-bg-subtle px-[16px] py-[10px]">
              <span className="eyebrow">brianramoroka.co.za/about</span>
              <span className="eyebrow">checked by Brian</span>
            </div>
            <ul>
              {CHECKS.map((c) => (
                <li key={c} className="flex items-start gap-[12px] border-b border-border-subtle px-[16px] py-[14px] text-text-body last:border-b-0">
                  <span
                    aria-hidden="true"
                    className="grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-amber text-on-amber shadow-[0_0_0_1px_var(--color-keyline)]"
                  >
                    <Check className="h-[13px] w-[13px]" strokeWidth={3.2} />
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The six checks, numbered. */}
      <section className="py-[56px] min-[900px]:py-[88px]">
        <div className={wrap}>
          <h2 className={h2Big}>How I check a page before it goes live</h2>
          <p className="mt-[16px] max-w-[660px] text-text-body">
            An SEO web developer builds websites that search engines can crawl, understand and rank. These are the checks I run on
            a page before it goes live. The{" "}
            <Link href="/experience" className="deep-link">
              full list of what I do in SEO
            </Link>{" "}
            is on my experience page.
          </p>
          <ol className="mt-[36px] grid min-[900px]:grid-cols-3 min-[900px]:gap-x-[40px]">
            {STEPS.map(([h, t], i) => (
              <li
                key={h}
                className="grid grid-cols-[64px_minmax(0,1fr)] gap-[16px] border-t-2 border-ink py-[20px] min-[900px]:grid-cols-1 min-[900px]:pb-[28px] min-[900px]:pt-[24px]"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[48px] font-extrabold leading-[0.9] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)] min-[900px]:text-[88px]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display mb-[6px] text-[22px] leading-[1.2] text-text-primary">{h}</h3>
                  <p className="text-text-body">{t}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul aria-label="Tools" className="mt-[24px] flex flex-wrap gap-[8px]">
            {TOOLS.map((t) => (
              <li key={t} className="eyebrow rounded-[6px] border border-border-subtle bg-bg-subtle px-[10px] py-[4px]">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className={wrap}>
        <section className={rowCls}>
          <h2 className={h2Mid}>What I do now</h2>
          <div className={proseCls}>
            <p>
              Rhiza Babuyile is a South African company that partners with Grizzly New Marketing in the Netherlands. I joined in
              03/2025. Most of my work is front-end and WordPress development on client websites. I also run technical SEO audits,
              add structured data, and set up Google Search Console, GA4 and Google Tag Manager.
            </p>
            <p>
              Clients run their sites on many different platforms, so I&apos;m quick to find my way around a site someone else
              built. One day it&apos;s WordPress with Elementor, Divi or Bricks Builder. The next it&apos;s Shopify, Magento 2,
              Webflow or a custom CMS.
            </p>
            <p>
              I use AI tools every day for research, drafting and code, and I check what they produce. I also write my own Claude
              skills for tasks I repeat. You can read more about{" "}
              <Link href="/experience" className="deep-link">
                my work at Rhiza Babuyile
              </Link>{" "}
              and{" "}
              <Link href="/skills" className="deep-link">
                the tools I use
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Timeline. */}
        <section className="border-t border-border-subtle py-[40px] min-[900px]:py-[56px]">
          <h2 className={h2Mid}>How I got here</h2>
          <ol className="mt-[24px] grid gap-[12px] min-[900px]:grid-cols-5">
            {PATH.map(([when, title, text]) => (
              <li key={when} className="rounded-[12px] border border-border-subtle bg-card px-[18px] py-[16px]">
                <span className="eyebrow block text-[14px] font-bold">{when}</span>
                <p className="my-[4px] text-[17px] font-semibold text-text-primary">{title}</p>
                <p className="text-[15px] text-text-body">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={rowCls}>
          <h2 className={h2Mid}>What I want next</h2>
          <div className={proseCls}>
            <p>A full-time developer role where I write more code and work on the same product over time.</p>
            <p>
              Longer term, I want to work full stack. That means building the front end and the back end, with page speed,
              structured data, clean URLs and indexing built in from the start instead of fixed afterwards.
            </p>
            <p>I&apos;d like to join a friendly team at a company that looks after its people. Company size doesn&apos;t matter.</p>
          </div>
        </section>

        <div className="grid gap-[32px] border-t border-border-subtle py-[40px] min-[900px]:grid-cols-3 min-[900px]:py-[56px]">
          <section>
            <h2 className={h2Small}>Where I can work</h2>
            <div className={proseCls}>
              <p>
                I&apos;m based in Cape Town, and Cape Town is my first choice. I&apos;m also open to roles in Midrand,
                Johannesburg, Pretoria and other South African cities, and to remote work. I prefer remote, but hybrid and
                on-site work for me too.
              </p>
              <p>My notice period is 1 month.</p>
            </div>
          </section>
          <section id="markets">
            <h2 className={h2Small}>Markets I work in</h2>
            <p className="text-text-body">
              With the Rhiza Babuyile and Grizzly New Marketing team, I work on client websites for businesses mainly in the
              Netherlands and Belgium. Others are in Germany, France, Spain, the UK and the US. I also work on .com sites.
            </p>
          </section>
          <section>
            <h2 className={h2Small}>Languages</h2>
            <p className="text-text-body">
              Sepedi is my home language. I work in English, Sesotho and Setswana, speak some isiZulu, and have basic isiXhosa,
              Xitsonga and Tshivenḓa.
            </p>
          </section>
        </div>
      </div>

      <section className="pb-[56px]">
        <div className={wrap}>
          <div className="grid gap-[20px] rounded-[16px] border border-border-subtle border-t-[4px] border-t-amber bg-card p-[32px] min-[900px]:grid-cols-[minmax(0,1fr)_auto] min-[900px]:items-center">
            <div>
              <h2 className="font-display text-[36px] leading-[1.1] text-text-primary">Get my CV</h2>
              <p className="mt-[10px] text-text-body">Two CVs, one for front-end roles and one for software developer roles.</p>
            </div>
            <ButtonGroup>
              <CvButton />
              <Button href="/contact" icon={Mail} variant="secondary">
                Contact me
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </section>
    </>
  );
}
