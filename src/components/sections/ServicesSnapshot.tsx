import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";

const services = [
  {
    iconName: "Code2",
    title: "Web Development",
    description:
      "Building custom, responsive websites with modern frameworks. Every project is crafted for performance, accessibility, and clean code.",
  },
  {
    iconName: "Search",
    title: "SEO Strategy",
    description:
      "Driving organic growth through technical SEO, content optimization, and data-driven strategies that improve search visibility.",
  },
  {
    iconName: "LayoutDashboard",
    title: "Web Applications",
    description:
      "Developing full-stack web applications with robust backends, real-time features, and intuitive user interfaces.",
  },
  {
    iconName: "Bot",
    title: "AI Integration",
    description:
      "Integrating AI-powered automation and intelligent features into existing workflows and applications.",
  },
];

export default function ServicesSnapshot() {
  return (
    <section className="py-14 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
        <SectionHeading title="What I Do" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
