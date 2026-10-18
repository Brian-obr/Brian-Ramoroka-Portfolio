import Container from "./Container";

/** Top of every inner page: one H1 and a short lead, no eyebrow. */
export default function PageIntro({ title, lead, children }: { title: string; lead: string; children?: React.ReactNode }) {
  return (
    <Container className="pt-12 pb-10 md:pt-20 md:pb-14">
      <h1 className="text-display font-semibold text-ink max-w-[18ch]">{title}</h1>
      <p className="mt-5 text-lead text-muted max-w-[62ch]">{lead}</p>
      {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
    </Container>
  );
}
