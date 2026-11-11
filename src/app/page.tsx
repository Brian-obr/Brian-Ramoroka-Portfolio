import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { personLd } from "@/lib/schema";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/sections/ContactForm";
import CvButton from "@/components/cv/CvButton";
import Flag from "@/components/home/Flag";
import ProjectTabs from "@/components/home/ProjectTabs";
import { IMAGE_QUALITY } from "@/lib/image-quality";
import { CONTACT, MAILTO } from "@/lib/site";
import { ALL_SKILLS, SKILLS_PREVIEW } from "@/lib/skills";
import {
  ABOUT,
  CONTACT_LEDE,
  EDUCATION,
  EXPERIENCE,
  HERO,
  MARKETS,
  PROJECTS_INTRO,
  REACH_INTRO,
} from "@/lib/home-content";
import "./home.css";

// Home page ("Paper" layout). Each section links on to its full page.
export const metadata: Metadata = pageMetadata({
  title: "Brian Ramoroka | Front-end Developer | Cape Town",
  description:
    "Brian Ramoroka is a front-end developer in Cape Town and an SEO Web Developer at Rhiza Babuyile, working in WordPress, Shopify and JavaScript.",
  path: "/",
  ogTitle: "Brian Ramoroka, Front-end Developer in Cape Town",
  ogDescription: "Front-end developer and SEO Web Developer at Rhiza Babuyile. Open to full-time roles in Cape Town, Gauteng and remote.",
});

/** "Back-end and languages" -> "backEndLanguages", for the skills.ts editor */
const key = (field: string) => {
  const w = field.replace(/ and /g, " ").replace(/[,-]/g, " ").split(/\s+/).filter(Boolean);
  return w[0].toLowerCase() + w.slice(1).map((x) => x[0].toUpperCase() + x.slice(1)).join("");
};

function More({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <p className="more">
      <Link href={href} className="go deep-link">
        {children}
      </Link>
    </p>
  );
}

export default function HomePage() {
  return (
    <div className="p1">
      <JsonLd data={personLd} />

      <section className="hero" aria-labelledby="hero-name">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              {/* Layered name: the name on two staggered lines, the role under an amber rule */}
              <h1 id="hero-name" className="name">
                <span>Brian</span>
                <span>Ramoroka</span>
              </h1>
              <p className="role">
                <i aria-hidden="true" />
                {HERO.title}
              </p>
              <p className="hook">{HERO.hook}</p>
              <p className="loc">{HERO.location}</p>
              <div className="actions">
                <CvButton />
                <Button href="/contact" icon={ArrowRight} variant="secondary" iconAfter>
                  Contact me
                </Button>
              </div>
              <p className="note mt-3">{HERO.notice}</p>
            </div>
            <figure className="polaroid">
              <span className="tape" aria-hidden="true" />
              <Image
                src="/images/brian-ramoroka-hero.webp"
                alt="Brian Ramoroka smiling, in a graduation gown, outside a university building"
                width={1200}
                height={1500}
                sizes="(min-width: 900px) 332px, calc(100vw - 68px)"
                quality={IMAGE_QUALITY.photo}
                loading="eager"
                fetchPriority="low"
              />
              <div className="badge-spin" aria-hidden="true">
                <svg viewBox="0 0 132 132">
                  <defs>
                    <path id="ring" d="M66,66 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
                  </defs>
                  <text>
                    <textPath href="#ring">
                      OPEN TO FULL-TIME ROLES · CAPE TOWN · GAUTENG · REMOTE · OPEN TO FULL-TIME ROLES · CAPE TOWN · GAUTENG · REMOTE ·{" "}
                    </textPath>
                  </text>
                </svg>
                <b>
                  Notice
                  <br />1 month
                </b>
              </div>
              {/* figcaption must be the first or last child of figure; the badge is absolutely positioned. */}
              <figcaption>{HERO.title}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <div className="ribbon">
        <div className="marquee">
          <div className="marquee-track">
            <ul aria-label="Skills">
              {ALL_SKILLS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <ul aria-hidden="true">
              {ALL_SKILLS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="sec" id="about" aria-labelledby="about-h">
        <div className="wrap">
          <h2 className="h2" id="about-h">
            About me
          </h2>
          <div className="about">
            <div className="about-sum">
              {ABOUT.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <More href="/about">More about me</More>
            </div>
            <figure>
              <Image
                src="/images/brian-ramoroka-graduation.webp"
                alt="Brian Ramoroka at his graduation in cap and gown"
                width={1200}
                height={1500}
                sizes="(min-width: 900px) 320px, calc(100vw - 40px)"
                quality={IMAGE_QUALITY.photo}
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="sec" id="experience" aria-labelledby="experience-h">
        <div className="wrap">
          <h2 className="h2" id="experience-h">
            Experience
          </h2>
          <div className="tl">
            {EXPERIENCE.map((x) => (
              <article key={x.company} className="tl-row">
                <div className="tl-meta" data-exp-meta>
                  <span className="d" data-exp-date>
                    {x.dates}
                  </span>
                  <span className="c" data-exp-company>
                    {x.company}
                  </span>
                </div>
                <div className="tl-dot" aria-hidden="true">
                  <i />
                  <b />
                </div>
                <div className="card tl-card">
                  <h3>{x.role}</h3>
                  <p>{x.summary}</p>
                  <ul>
                    {x.duties.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="reach">
            <h3>Markets I work in</h3>
            <p>{REACH_INTRO}</p>
            <ul className="mk-grid">
              {MARKETS.map((m) => (
                <li key={m.code} className="mk">
                  <Flag code={m.code} />
                  <span className="mk-n">{m.name}</span>
                  <span className="mk-t">{m.tld}</span>
                </li>
              ))}
            </ul>
          </div>
          <More href="/experience">See my full experience</More>
        </div>
      </section>

      <section className="sec" id="education" aria-labelledby="education-h">
        <div className="wrap">
          <h2 className="h2" id="education-h">
            Education
          </h2>
          <ul className="edu">
            {EDUCATION.map((ed) => (
              <li key={ed.credential}>
                <span className="yr">{ed.years}</span>
                <h3>{ed.credential}</h3>
                <p>{ed.school}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec" id="projects" aria-labelledby="projects-h">
        <div className="wrap">
          <h2 className="h2" id="projects-h">
            Projects
          </h2>
          <p className="proj-intro">{PROJECTS_INTRO}</p>
          <ProjectTabs />
          <More href="/portfolio">See all projects</More>
        </div>
      </section>

      <section className="sec" id="skills" aria-labelledby="skills-h">
        <div className="wrap">
          <h2 className="h2" id="skills-h">
            Skills
          </h2>
          <figure className="ed">
            <div className="ed-bar">
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="ed-f" aria-hidden="true">
                skills.ts
              </span>
            </div>
            <pre className="ed-code" aria-hidden="true">
              <code>
                <span className="k">export const</span> <span className="v">skills</span> = {"{"}
                {SKILLS_PREVIEW.map((f) => (
                  <span key={f.field}>
                    {"\n  "}
                    <span className="p">{key(f.field)}</span>: [
                    {f.skills.map((s, i) => (
                      <span key={s}>
                        <span className="s">&quot;{s}&quot;</span>
                        {i < f.skills.length - 1 ? ", " : ""}
                      </span>
                    ))}
                    ],
                  </span>
                ))}
                {"\n};"}
              </code>
            </pre>
            <figcaption className="vh">
              A few of my skills by field.{" "}
              {SKILLS_PREVIEW.map((f) => `${f.field}: ${f.skills.join(", ")}.`).join(" ")}
            </figcaption>
          </figure>
          <More href="/skills">See all skills</More>
        </div>
      </section>

      <section className="sec" id="contact" aria-labelledby="contact-h">
        <div className="wrap">
          {/* "Let's talk." on top at the same size as the other section titles, then the contact card and the form in one row */}
          <h2 className="h2" id="contact-h">
            Let&apos;s talk.
          </h2>
          <div className="contact-grid">
            <div className="card contact-card contact-info">
              <p className="contact-lede">{CONTACT_LEDE}</p>
              <dl className="kv">
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd>
                    <a className="deep-link" href={MAILTO}>
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Phone</dt>
                  <dd>
                    <a className="deep-link" href={CONTACT.phoneHref}>
                      {CONTACT.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">WhatsApp</dt>
                  <dd>
                    <a className="deep-link" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                      {CONTACT.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">LinkedIn</dt>
                  <dd>
                    <a className="deep-link" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/brian-obr
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">GitHub</dt>
                  <dd>
                    <a className="deep-link" href={CONTACT.github} target="_blank" rel="noopener noreferrer">
                      github.com/Brian-obr
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Location</dt>
                  <dd>{HERO.location}</dd>
                </div>
              </dl>
              {/* Buttons at the bottom of the card, beside the taller form */}
              <div className="actions contact-actions">
                <CvButton />
                <Button href={MAILTO} icon={Mail} variant="secondary">
                  Email me
                </Button>
              </div>
            </div>
            <div className="card contact-card">
              <h3 className="contact-lede">Send me a message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
