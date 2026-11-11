import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { personLd } from "@/lib/schema";
import Link from "next/link";
import { FileText, Mail, Phone, MapPin, UserCheck } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons/SocialIcons";
import ContactForm from "@/components/sections/ContactForm";
import { CONTACT_LEDE, CVS, HERO } from "@/lib/home-content";
import { h1Cls, h2Cls, h3Cls, innerCls } from "@/lib/page-classes";
import { CONTACT, MAILTO } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Brian Ramoroka | Front-end Developer, Cape Town",
  description:
    "Hiring a front-end developer? Contact Brian Ramoroka in Cape Town, open to roles in Gauteng and remote. Notice period: 1 month. Download the CV.",
  path: "/contact",
  ogTitle: "Contact Brian Ramoroka",
  ogDescription: "Front-end developer in Cape Town, open to roles in Gauteng and remote. Send a message or download the CV.",
});

const external = { target: "_blank", rel: "noopener noreferrer" };

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    content: <a href={MAILTO} className="deep-link text-sm">{CONTACT.email}</a>,
  },
  {
    icon: Phone,
    label: "Phone and WhatsApp",
    content: (
      <span className="flex flex-wrap gap-x-[16px]">
        <a href={CONTACT.phoneHref} className="deep-link text-sm">{CONTACT.phoneDisplay}</a>
        <a href={CONTACT.whatsapp} {...external} className="deep-link text-sm">WhatsApp</a>
      </span>
    ),
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    content: <a href={CONTACT.linkedin} {...external} className="deep-link text-sm">linkedin.com/in/brian-obr</a>,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    content: <a href={CONTACT.github} {...external} className="deep-link text-sm">github.com/Brian-obr</a>,
  },
  { icon: MapPin, label: "Location", content: <span className="text-text-primary text-sm">{HERO.location}</span> },
  { icon: UserCheck, label: "References", content: <span className="text-text-primary text-sm">Available on request</span> },
];

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "What role are you looking for?",
    a: "A full-time developer role. Front-end is my lead, and I'm also open to full stack, back-end Java, software developer, WordPress, Shopify and web developer roles.",
  },
  {
    q: "Where can you work?",
    a: "I'm based in Cape Town, and Cape Town is my first choice. I'm also open to roles in Midrand, Johannesburg, Pretoria and other South African cities, and to remote work.",
  },
  { q: "What's your notice period?", a: "1 month." },
  {
    q: "Where do you work now?",
    a: (
      <>
        I&apos;m an SEO Web Developer at Rhiza Babuyile in Cape Town, which partners with Grizzly New Marketing in the
        Netherlands. I&apos;ve been there since 03/2025. See my <Link href="/experience" className="deep-link">experience</Link>.
      </>
    ),
  },
  {
    q: "Can I see your code?",
    a: (
      <>
        Yes. The code for this website is on{" "}
        <a href={CONTACT.repo} {...external} className="deep-link">GitHub</a>. My
        client work is confidential, so my <Link href="/portfolio" className="deep-link">projects</Link> page shows what
        I&apos;ve built myself.
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={personLd} />
      <section>
        <div className={innerCls}>
          <h1 className={h1Cls}>Contact</h1>
          <p className="mt-[24px] mb-[48px] text-[18px] text-text-body">{CONTACT_LEDE}</p>

          <div className="grid grid-cols-1 gap-[40px] min-[900px]:grid-cols-5 min-[900px]:gap-[48px]">
            {/* Form */}
            <div className="relative min-w-0 min-[900px]:col-span-3">
              <h2 className={h2Cls}>Send me a message</h2>
              <ContactForm />
              <noscript>
                <div className="bg-bg-card-solid rounded-[20px] p-[24px] text-center">
                  <p className="text-text-secondary">
                    JavaScript is required for the contact form. Please email me directly at{" "}
                    <a href={MAILTO} className="text-accent hover:text-accent-hover">
                      {CONTACT.email}
                    </a>
                  </p>
                </div>
              </noscript>
            </div>

            {/* Contact info */}
            <div className="min-w-0 min-[900px]:col-span-2">
              <h2 className={h2Cls}>Direct details</h2>
              <div className="bg-bg-card-solid rounded-[20px] p-[24px] space-y-[24px]">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-[12px]">
                    <item.icon className="text-accent mt-[2px] shrink-0" size={20} />
                    <div>
                      <span className="text-text-muted text-xs uppercase tracking-wider block mb-[2px]">{item.label}</span>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className={innerCls}>
          <h2 className={h2Cls}>Download my CV</h2>
          <ul className="space-y-[16px]">
            {CVS.map((cv) => (
              <li key={cv.href} className="flex items-start gap-[12px]">
                <FileText className="text-accent mt-[2px] shrink-0" size={20} aria-hidden="true" />
                <div>
                  <a href={cv.href} download className="deep-link">
                    {cv.title} CV
                  </a>
                  <p className="text-text-body">{cv.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className={innerCls}>
          <h2 className={h2Cls}>Questions recruiters ask</h2>
          <div className="space-y-[24px]">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 className={h3Cls}>{f.q}</h3>
                <p className="text-text-body">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
