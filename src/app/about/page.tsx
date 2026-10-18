import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/metadata";
import { pageGraph } from "@/lib/schema";
import { education, spokenLanguages } from "@/content/profile";

const title = "About Brian Ramoroka | Web Developer in Cape Town";
const description =
  "Brian Ramoroka is a Cape Town web developer with a Java and Spring Boot background who now builds and optimises websites for international clients.";

export const metadata = pageMetadata({ title, description, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/about", name: title, description, type: "AboutPage", breadcrumb: [{ name: "About", path: "/about" }] })} />
      <PageIntro
        title="About me"
        lead="I'm Brian Ramoroka, a web developer in Cape Town. I care about two things on every site: that it loads fast, and that people can find it."
      />
      <Container className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-[17px] leading-relaxed text-ink max-w-[62ch]">
          <p>
            I started with Java and Spring Boot, at the Cape Peninsula University of Technology and then during my
            internship at BiiC, where I worked on backend services with PostgreSQL and Azure.
          </p>
          <p>
            Since March 2025 I&apos;ve been an SEO web developer at Rhiza Babuyile, which works with Grizzly New Marketing in
            the Netherlands. I build and maintain client websites for businesses in the Netherlands, Belgium, Germany,
            France, Spain, the UK and the US, on WordPress, Shopify, Magento and custom platforms, and I run their
            technical SEO.
          </p>
          <p>
            That mix is the point. I can write the code, and I know what search engines need from it. On my own projects I
            use React, TypeScript, Next.js and Tailwind CSS, like on{" "}
            <Link className="text-link" href="/work/brianramoroka-co-za">this site</Link>.
          </p>
          <p>
            I&apos;m open to developer roles and I take on freelance projects. See my{" "}
            <Link className="text-link" href="/experience">experience</Link> or{" "}
            <Link className="text-link" href="/contact">get in touch</Link>.
          </p>
        </div>
        <figure className="overflow-hidden rounded-[12px] bg-surface-2">
          <Image
            src="/images/brian-ramoroka-graduation.webp"
            alt="Brian Ramoroka at his CPUT graduation"
            width={1200}
            height={1500}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="h-auto w-full"
          />
        </figure>
      </Container>

      <Container className="mt-20 grid gap-12 md:grid-cols-2">
        <section>
          <h2 className="text-h2 font-semibold text-ink">Education</h2>
          <ul className="mt-6 space-y-5">
            {education.map((e) => (
              <li key={e.credential}>
                <p className="font-semibold text-ink">{e.credential}</p>
                <p className="text-muted">{e.institution}, {e.date}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-h2 font-semibold text-ink">Languages</h2>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
            {spokenLanguages.map((l) => (
              <div key={l.name}>
                <dt className="font-semibold text-ink">{l.name}</dt>
                <dd className="text-muted">{l.level}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>
    </>
  );
}
