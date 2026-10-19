import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import { pageMetadata } from "@/lib/metadata";
import { ids, pageGraph } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";
import { caseStudies, getCaseStudy } from "@/content/work";

export const dynamicParams = false;
export const generateStaticParams = () => caseStudies.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return pageMetadata({ title: `${c.title}: ${c.kind} | Brian Ramoroka`, description: c.summary, path: `/work/${c.slug}` });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  const path = `/work/${c.slug}`;
  const work = {
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(path)}#work`,
    name: c.title,
    description: c.summary,
    creator: { "@id": ids.person },
    keywords: c.stack.join(", "),
    ...(c.link ? { url: c.link.href } : {}),
  };
  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: `${c.title}: ${c.kind}`,
          description: c.summary,
          about: `${absoluteUrl(path)}#work`,
          breadcrumb: [
            { name: "Work", path: "/work" },
            { name: c.title, path },
          ],
          extra: [work],
        })}
      />
      <Container className="pt-12 md:pt-20">
        <p className="text-[15px] text-muted">{c.kind}</p>
        <h1 className="mt-2 text-display font-semibold text-ink">{c.title}</h1>
        <p className="mt-5 max-w-[62ch] text-lead text-muted">{c.summary}</p>
        {c.link && (
          <div className="mt-8">
            <ButtonLink href={c.link.href} variant="secondary">
              {c.link.label}
            </ButtonLink>
          </div>
        )}
      </Container>
      <Container className="mt-12">
        <div className="overflow-hidden rounded-[12px] border border-border bg-surface-2">
          <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width: 1200px) 1136px, 100vw" loading="eager" fetchPriority="high" className="h-auto w-full" />
        </div>
      </Container>
      <Container className="mt-12 grid gap-12 md:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          {c.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-h3 font-semibold text-ink">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 max-w-[62ch] text-[17px] leading-relaxed text-ink">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
        <aside className="h-fit rounded-[12px] bg-surface-2 p-6">
          <dl className="space-y-4">
            {c.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[14px] text-muted">{f.label}</dt>
                <dd className="font-semibold text-ink">{f.value}</dd>
              </div>
            ))}
            <div>
              <dt className="text-[14px] text-muted">Stack</dt>
              <dd className="font-mono text-[13px] text-ink">{c.stack.join(" / ")}</dd>
            </div>
          </dl>
        </aside>
      </Container>
    </>
  );
}
