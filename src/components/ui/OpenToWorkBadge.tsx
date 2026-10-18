"use client";

export default function OpenToWorkBadge() {

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
      bg-bg-card backdrop-blur-[16px] border border-border-subtle">
      <span
        className="w-2 h-2 rounded-full bg-accent-green flex-shrink-0"
      />
      <span className="text-sm font-medium text-text-primary">Open to work</span>
    </div>
  );
}
