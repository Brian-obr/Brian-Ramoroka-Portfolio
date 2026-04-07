export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 md:mb-12">
      <h2 className="text-2xl md:text-[2rem] font-bold leading-[1.2] text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary text-base">{subtitle}</p>
      )}
    </div>
  );
}
