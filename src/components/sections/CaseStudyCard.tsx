import FramedShot from "@/components/ui/FramedShot";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { CaseStudy } from "@/lib/caseStudies";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";

/**
 * Case-study card, adapted from the Design canvas (DnwJEfrZrYr8Z3irXKDtiH).
 * - Stacked (< 1280 px): title, then screenshots, then summary/facts/buttons.
 * - From 1280 px: screenshots left (spanning both rows), title + text right, same height.
 * - Screenshots fill their frames (no blank space) and always show the page's full width,
 *   with nothing cut from the sides; the phone screenshot sits beside the website one.
 */
export default function CaseStudyCard({
  study,
  headingLevel = "h3",
  showReadMore = true,
  priority = false,
}: {
  study: CaseStudy;
  headingLevel?: "h2" | "h3";
  showReadMore?: boolean;
  priority?: boolean;
}) {
  const [main, phone] = study.images;
  const Heading = headingLevel;
  return (
    <div
      data-case-card
      className="glass grid grid-cols-[minmax(0,1fr)] gap-6 rounded-[20px] p-5 md:gap-8 md:p-9 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] xl:grid-rows-[auto_1fr] xl:gap-x-12 xl:gap-y-0"
    >
      {/* Title first, then screenshots, then text, in the HTML
          too, so screen readers and search engines get the heading before its content.
          From 1280 px a grid places the screenshots left (spanning both rows), title and text right. */}
      <div data-case-head className="flex min-w-0 flex-col items-start xl:col-start-2 xl:row-start-1">
        <span aria-hidden="true" className="mb-4 block h-[3px] w-10 bg-amber" />
        {study.kicker && <p className="eyebrow mb-2">{study.kicker}</p>}
        <Heading className="font-display mb-3 text-[28px] leading-[1.15] text-text-primary [overflow-wrap:anywhere] md:text-[32px]">
          {study.title}
        </Heading>
      </div>
      {/* Media: website + phone screenshots side by side (the phone never covers the website).
          Both are long-page captures narrower than their frames, so each fills its frame edge to edge
          (no blank space), always at the page's full width, top-anchored; the page continues past the
          frame's bottom edge. Stacked: a 4:3 frame. From 1280 px: as tall as the text column. */}
      <div data-case-media className="grid grid-cols-[minmax(0,1fr)_22%] gap-3 xl:col-start-1 xl:row-span-2 xl:row-start-1 xl:gap-4">
        <div className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-xl border border-border-subtle xl:aspect-auto xl:h-full xl:min-h-[360px]">
          <FramedShot
            data-case-main
            tall={main}
            stacked={main.stacked}
            alt={main.alt}
            sizesTall="400px"
            sizesStacked="75vw"
            eager={priority}
          />
        </div>
        {phone && (
          // The frame's height comes from the website screenshot's frame (same grid row), never from
          // the tall phone capture itself.
          <div className="relative min-w-0 overflow-hidden rounded-xl border border-border-hover shadow-lg">
            <FramedShot
              data-case-phone
              tall={phone}
              stacked={phone.stacked}
              alt={phone.alt}
              sizesTall="120px"
              sizesStacked="16vw"
              eager={priority}
            />
          </div>
        )}
      </div>
      <div data-case-body className="flex min-w-0 flex-col items-start xl:col-start-2 xl:row-start-2">
        <p data-case-summary className="mb-6 max-w-[68ch] text-text-body">{study.summary}</p>
        {study.facts.length > 0 && (
          <dl className="mb-6 w-full border-t border-border-hover">
            {study.facts.map((f) => (
              <div key={f.label} className="flex items-baseline gap-6 border-b border-border-hover py-3">
                <dt className="eyebrow w-[96px] shrink-0">{f.label}</dt>
                <dd className="min-w-0 text-[16px] text-text-primary [overflow-wrap:anywhere]">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {(showReadMore || study.link) && (
          <ButtonGroup className="w-full">
            {showReadMore && (
              <Button href={`/portfolio#${study.slug}`} icon={ArrowRight} iconAfter variant="secondary">
                Read the case study
              </Button>
            )}
            {study.link && (
              <Button href={study.link.href} icon={ExternalLink} iconAfter variant="secondary" external>
                {study.link.label}
              </Button>
            )}
          </ButtonGroup>
        )}
      </div>
    </div>
  );
}
