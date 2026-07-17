export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  // CSS-only reveal: paints without waiting for JS hydration (see .page-in in globals.css)
  return <div className="relative z-10 page-in">{children}</div>;
}
