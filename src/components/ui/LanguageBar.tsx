interface LanguageBarProps {
  language: string;
  proficiency: string;
  barWidth: number;
}

export default function LanguageBar({ language, proficiency, barWidth }: LanguageBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="sm:w-40 flex-shrink-0">
        <span className="text-base font-medium text-text-primary">{language}</span>
        <span className="text-sm text-text-muted ml-2">{proficiency}</span>
      </div>
      <div className="flex-1 h-2 rounded-full bg-bg-subtle overflow-hidden">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}
