import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { NamedIcon } from "@/components/ui/Icons";
import { skillGroups } from "@/data/profile";

// Column spans on a 6-column desktop grid, in the same order as skillGroups.
const spans = {
  languages: "lg:col-span-2",
  frontend: "lg:col-span-4",
  backend: "lg:col-span-3",
  databases: "lg:col-span-3",
  tools: "lg:col-span-4",
  other: "lg:col-span-2",
};

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad border-y border-line/60 bg-panel/40">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="skills-title" title="Technical skills">
            The tools I use to build and ship full stack applications.
          </SectionHeading>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.04} className={spans[group.id]}>
              <div className="group h-full rounded-2xl border border-line bg-panel p-6 transition duration-300 hover:border-accent/50 hover:bg-raised">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-ink">
                    <NamedIcon name={group.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{group.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li key={skill} className="chip transition group-hover:border-accent/30">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
