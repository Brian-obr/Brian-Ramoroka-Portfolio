import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <Container className="pt-20 pb-10">
      <p className="font-mono text-[14px] text-muted">404</p>
      <h1 className="mt-2 text-display font-semibold text-ink">This page doesn&apos;t exist</h1>
      <p className="mt-5 max-w-[56ch] text-lead text-muted">It may have moved when the site was rebuilt. These are the main pages:</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">Work</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">Contact</ButtonLink>
      </div>
    </Container>
  );
}
