import JsonLd from "@/components/JsonLd";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import ButtonLink from "@/components/ui/ButtonLink";
import { pageMetadata } from "@/lib/metadata";
import { pageGraph } from "@/lib/schema";
import { CV_PATH, hasCv } from "@/lib/cv";
import { site } from "@/lib/site";
import { roles, education } from "@/content/profile";

const title = "Work Experience | Brian Ramoroka, Web Developer";
const description =
  "SEO web developer at Rhiza Babuyile (client sites for Grizzly New Marketing, Netherlands) and software developer intern at BiiC (Java, Spring Boot, PostgreSQL, Azure).";

export const metadata = pageMetadata({ title, description, path: "/experience" });

export default function ExperiencePage() {
  const cv = hasCv();
  return (
    <>
      <JsonLd data={pageGraph({ path: "/experience", name: title, description, type: "ProfilePage", breadcrumb: [{ name: "Experience", path: "/experience" }] })} />
      <PageIntro title="Experience" lead="Where I've worked, what I did there and the tools I used. Every tool is grouped by evidence on the skills page.">
        {cv ? (
          <ButtonLink href={CV_PATH} download data-track="cv_download">
            Download CV (PDF)
          </ButtonLink>
        ) : (
          <p className="text-muted">
            CV available on request:{" "}
            <a className="text-link" href={`mailto:${site.email}?subject=CV%20request`}>
              {site.email}
            </a>
          </p>
        )}
      </PageIntro>

      <Container>
        <ol className="space-y-12">
          {roles.map((r) => (
            <li key={r.company} className="grid gap-4 border-t border-border pt-8 md:grid-cols-[220px_1fr]">
              <p className="text-[15px] text-muted">
                {r.start} to {r.end}
              </p>
              <div>
                <h2 className="text-h3 font-semibold text-ink">{r.title}</h2>
                <p className="mt-1 text-ink">
                  {r.company}
                  {r.companyNote && <span className="block text-muted">{r.companyNote}</span>}
                </p>
                <p className="mt-4 max-w-[62ch] text-muted">{r.summary}</p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-ink">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="mt-4 font-mono text-[13px] text-muted">{r.stack.join(" / ")}</p>
              </div>
            </li>
          ))}
          <li className="grid gap-4 border-t border-border pt-8 md:grid-cols-[220px_1fr]">
            <p className="text-[15px] text-muted">2021 to 2025</p>
            <div>
              <h2 className="text-h3 font-semibold text-ink">Education</h2>
              <ul className="mt-2 space-y-2">
                {education.map((e) => (
                  <li key={e.credential} className="text-ink">
                    {e.credential} <span className="text-muted">({e.date})</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ol>
      </Container>
    </>
  );
}
