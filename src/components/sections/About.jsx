import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { NamedIcon } from "@/components/ui/Icons";
import { objective, softSkills, strengths, summary } from "@/data/profile";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="about-title" title="About me">
            Production experience across the MERN stack and Next.js, from the interface to the database.
          </SectionHeading>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
          <Reveal className="space-y-8">
            <div>
              <h3 className="h-display text-xl">Professional summary</h3>
              <p className="mt-3 leading-relaxed text-muted">{summary}</p>
            </div>
            <div>
              <h3 className="h-display text-xl">How I work</h3>
              <p className="mt-3 leading-relaxed text-muted">
                My work covers the whole path of a feature: a responsive interface, the REST APIs behind it,
                authentication and database design, and deployment. That lets me take a product requirement and see
                it through without handing it across a gap between frontend and backend.
              </p>
            </div>
            <div>
              <h3 className="h-display text-xl">Career objective</h3>
              <p className="mt-3 border-l-2 border-accent/60 pl-4 leading-relaxed text-fg/90">{objective}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="h-display text-xl">Professional strengths</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {strengths.map((s) => (
                <li key={s.title} className="flex gap-4 py-5">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                    <NamedIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-display text-base font-semibold">{s.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <h3 className="h-display text-xl">Working style</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {softSkills.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
