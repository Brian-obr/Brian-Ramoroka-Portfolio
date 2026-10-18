import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import { pageMetadata } from "@/lib/metadata";
import { pageGraph } from "@/lib/schema";
import { site } from "@/lib/site";
import { hasCv, CV_PATH } from "@/lib/cv";
import { caseStudies } from "@/content/work";
import { services } from "@/content/services";
import { skillGroups } from "@/content/profile";

const title = "Brian Ramoroka | Web Developer in Cape Town";
const description =
  "Web developer in Cape Town building fast websites and web apps that get found: front-end, WordPress and Shopify, with SEO built in.";

export const metadata = pageMetadata({ title, description, path: "/" });

export default function HomePage() {
  const cv = hasCv();
  return (
    <>
      <JsonLd data={pageGraph({ path: "/", name: title, description })} />

      <section className="border-b border-border">
        <Container className="grid items-center gap-10 py-10 md:grid-cols-[1.25fr_1fr] md:py-16">
          <div>
            <h1 className="text-display font-semibold text-ink">
              Brian Ramoroka,
              <br />
              Web Developer
            </h1>
            <p className="mt-5 max-w-[56ch] text-lead text-muted">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/experience">See my experience</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[12px] bg-surface-2 md:max-w-[420px]">
            <Image
              src="/images/brian-ramoroka-portrait.webp"
              alt="Brian Ramoroka"
              width={1200}
              height={1804}
              sizes="(min-width: 768px) 420px, 320px"
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </Container>
      </section>

      <section data-section="proof" className="bg-surface-2">
        <Container className="py-6">
          <p className="text-[16px] text-ink">
            SEO Web Developer at Rhiza Babuyile since March 2025, building and maintaining client websites for Grizzly
            New Marketing in the Netherlands.
          </p>
        </Container>
      </section>

      <section data-section="paths">
        <Container className="grid gap-6 py-16 md:grid-cols-2 md:py-24">
          <div className="rounded-[12px] border border-border bg-surface p-6 md:p-8">
            <h2 className="text-h3 font-semibold text-ink">Hiring a developer?</h2>
            <p className="mt-3 text-muted">
              I&apos;m open to front-end, full-stack and web developer roles. At work I use JavaScript, HTML, CSS, Git,
              REST APIs, SQL and PostgreSQL, Java with Spring Boot, and Azure.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/skills" variant="secondary">
                See my skills
              </ButtonLink>
              {cv && (
                <ButtonLink href={CV_PATH} variant="secondary" download data-track="cv_download">
                  Download CV
                </ButtonLink>
              )}
            </div>
          </div>
          <div className="rounded-[12px] bg-ink p-6 text-bg md:p-8">
            <h2 className="text-h3 font-semibold">Need a website built or fixed?</h2>
            <ul className="mt-3 space-y-2 text-bg/85">
              {services.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/services"
                className="inline-flex min-h-[44px] items-center rounded-[8px] border border-bg/40 px-5 font-semibold hover:bg-bg/10 focus-visible:outline-bg"
              >
                How I work with clients
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section data-section="work" className="border-t border-border">
        <Container className="py-16 md:py-24">
          <h2 className="text-h2 font-semibold text-ink">Recent work</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {caseStudies.map((c) => (
              <Link key={c.slug} href={`/work/${c.slug}`} className="group block">
                <div className="aspect-[16/10] overflow-hidden rounded-[12px] border border-border bg-surface-2">
                  <Image
                    src={c.image.src}
                    alt=""
                    width={c.image.width}
                    height={c.image.height}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-full w-full object-cover object-top group-hover:scale-[1.01] transition-transform duration-200"
                  />
                </div>
                <p className="mt-4 text-[14px] text-muted">{c.kind}</p>
                <h3 className="mt-1 text-h3 font-semibold text-ink group-hover:text-accent">{c.title}</h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section data-section="skills" className="border-t border-border bg-surface-2">
        <Container className="grid gap-8 py-16 md:grid-cols-3 md:py-20">
          {skillGroups.map((g) => (
            <div key={g.heading}>
              <h2 className="text-[18px] font-semibold text-ink">{g.heading}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{g.skills.join(", ")}</p>
            </div>
          ))}
        </Container>
      </section>

      <section data-section="contact">
        <Container className="py-16 md:py-24">
          <h2 className="max-w-[20ch] text-h2 font-semibold text-ink">Tell me about the role or the project.</h2>
          <p className="mt-4 max-w-[56ch] text-lead text-muted">I reply within one working day, South African time.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
            <ButtonLink href={site.whatsapp} variant="secondary">
              WhatsApp
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
