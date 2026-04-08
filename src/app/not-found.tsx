import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center px-5">
        <h1 className="text-[6rem] font-bold text-accent leading-none mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-accent text-bg-deep font-semibold px-8 py-3 rounded-lg hover:bg-accent-hover transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-block border-2 border-accent text-accent font-semibold px-8 py-3 rounded-lg hover:bg-accent hover:text-bg-deep transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}
