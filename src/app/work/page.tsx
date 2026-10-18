import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/metadata";
import { pageGraph } from "@/lib/schema";
import { caseStudies } from "@/content/work";

const title = "Work | Brian Ramoroka, Web Developer";
const description = "Case studies: The Breezy Exchange, a WooCommerce demo store, and the Next.js rebuild of brianramoroka.co.za.";

export const metadata = pageMetadata({ title, description, path: "/work" });

export default function WorkPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/work", name: title, description, type: "CollectionPage", breadcrumb: [{ name: "Work", path: "/work" }] })} />
      <PageIntro title="Work" lead="Projects I can show in full, with what I built and what changed." />
      <Container className="space-y-16">
        {caseStudies.map((c) => (
          <article key={c.slug} className="grid gap-8 border-t border-border pt-10 md:grid-cols-[1.3fr_1fr]">
            <Link href={`/work/${c.slug}`} className="block overflow-hidden rounded-[12px] border border-border bg-surface-2" tabIndex={-1} aria-hidden="true">
              <Image src={c.image.src} alt="" width={c.image.width} height={c.image.height} sizes="(min-width: 768px) 55vw, 100vw" className="aspect-[16/10] h-auto w-full object-cover object-top" />
            </Link>
            <div>
              <p className="text-[14px] text-muted">{c.kind}</p>
              <h2 className="mt-1 text-h2 font-semibold text-ink">
                <Link href={`/work/${c.slug}`} className="inline-flex min-h-[44px] items-center hover:text-accent">
                  {c.title}
                </Link>
              </h2>
              <p className="mt-4 text-muted">{c.summary}</p>
              <p className="mt-4 font-mono text-[13px] text-muted">{c.stack.join(" / ")}</p>
            </div>
          </article>
        ))}
      </Container>
    </>
  );
}
