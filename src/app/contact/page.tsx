import ContactForm from "@/components/sections/ContactForm";
import JsonLd from "@/components/JsonLd";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/metadata";
import { pageGraph } from "@/lib/schema";
import { site } from "@/lib/site";

const title = "Contact Brian Ramoroka | Web Developer in Cape Town";
const description =
  "Hiring for a developer role, or need a website built or fixed? Send a message, call or WhatsApp. Replies within one working day.";

export const metadata = pageMetadata({ title, description, path: "/contact" });

const direct = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phoneDisplay, href: `tel:${site.phoneE164}` },
  { label: "WhatsApp", value: site.phoneDisplay, href: site.whatsapp },
  { label: "LinkedIn", value: "linkedin.com/in/brian-obr", href: site.sameAs[0] },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/contact", name: title, description, type: "ContactPage", breadcrumb: [{ name: "Contact", path: "/contact" }] })} />
      <PageIntro
        title="Get in touch"
        lead="Hiring for a developer role, or need a website built or fixed? Tell me which, and I'll reply within one working day."
      />
      <Container className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="glass relative rounded-[12px] p-6 md:p-8">
          <ContactForm />
        </div>
        <aside data-section="contact-direct">
          <h2 className="text-h3 font-semibold text-ink">Or contact me directly</h2>
          <dl className="mt-6 space-y-4">
            {direct.map((d) => (
              <div key={d.label}>
                <dt className="text-[14px] text-muted">{d.label}</dt>
                <dd>
                  <a href={d.href} className="inline-flex min-h-[44px] items-center text-[17px] font-medium text-ink underline decoration-border-strong underline-offset-4 hover:decoration-accent">
                    {d.value}
                  </a>
                </dd>
              </div>
            ))}
            <div>
              <dt className="text-[14px] text-muted">Based in</dt>
              <dd className="text-[17px] text-ink">{site.locality}, South Africa (SAST, UTC+2)</dd>
            </div>
          </dl>
        </aside>
      </Container>
    </>
  );
}
