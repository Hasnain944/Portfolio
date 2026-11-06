"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { summary } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

const orbitChips = ["React.js", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "Tailwind CSS"];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Portrait() {
  return (
    <div className="relative h-64 w-52 sm:h-80 sm:w-64">
      {/* Arch-shaped frame. Swap the monogram for a photo by setting profileImage in src/data/site.js */}
      <div className="absolute inset-0 overflow-hidden rounded-t-[999px] rounded-b-[28px] border border-line bg-panel shadow-[0_30px_80px_-30px_rgba(95,211,196,0.35)]">
        {site.profileImage ? (
          <Image
            src={site.profileImage}
            alt={`Portrait of ${site.name}`}
            fill
            priority
            sizes="(min-width: 640px) 256px, 208px"
            className="object-cover"
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(95,211,196,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(95,211,196,.14) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                maskImage: "radial-gradient(circle at 50% 40%, #000 20%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(circle at 50% 40%, #000 20%, transparent 75%)",
              }}
            />
            <div
              role="img"
              aria-label={`${site.name} monogram`}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="h-display select-none bg-gradient-to-br from-white via-accent to-accent/40 bg-clip-text text-7xl font-bold text-transparent sm:text-8xl">
                {site.initials}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-ink/90 to-transparent pb-4 pt-10 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              Haripur, Pakistan
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function OrbitRing() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 [--ring:26rem] md:block"
    >
      <div className="absolute inset-0 rounded-full border border-dashed border-line" />
      <div className="orbit-ring animate-orbit">
        {orbitChips.map((label, i) => {
          const angle = (360 / orbitChips.length) * i;
          return (
            <div
              key={label}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transform: `rotate(${angle}deg) translateX(calc(var(--ring) / 2))` }}
            >
              {/* Layer 1 undoes the placement angle; layer 2 cancels the ring's spin; the span centres on the anchor. */}
              <div className="h-0 w-0" style={{ transform: `rotate(${-angle}deg)` }}>
                <div className="h-0 w-0 animate-counter">
                  <span className="block w-max -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-panel/95 px-3 py-1.5 text-xs font-medium text-fg shadow-lg shadow-black/30">
                    {label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero() {
  const social = [
    { label: "LinkedIn", href: site.linkedin, icon: <LinkedinIcon />, external: true },
    site.github && { label: "GitHub", href: site.github, icon: <GithubIcon />, external: true },
    { label: "Email", href: site.gmailCompose, external: true, icon: <Mail className="h-5 w-5" aria-hidden="true" /> },
  ].filter(Boolean);

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center pb-16 pt-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="mb-5 inline-flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
            {site.location}
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={item}
            className="h-display text-5xl leading-[0.98] sm:text-7xl lg:text-[5.5rem]"
          >
            {site.name}
          </motion.h1>

          <motion.p variants={item} className="mt-5 font-display text-xl font-medium text-accent sm:text-2xl">
            {site.title} <span className="text-muted">({site.titleDetail})</span>
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {summary}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
              View my work
            </a>
            <a href={site.cv} download={site.cvFileName} className="btn-ghost">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          </motion.div>

          <motion.ul variants={item} className="mt-8 flex gap-3">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-line text-muted transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex flex-col items-center lg:mx-0 lg:justify-self-center"
        >
          <div className="relative flex h-auto items-center justify-center md:h-[30rem] md:w-[30rem]">
            <Portrait />
            <OrbitRing />
          </div>
          {/* Phones and tablets: a static row replaces the orbit so nothing overflows. */}
          <ul className="mt-8 flex max-w-xs flex-wrap justify-center gap-2 md:hidden">
            {orbitChips.map((c) => (
              <li key={c} className="chip">
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
