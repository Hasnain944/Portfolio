import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[70vh] place-items-center pt-24 text-center">
      <div>
        <p className="font-display text-6xl font-bold text-accent">404</p>
        <h1 className="h-display mt-4 text-3xl">This page does not exist</h1>
        <p className="mt-3 text-muted">The link may be broken or the page may have moved.</p>
        <Link href="/" className="btn-primary mt-8">
          Back to the portfolio
        </Link>
      </div>
    </section>
  );
}
