import { Globe } from "lucide-react";

// Flags drawn as inline SVG rather than emoji flags, which render differently on every platform.
const tri = (c1: string, c2: string, c3: string, vertical: boolean) =>
  vertical ? (
    <>
      <rect width="20" height="40" fill={c1} />
      <rect x="20" width="20" height="40" fill={c2} />
      <rect x="40" width="20" height="40" fill={c3} />
    </>
  ) : (
    <>
      <rect width="60" height="13.34" fill={c1} />
      <rect y="13.33" width="60" height="13.34" fill={c2} />
      <rect y="26.66" width="60" height="13.34" fill={c3} />
    </>
  );

const STARS = [0, 1, 2, 3, 4].flatMap((row) =>
  (row % 2 ? [5.2, 9.6, 14.0, 18.4] : [3.0, 7.4, 11.8, 16.2, 20.6]).map((cx) => ({ cx, cy: 2.6 + row * 3.9 })),
);

const FLAGS: Record<string, React.ReactNode> = {
  nl: tri("#AE1C28", "#FFFFFF", "#21468B", false),
  be: tri("#000000", "#FDDA24", "#EF3340", true),
  de: tri("#000000", "#DD0000", "#FFCE00", false),
  fr: tri("#002395", "#FFFFFF", "#ED2939", true),
  es: (
    <>
      <rect width="60" height="40" fill="#AA151B" />
      <rect y="10" width="60" height="20" fill="#F1BF00" />
    </>
  ),
  uk: (
    <>
      <clipPath id="uk-c">
        <rect width="60" height="40" />
      </clipPath>
      <g clipPath="url(#uk-c)">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="3" />
        <path d="M30,0 v40 M0,20 h60" stroke="#fff" strokeWidth="12" />
        <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="7" />
      </g>
    </>
  ),
  us: (
    <>
      <rect width="60" height="40" fill="#fff" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} y={(i * 6.154).toFixed(2)} width="60" height="3.08" fill="#B22234" />
      ))}
      <rect width="26" height="21.54" fill="#3C3B6E" />
      {STARS.map((s) => (
        <circle key={`${s.cx}-${s.cy}`} cx={s.cx} cy={s.cy.toFixed(1)} r=".9" fill="#fff" />
      ))}
    </>
  ),
};

export default function Flag({ code }: { code: string }) {
  if (code === "com") {
    return (
      <span className="flag mk-globe" aria-hidden="true">
        <Globe size={20} />
      </span>
    );
  }
  return (
    <svg className="flag" viewBox="0 0 60 40" width="48" height="32" aria-hidden="true">
      {FLAGS[code]}
    </svg>
  );
}
