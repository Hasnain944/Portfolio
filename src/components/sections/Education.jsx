import { Award, GraduationCap } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { certifications, education } from "@/data/profile";

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section-pad">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="education-title" title="Education and certifications">
            A software engineering degree, backed by short courses in development, data, cloud, and security.
          </SectionHeading>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h3 className="h-display text-xl">Education</h3>
            <ol className="mt-5 space-y-4">
              {education.map((e) => (
                <li key={e.degree} className="flex gap-4 rounded-2xl border border-line bg-panel p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="font-display text-lg font-semibold">{e.degree}</h4>
                    <p className="mt-0.5 text-sm text-muted">{e.school}</p>
                    <p className="mt-2 inline-flex rounded-full border border-line px-3 py-0.5 text-sm text-fg/90">
                      <time>{e.start}</time>
                      <span aria-hidden="true" className="px-1">–</span>
                      <span className="sr-only">to</span>
                      <time>{e.end}</time>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="h-display text-xl">Certifications</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {certifications.map((c) => (
                <li
                  key={c}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3.5 text-sm transition hover:border-accent/50 hover:bg-raised"
                >
                  <Award className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
