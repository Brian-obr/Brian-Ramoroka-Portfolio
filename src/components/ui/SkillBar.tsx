const levelWidth: Record<string, number> = {
  proficient: 100,
  experienced: 75,
  familiar: 50,
};

export default function SkillBar({
  name,
  level,
}: {
  name: string;
  level: "proficient" | "experienced" | "familiar";
}) {
  const width = levelWidth[level];
  const truncated = name.length > 25;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span
          className={`text-base font-medium text-text-primary ${
            truncated ? "truncate max-w-[200px]" : ""
          }`}
          title={truncated ? name : undefined}
        >
          {name}
        </span>
        <span className="text-xs text-text-muted capitalize">{level}</span>
      </div>
      <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
