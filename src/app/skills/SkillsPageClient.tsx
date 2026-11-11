import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import CvButton from "@/components/cv/CvButton";
import { EDUCATION } from "@/lib/home-content";
import { SKILL_FIELDS, skillName } from "@/lib/skills";

// Layout: "Ledger with an index".
// Skills are plain text: they must not look like buttons or react to hover. No counts, levels or evidence labels.
const wrap = "mx-auto max-w-[1160px] px-[20px] md:px-[40px]";

const linkCls =
  "flex min-h-[44px] items-center underline decoration-border-subtle decoration-[2px] underline-offset-[4px] focus-visible:decoration-amber";

export default function SkillsPageClient() {
  return (
    <>
      <nav aria-label="Breadcrumb" className={`${wrap}`}>
        <p className="flex items-center gap-[6px] border-b border-border-subtle font-mono text-[13px] text-text-primary">
          <Link href="/" className="inline-flex min-h-[44px] min-w-[44px] items-center underline decoration-border-subtle decoration-[2px] underline-offset-[4px]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Skills</span>
        </p>
      </nav>

      {/* Hero: H1, intro and CV on the left, the field index on the right. Stacked below 900px. */}
      <section>
        <div className={`${wrap} grid gap-[32px] pb-[48px] pt-[40px] min-[900px]:grid-cols-[minmax(0,1fr)_420px] min-[900px]:items-center min-[900px]:gap-[72px] min-[900px]:pb-[64px] min-[900px]:pt-[72px]`}>
          <div className="grid gap-[24px]">
            <h1 className="font-display text-[64px] leading-[1.1] tracking-[-0.04em] text-text-primary min-[900px]:text-[112px]">
              Skills
            </h1>
            <p className="text-[18px] text-text-body">
              These are the tools I use, grouped by field. Front-end and WordPress work fills most of my week. I also look after
              performance, responsive layouts, and accessibility to the WCAG guidelines, including alt text and colour contrast.
              You can see where I use them on my{" "}
              <Link href="/experience" className="deep-link">experience</Link> page and in my{" "}
              <Link href="/portfolio" className="deep-link">projects</Link>. My{" "}
              <Link href="/about" className="deep-link">about</Link> page explains how I check a page before it goes live.
            </p>
            <ButtonGroup>
              <CvButton />
              <Button href="/experience" icon={ArrowRight} variant="secondary" iconAfter>
                See my experience
              </Button>
            </ButtonGroup>
          </div>

          <nav aria-labelledby="jump-h" className="rounded-[12px] border border-border-subtle bg-card p-[24px] shadow-[0_8px_24px_rgba(20,19,15,0.06)]">
            <p id="jump-h" className="mb-[4px] font-mono text-[13px] font-semibold text-text-primary">
              Jump to a field
            </p>
            <ul className="grid grid-cols-2 gap-x-[16px] text-[15px] text-text-primary">
              {SKILL_FIELDS.map((f) => (
                <li key={f.id}>
                  <a href={`#${f.id}`} className={linkCls}>{f.field}</a>
                </li>
              ))}
              <li>
                <a href="#education" className={linkCls}>Education</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Ledger: one ruled row per field, skills in columns so a recruiter scans down. */}
      <section aria-label="Skills by field" className="pb-[24px]">
        <div className={`${wrap}`}>
          <div className="border-t-[2px] border-text-primary">
            {SKILL_FIELDS.map((f) => (
              <div key={f.id}>
                <div
                  id={f.id}
                  className="grid scroll-mt-[96px] gap-[12px] border-b border-border-subtle py-[24px] min-[900px]:grid-cols-[320px_minmax(0,1fr)] min-[900px]:gap-[48px] min-[900px]:py-[32px]"
                >
                  <h2 className="font-display text-[24px] leading-[1.2] tracking-[-0.015em] text-text-primary min-[900px]:text-[28px]">
                    {f.field}
                  </h2>
                  <div>
                    <ul className="columns-[2_140px] gap-x-[24px] text-[16px] text-text-body min-[900px]:columns-[3_180px]">
                      {f.skills.map((s) => (
                        <li key={skillName(s)} className="break-inside-avoid py-[3px]">
                          {skillName(s)}
                          {/* WordPress's page builders sit in smaller text under it. */}
                          {typeof s !== "string" && <span className="block text-[14px] leading-[1.5]">{s.under.join(", ")}</span>}
                        </li>
                      ))}
                    </ul>
                    {f.note && <p className="mt-[10px] text-[15px] text-text-body">{f.note}</p>}
                  </div>
                </div>
                {f.id === "seo" && (
                  <div className="border-b border-border-subtle py-[24px] min-[900px]:py-[32px]">
                    <div className="grid gap-[14px] rounded-[12px] border border-border-subtle bg-bg-subtle px-[24px] py-[20px] min-[900px]:grid-cols-[minmax(0,1fr)_auto] min-[900px]:items-center">
                      <p className="font-semibold text-text-primary">Hiring? My CV has my skills and experience together.</p>
                      <div>
                        <CvButton />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="scroll-mt-[96px]" aria-labelledby="education-h">
        <div className={`${wrap} py-[48px] min-[900px]:py-[72px]`}>
          <h2 id="education-h" className="mb-[24px] font-display text-[36px] leading-[1.1] text-text-primary min-[900px]:text-[44px]">
            Education
          </h2>
          <ol className="grid border-t border-border-subtle min-[900px]:grid-cols-3 min-[900px]:gap-[32px] min-[900px]:border-t-0">
            {EDUCATION.map((e) => (
              <li key={e.credential} className="grid content-start gap-[4px] border-b border-border-subtle py-[16px] min-[900px]:border-b-0 min-[900px]:border-t">
                <span className="font-mono text-[13px] font-semibold text-text-primary">{e.years}</span>
                <h3 className="font-display text-[19px] leading-[1.3] tracking-[-0.01em] text-text-primary">{e.credential}</h3>
                <p className="text-text-body">{e.school}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Get my CV">
        <div className={`${wrap} pb-[56px] min-[900px]:pb-[72px]`}>
          <div className="grid gap-[20px] rounded-[16px] border border-border-subtle border-t-[4px] border-t-amber bg-card px-[24px] py-[32px] min-[900px]:grid-cols-[minmax(0,1fr)_auto] min-[900px]:items-center min-[900px]:p-[48px]">
            <p className="font-display text-[20px] font-bold leading-[1.3] tracking-[-0.015em] text-text-primary min-[900px]:text-[28px]">
              Two CVs, one for front-end roles and one for software developer roles.
            </p>
            <ButtonGroup>
              <CvButton />
              <Button href="/experience" icon={ArrowRight} variant="secondary" iconAfter>
                See my experience
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </section>
    </>
  );
}
