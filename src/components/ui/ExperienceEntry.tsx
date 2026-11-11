import { h3Cls, listCls } from "@/lib/page-classes";
import type { Experience } from "@/types";

export default function ExperienceEntry({ experience }: { experience: Experience }) {
  return (
    <article className="relative grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-4 md:gap-0">
      {/* Left: date + company (desktop) */}
      <div className="hidden md:flex flex-col items-start text-left pt-1 pr-6">
        <span className="font-mono text-sm text-accent">{experience.dates}</span>
        <span className="text-sm text-ink font-bold mt-1">{experience.company}</span>
      </div>

      {/* Timeline line + dot (desktop) */}
      <div className="hidden md:flex flex-col items-center w-6">
        <div className="w-3 h-3 rounded-full bg-amber border-2 border-accent flex-shrink-0 mt-1.5" />
        <div className="flex-1 w-px bg-border-subtle" />
      </div>

      {/* Mobile: date + company on top */}
      {/* Phones: date and company stacked, not side by side and wrapping */}
      <div data-exp-meta className="md:hidden mb-3 flex items-start gap-3">
        <div className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-amber" />
        <div className="flex flex-col">
          <span data-exp-date className="font-mono text-sm text-accent">{experience.dates}</span>
          <span data-exp-company className="text-sm font-bold text-ink">{experience.company}</span>
        </div>
      </div>

      {/* Right: content */}
      <div className="min-w-0 md:ml-6 rounded-2xl glass border border-border-subtle p-5 md:p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-1">
          {experience.title}, {experience.company}
        </h2>
        <p className="text-sm text-text-muted mb-4">{experience.where}</p>
        <p className="text-base text-text-body leading-relaxed mb-6">{experience.intro}</p>

        <div className="space-y-[24px]">
          {experience.groups.map((group) => (
            <div key={group.heading ?? experience.title}>
              {group.heading && <h3 className={h3Cls}>{group.heading}</h3>}
              <ul className={listCls}>
                {group.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
