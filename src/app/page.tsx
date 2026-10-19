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
import { process, seoTools, services } from "@/content/services";
import { cmsLine, education, roles, skillGroups, spokenLanguages } from "@/content/profile";

const title = "Brian Ramoroka | Web Developer in Cape Town";
const description =
  "Web developer in Cape Town building fast websites and web apps that get found: front-end, WordPress and Shopify, with SEO built in.";

export const metadata = pageMetadata({ title, description, path: "/" });

function SectionHeading({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="max-w-[62ch]">
      <h2 className="text-h2 font-semibold text-ink">{title}</h2>
      {lead && <p className="mt-3 text-lead text-ink">{lead}</p>}
    </div>
  );
}

export default function HomePage() {
  const cv = hasCv();
  return (
    <>
      <JsonLd data={pageGraph({ path: "/", name: title, description })} />

      {/* Hero */}
      <section className="border-b border-border">
        <Container className="grid items-center gap-10 py-10 md:grid-cols-[1.2fr_1fr] md:py-16">
          <div>
            <h1 className="text-display font-semibold text-ink">
              Brian Ramoroka,
              <br />
              Web Developer
            </h1>
            <p className="mt-5 max-w-[56ch] text-lead text-ink">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/experience">See my experience</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
              {cv && (
                <ButtonLink href={CV_PATH} variant="secondary" download data-track="cv_download">
                  Download CV
                </ButtonLink>
              )}
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-ink">
              <li>Based in {site.locality}</li>
              <li>Open to developer roles</li>
              <li>Taking freelance projects</li>
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-[12px] border border-border bg-surface-2 md:max-w-[440px]">
            <Image
              src="/images/brian-ramoroka-hero.webp"
              alt="Brian Ramoroka at his graduation from the Cape Peninsula University of Technology"
              width={1200}
              height={1500}
              sizes="(min-width: 768px) 440px, 360px"
              loading="eager"
              fetchPriority="high"
              className="h-auto w-full"
            />
          </div>
        </Container>
      </section>

      {/* Proof */}
      <section data-section="proof" className="bg-surface-2/60">
        <Container className="py-6">
          <p className="text-[17px] text-ink">
            SEO Web Developer at{" "}
            <Link className="text-link" href="/experience">
              Rhiza Babuyile
            </Link>{" "}
            since March 2025, building and maintaining client websites for Grizzly New Marketing in the Netherlands.
          </p>
        </Container>
      </section>

      {/* About */}
      <section data-section="about">
        <Container className="grid items-start gap-12 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
          <div className="order-2 overflow-hidden rounded-[12px] border border-border bg-surface-2 md:order-1">
            <Image
              src="/images/brian-ramoroka-cput.webp"
              alt="Brian Ramoroka in his graduation gown at CPUT"
              width={1200}
              height={1500}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div className="order-1 md:order-2">
            <SectionHeading title="About me" />
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink max-w-[62ch]">
              <p>
                I started with Java and Spring Boot at the Cape Peninsula University of Technology and during my{" "}
                <Link className="text-link" href="/experience">
                  internship at BiiC
                </Link>
                , where I worked on backend services with PostgreSQL and Azure.
              </p>
              <p>
                Today I build and maintain websites for businesses in the Netherlands, Belgium, Germany, France, Spain, the
                UK and the US, on WordPress, Shopify, Magento and custom platforms, and I run their{" "}
                <Link className="text-link" href="/services">
                  technical SEO
                </Link>
                . On my own projects I use{" "}
                <Link className="text-link" href="/skills">
                  React, TypeScript, Next.js and Tailwind CSS
                </Link>
                , including{" "}
                <Link className="text-link" href="/work/brianramoroka-co-za">
                  this site
                </Link>{" "}
                and{" "}
                <Link className="text-link" href="/work/the-breezy-exchange">
                  The Breezy Exchange
                </Link>
                .
              </p>
              <p>
                I can write the code, and I know what search engines need from it. If you&apos;re hiring or have a project,{" "}
                <Link className="text-link" href="/contact">
                  get in touch
                </Link>
                .
              </p>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-[18px] font-semibold text-ink">Education</h3>
                <ul className="mt-3 space-y-3">
                  {education.map((e) => (
                    <li key={e.credential} className="text-ink">
                      {e.credential}
                      <span className="block text-[15px] text-muted">
                        {e.institution}, {e.date}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-ink">Languages</h3>
                <p className="mt-3 text-ink">{spokenLanguages.map((l) => l.name).join(", ")}</p>
              </div>
            </div>
            <div className="mt-8">
              <ButtonLink href="/about" variant="secondary">
                More about me
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Experience */}
      <section data-section="experience" className="border-t border-border">
        <Container className="py-16 md:py-24">
          <SectionHeading title="Experience" />
          <p className="mt-3 max-w-[62ch] text-lead text-ink">
            Where I&apos;ve worked and what I did there. The tools behind each role are on my{" "}
            <Link className="text-link" href="/skills">
              skills page
            </Link>
            .
          </p>
          <ol className="mt-10 grid gap-6 md:grid-cols-2">
            {roles.map((r) => (
              <li key={r.company} className="glass rounded-[12px] p-6 md:p-8">
                <p className="text-[15px] text-muted">
                  {r.start} to {r.end}
                </p>
                <h3 className="mt-1 text-h3 font-semibold text-ink">{r.title}</h3>
                <p className="mt-1 font-medium text-ink">{r.company}</p>
                {r.companyNote && <p className="text-[15px] text-muted">{r.companyNote}</p>}
                <p className="mt-4 text-ink">{r.summary}</p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-ink">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {r.stack.map((s) => (
                    <li key={s} className="rounded-[8px] border border-border bg-bg/70 px-2.5 py-1 text-[14px] text-ink">
                      {s}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <ButtonLink href="/experience" variant="secondary">
              Full experience
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section data-section="skills" className="border-t border-border">
        <Container className="py-16 md:py-24">
          <SectionHeading title="Skills" />
          <p className="mt-3 max-w-[62ch] text-lead text-ink">
            Grouped by where I&apos;ve used each one, so you can tell what I&apos;ve shipped at{" "}
            <Link className="text-link" href="/experience">
              work
            </Link>{" "}
            from what I&apos;ve studied.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {skillGroups.map((g, i) => (
              <section
                key={g.heading}
                aria-labelledby={`home-skills-${i}`}
                className="glass rounded-[12px] p-6"
              >
                <h3 id={`home-skills-${i}`} className="text-h3 font-semibold text-ink">
                  {g.heading}
                </h3>
                <p className="mt-1 text-[15px] text-muted">{g.note}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li key={s} className="rounded-[8px] border border-border bg-bg/70 px-3 py-1.5 text-[15px] text-ink">
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <dt className="font-semibold text-ink">Content management systems</dt>
              <dd className="mt-1 text-ink">{cmsLine}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">SEO and analytics tools</dt>
              <dd className="mt-1 text-ink">{seoTools.join(", ")}</dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* Services */}
      <section data-section="services" className="border-t border-border bg-ink text-bg">
        <Container className="py-16 md:py-24">
          <div className="max-w-[62ch]">
            <h2 className="text-h2 font-semibold">Need a website built or fixed?</h2>
            <p className="mt-3 text-lead">
              I work with small businesses and agencies in South Africa and abroad. Every job is quoted up front.
            </p>
          </div>
          <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {services.map((s) => (
              <div key={s.title}>
                <h3 className="text-h3 font-semibold">{s.title}</h3>
                <p className="mt-2 max-w-[52ch]">{s.body}</p>
              </div>
            ))}
          </div>
          <ol className="mt-12 grid gap-6 border-t border-bg/25 pt-8 md:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.step}>
                <p className="text-[14px] font-semibold tabular-nums">{i + 1}</p>
                <h3 className="mt-1 text-[18px] font-semibold">{p.step}</h3>
                <p className="mt-1 text-[15px]">{p.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Link
              href="/services"
              className="inline-flex min-h-[44px] items-center rounded-[8px] border border-bg/50 px-5 font-semibold hover:bg-bg/10 focus-visible:outline-bg"
            >
              How I work with clients
            </Link>
          </div>
        </Container>
      </section>

      {/* Work */}
      <section data-section="work">
        <Container className="py-16 md:py-24">
          <SectionHeading title="Recent work" />
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
                    className="h-full w-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.01]"
                  />
                </div>
                <p className="mt-4 text-[15px] text-muted">{c.kind}</p>
                <h3 className="mt-1 text-h3 font-semibold text-ink group-hover:text-accent">{c.title}</h3>
                <p className="mt-2 text-ink">{c.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section data-section="contact" className="border-t border-border">
        <Container className="py-16 md:py-24">
          <h2 className="max-w-[20ch] text-h2 font-semibold text-ink">Tell me about the role or the project.</h2>
          <p className="mt-4 max-w-[56ch] text-lead text-ink">I reply within one working day, South African time.</p>
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
