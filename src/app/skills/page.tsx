import JsonLd from "@/components/JsonLd";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/metadata";
import { pageGraph } from "@/lib/schema";
import { cmsLine, skillGroups } from "@/content/profile";

const title = "Skills | Brian Ramoroka, Web Developer";
const description =
  "Brian Ramoroka's skills grouped by where they were used: at work, in his own projects, or in study. JavaScript, React, TypeScript, Java, Spring Boot, PostgreSQL, Azure and more.";

export const metadata = pageMetadata({ title, description, path: "/skills" });

export default function SkillsPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/skills", name: title, description, breadcrumb: [{ name: "Skills", path: "/skills" }] })} />
      <PageIntro
        title="Skills"
        lead="Grouped by where I've used each one, so you can tell what I've shipped at work from what I've only studied."
      />
      <Container className="grid gap-6 md:grid-cols-3">
        {skillGroups.map((g, i) => (
          <section
            key={g.heading}
            className={`rounded-[12px] border border-border p-6 ${i === 0 ? "bg-surface md:row-span-2" : "bg-surface-2"}`}
          >
            <h2 className="text-h3 font-semibold text-ink">{g.heading}</h2>
            <p className="mt-1 text-[15px] text-muted">{g.note}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <li key={s} className="rounded-[8px] border border-border bg-bg px-3 py-1.5 text-[15px] text-ink">
                  {s}
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section className="rounded-[12px] border border-border bg-surface-2 p-6 md:col-span-2">
          <h2 className="text-h3 font-semibold text-ink">Content management systems</h2>
          <p className="mt-3 text-ink">{cmsLine}.</p>
        </section>
      </Container>
    </>
  );
}
