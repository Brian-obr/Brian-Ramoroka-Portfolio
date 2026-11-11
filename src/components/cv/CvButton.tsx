import { Download } from "lucide-react";

/** Opens the site-wide CV chooser (see CvDialog). */
export default function CvButton({ variant = "primary" }: { variant?: "primary" | "secondary" }) {
  return (
    <button type="button" className={`btn btn-${variant}`} data-cv-open data-btn data-cta aria-haspopup="dialog">
      <span>Download my CV</span>
      <Download aria-hidden="true" />
    </button>
  );
}
