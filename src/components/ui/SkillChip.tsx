"use client";

interface SkillChipProps {
  name: string;
  index?: number;
}

export default function SkillChip({ name, index = 0 }: SkillChipProps) {

  return (
    <span
      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
        bg-bg-subtle backdrop-blur-[8px] border border-border-subtle text-text-body
        hover:border-border-hover hover:text-accent transition-colors cursor-default"
    >
      {name}
    </span>
  );
}
