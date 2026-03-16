import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg p-4">
      <div className="text-center">
        <div className="mb-6 text-8xl">💊</div>
        <h1 className="mb-2 text-4xl font-bold text-text">404</h1>
        <h2 className="mb-4 text-xl text-text-secondary">Page Not Found</h2>
        <p className="mb-8 max-w-md text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-xl bg-primary px-7 py-3 text-white transition-colors hover:bg-primary-dark"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
