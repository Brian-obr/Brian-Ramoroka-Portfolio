import { Mail, Phone, MapPin } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/SocialIcons";

interface ContactInfoRowProps {
  layout?: "horizontal" | "vertical";
}

const contactItems = [
  { icon: Mail, label: "ramorokaob@gmail.com", href: "mailto:ramorokaob@gmail.com" },
  { icon: LinkedinIcon, label: "linkedin.com/in/brian-obr", href: "https://za.linkedin.com/in/brian-obr" },
  { icon: Phone, label: "+27 81 379 8635", href: "tel:+27813798635" },
  { icon: MapPin, label: "Cape Town, SA", href: "https://maps.app.goo.gl/Xo5NwbBgxwXTpZyi6" },
];

export default function ContactInfoRow({ layout = "horizontal" }: ContactInfoRowProps) {
  const isHorizontal = layout === "horizontal";

  return (
    <div className={`flex ${isHorizontal ? "flex-row flex-wrap gap-4 items-center" : "flex-col gap-3"}`}>
      {contactItems.map(({ icon: Icon, label, href }, i) => {
        const content = (
          <span className={`flex items-center gap-2 text-sm font-bold text-accent underline
            ${href ? "hover:text-[#FFB800CC] hover:no-underline transition-colors" : ""}`}>
            <Icon size={16} className="flex-shrink-0" />
            <span>{label}</span>
          </span>
        );

        return (
          <div key={i} className="flex items-center">
            {href ? (
              <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                {content}
              </a>
            ) : content}
            {isHorizontal && i < contactItems.length - 1 && (
              <span className="ml-4 text-text-muted hidden sm:inline">&middot;</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
