export default function SectionHeading({ id, title, children }) {
  return (
    <header className="mb-12 max-w-2xl">
      <h2 id={id} className="h-display text-3xl sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{children}</p>}
    </header>
  );
}
