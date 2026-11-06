import { Mail, MapPin, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { site } from "@/data/site";
import ContactForm from "./ContactForm";
import CopyButton from "./CopyButton";

export default function Contact() {
  const methods = [
    { label: "Email", value: site.email, href: site.gmailCompose, external: true, copy: site.email, icon: <Mail className="h-5 w-5" aria-hidden="true" /> },
    { label: "Phone", value: site.phone, href: `tel:${site.phoneHref}`, icon: <Phone className="h-5 w-5" aria-hidden="true" /> },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/hasnain-ali-97871233b",
      href: site.linkedin,
      icon: <LinkedinIcon />,
      external: true,
    },
    site.github && {
      label: "GitHub",
      value: site.github.replace(/^https?:\/\//, ""),
      href: site.github,
      icon: <GithubIcon />,
      external: true,
    },
  ].filter(Boolean);

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad border-t border-line/60 bg-panel/40">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Reveal className="min-w-0">
            <SectionHeading id="contact-title" title="Let’s work together">
              I am looking for a Full Stack Developer role where I can build useful software products. If you have a
              position or project in mind, send me a message.
            </SectionHeading>

            <ul className="space-y-3">
              {methods.map((m) => (
                <li key={m.label} className="flex items-stretch gap-2">
                  <a
                    href={m.href}
                    {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-w-0 flex-1 items-center gap-4 rounded-xl border border-line bg-panel p-4 transition hover:border-accent/50 hover:bg-raised"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-ink">
                      {m.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-muted">{m.label}</span>
                      <span className="block truncate font-medium">{m.value}</span>
                    </span>
                  </a>
                  {m.copy && <CopyButton text={m.copy} label="Copy" className="!rounded-xl self-stretch" />}
                </li>
              ))}
              <li className="flex items-center gap-4 px-4 pt-2 text-sm text-muted">
                <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
                {site.location}
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <div className="rounded-2xl border border-line bg-panel p-6 sm:p-8">
              <h3 className="h-display text-xl">Send a message</h3>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
