"use client";
import { useEffect, useRef } from "react";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { CVS } from "@/lib/home-content";

/**
 * CV chooser. One native <dialog> for the whole site: any element with
 * [data-cv-open] opens it, focus returns to that element on close, and #cv in the URL opens it.
 */
export default function CvDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    let opener: HTMLElement | null = null;
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as Element).closest<HTMLElement>("[data-cv-open]");
      if (!btn) return;
      e.preventDefault();
      opener = btn;
      if (!d.open) d.showModal();
    };
    const onClose = () => opener?.focus();
    const onBackdrop = (e: MouseEvent) => e.target === d && d.close();
    document.addEventListener("click", onClick);
    d.addEventListener("close", onClose);
    d.addEventListener("click", onBackdrop);
    if (location.hash === "#cv") d.showModal();
    return () => {
      document.removeEventListener("click", onClick);
      d.removeEventListener("close", onClose);
      d.removeEventListener("click", onBackdrop);
    };
  }, []);

  return (
    <dialog ref={ref} className="cv-dialog" aria-labelledby="cv-title">
      <div className="cv-inner">
        <div className="cv-top">
          <h2 id="cv-title">Download my CV</h2>
          <button type="button" className="cv-close" aria-label="Close" onClick={() => ref.current?.close()}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <ul className="cv-list">
          {CVS.map((cv) => (
            <li key={cv.href} className="cv-card">
              <div className="cv-card-head">
                <FileText size={22} aria-hidden="true" className="shrink-0" />
                <div>
                  <h3>{cv.title}</h3>
                  <p>{cv.body}</p>
                </div>
              </div>
              <div className="cv-card-actions">
                <a className="btn btn-primary" href={cv.href} download data-btn data-cta>
                  <Download aria-hidden="true" />
                  <span>Download PDF</span>
                </a>
                <a className="btn btn-secondary" href={cv.href} target="_blank" rel="noopener noreferrer" data-btn>
                  <span>Open in a new tab</span>
                  <ExternalLink aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
