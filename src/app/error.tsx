"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="relative z-10 mx-auto max-w-[760px] px-5 md:px-10 pt-32 pb-24 text-center">
      <h1 className="text-[36px] md:text-[48px] font-bold leading-[1.1] text-text-primary mb-6">Something went wrong</h1>
      <p className="text-text-body mb-8">The page failed to load. Try again, or go back to the home page.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <button type="button" onClick={reset} className="min-h-[44px] rounded-lg bg-accent px-6 font-semibold text-black">
          Try again
        </button>
        <Link href="/" className="inline-flex min-h-[44px] items-center rounded-lg border border-border-subtle px-6 text-text-primary">
          Go home
        </Link>
      </div>
    </section>
  );
}
