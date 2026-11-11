import type { Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { pageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { personLd } from "@/lib/schema";
import { caseStudies, type CaseStudy } from "@/lib/caseStudies";
import { h1Cls, h3Cls, innerCls, listCls } from "@/lib/page-classes";
import { PROJECTS_INTRO } from "@/lib/home-content";

export const metadata: Metadata = pageMetadata({
  title: "Projects | Brian Ramoroka, Front-end Developer",
  description: "Projects by Brian Ramoroka: The Breezy Exchange, a WooCommerce sneaker store priced in rand, and this Next.js website with structured data.",
  path: "/portfolio",
  ogTitle: "Projects by Brian Ramoroka",
  ogDescription: "A WooCommerce sneaker store built for South African shoppers, and a Next.js portfolio site with JSON-LD.",
});

function CaseStudyArticle({ s, priority }: { s: CaseStudy; priority: boolean }) {
  return (
    <article id={s.slug} className="scroll-mt-[24px]">
      <div className={innerCls}>
        <CaseStudyCard study={s} headingLevel="h2" showReadMore={false} priority={priority} />
        {s.features && (
          <div className="mt-[40px]">
            <h3 className={h3Cls}>What it does now</h3>
            <ul className={listCls}>
              {s.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {s.next && <p className="mt-[20px] text-text-body">{s.next}</p>}
          </div>
        )}
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={personLd} />
      <section>
        <div className={innerCls}>
          <h1 className={h1Cls}>Projects</h1>
          <p className="mt-[20px] text-[18px] text-text-body">{PROJECTS_INTRO}</p>
        </div>
      </section>
      {caseStudies.map((s, i) => (
        <CaseStudyArticle key={s.slug} s={s} priority={i === 0} />
      ))}
      <section>
        <div className={innerCls}>
          <ButtonGroup>
            <Button href="/experience" icon={ArrowRight} iconAfter>
              See my experience
            </Button>
            <Button href="/contact" icon={Mail} variant="secondary">
              Contact me
            </Button>
          </ButtonGroup>
        </div>
      </section>
    </>
  );
}
