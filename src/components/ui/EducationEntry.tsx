interface EducationEntryProps {
  institution: string;
  credential: string;
  date: string;
}

export default function EducationEntry({ institution, credential, date }: EducationEntryProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
      <div>
        <p className="text-base font-semibold text-text-primary">{institution}</p>
        <p className="text-base text-text-secondary">{credential}</p>
      </div>
      <span className="text-sm text-text-muted sm:text-right flex-shrink-0">{date}</span>
    </div>
  );
}
