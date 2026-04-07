interface SectionLabelProps {
  label: string;
}

export default function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-8 h-px bg-accent" />
      <span
        className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-accent"
      >
        {label}
      </span>
    </div>
  );
}
