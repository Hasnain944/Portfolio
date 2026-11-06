import { Mail } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  const social = [
    { label: "Email", href: site.gmailCompose, external: true, icon: <Mail className="h-5 w-5" aria-hidden="true" /> },
    { label: "LinkedIn", href: site.linkedin, icon: <LinkedinIcon />, external: true },
    site.github && { label: "GitHub", href: site.github, icon: <GithubIcon />, external: true },
  ].filter(Boolean);

  return (
    <footer className="border-t border-line/70">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
        <div>
          <a href="#home" className="inline-flex items-center gap-2.5" aria-label={`${site.name}, back to top`}>
            <span className="grid h-10 w-10 place-items-center rounded-[11px] border border-accent/40 bg-accent/10 font-display text-sm font-bold text-accent">
              {site.initials}
            </span>
            <span className="font-display text-lg font-semibold">{site.name}</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.title} ({site.titleDetail}) based in Haripur, Pakistan.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted transition hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-3">
          {social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                aria-label={s.label}
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid h-11 w-11 place-items-center rounded-xl border border-line text-muted transition hover:border-accent/60 hover:text-accent"
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-line/70 py-5 text-center text-xs text-muted">
        © {year} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
