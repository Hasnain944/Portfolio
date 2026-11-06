"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import useActiveSection from "@/hooks/useActiveSection";

const sectionIds = navLinks.map((l) => l.href.slice(1));

function Logo({ onClick }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label={`${site.name}, back to top`}
      className="group inline-flex items-center gap-2.5"
    >
      <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-accent/40 bg-accent/10 font-display text-sm font-bold text-accent transition group-hover:bg-accent group-hover:text-ink">
        {site.initials}
      </span>
      <span className="hidden font-display text-base font-semibold sm:block">{site.name}</span>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  // The mobile menu locks page scroll while open, which blocks normal anchor jumps.
  // Close the menu first, then scroll once the lock has been released.
  const goTo = (e, href) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document.querySelector(href)?.scrollIntoView();
        history.replaceState(null, "", href);
      })
    );
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line/70 bg-ink/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between">
        <Logo onClick={(e) => (open ? goTo(e, "#home") : undefined)} />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a href={site.cv} download={site.cvFileName} className="btn-ghost hidden !px-4 !py-2 sm:inline-flex">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CV
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-fg transition hover:bg-raised lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pb-6 pt-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => goTo(e, link.href)}
                    aria-current={active === link.href.slice(1) ? "location" : undefined}
                    className={`block rounded-lg px-3 py-3 font-display text-lg ${
                      active === link.href.slice(1) ? "bg-raised text-accent" : "text-fg hover:bg-raised"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-3">
                <a href={site.cv} download={site.cvFileName} className="btn-primary w-full">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
