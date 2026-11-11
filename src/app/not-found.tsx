import { Home, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center px-5">
        <h1 className="font-display text-[6rem] text-text-primary leading-none mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <ButtonGroup className="justify-center">
          <Button href="/" icon={Home}>
            Go home
          </Button>
          <Button href="/contact" icon={Send} variant="secondary">
            Contact me
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
