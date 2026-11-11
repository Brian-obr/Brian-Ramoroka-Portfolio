"use client";
import { Home, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { CONTACT } from "@/lib/site";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center pt-16">
      <div className="text-center px-5">
        <h1 className="text-3xl font-semibold text-text-primary mb-4">Something went wrong on this page</h1>
        <p className="text-text-body mb-8">Try again, or email me at {CONTACT.email} if it keeps happening.</p>
        <ButtonGroup className="justify-center">
          <button type="button" onClick={reset} className="btn btn-primary" data-btn>
            <RotateCcw aria-hidden="true" />
            <span>Try again</span>
          </button>
          <Button href="/" icon={Home} variant="secondary">
            Go home
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
}
