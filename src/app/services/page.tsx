import JsonLd from "@/components/JsonLd";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import ButtonLink from "@/components/ui/ButtonLink";
import { pageMetadata } from "@/lib/metadata";
import { ids, pageGraph } from "@/lib/schema";
import { process, seoTools, services } from "@/content/services";

const title = "Web Development and SEO Services | Brian Ramoroka";
const description =
  "Websites and web apps, WordPress, WooCommerce and Shopify work, fixes and maintenance, and technical SEO audits. Based in Cape Town, working remotely. Quote on request.";

export const metadata = pageMetadata({ title, description, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/services", name: title, description, about: ids.service, breadcrumb: [{ name: "Services", path: "/services" }] })} />
      <PageIntro
        title="Websites that load fast and get found"
        lead="I work with small businesses and agencies in South Africa and abroad. Every job is quoted up front, after a short conversation about what you need."
      >
        <ButtonLink href="/contact">Get in touch</ButtonLink>
      </PageIntro>

      <Container>
        <div className="grid gap-x-12 gap-y-10 border-t border-border pt-10 md:grid-cols-2">
          {services.map((s) => (
            <section key={s.title}>
              <h2 className="text-h3 font-semibold text-ink">{s.title}</h2>
              <p className="mt-3 max-w-[52ch] text-muted">{s.body}</p>
            </section>
          ))}
        </div>
      </Container>

      <section className="mt-20 bg-surface-2">
        <Container className="py-16">
          <h2 className="text-h2 font-semibold text-ink">How a project runs</h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-4">
            {process.map((p) => (
              <li key={p.step}>
                <h3 className="text-[18px] font-semibold text-ink">{p.step}</h3>
                <p className="mt-2 text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container className="mt-20">
        <h2 className="text-h2 font-semibold text-ink">Tools I use for SEO work</h2>
        <p className="mt-4 max-w-[70ch] text-muted">{seoTools.join(", ")}.</p>
      </Container>
    </>
  );
}
