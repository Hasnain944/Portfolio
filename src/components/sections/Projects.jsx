import { ChevronDown, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProjectCover from "@/components/ui/ProjectCover";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/profile";

function ProjectCard({ project }) {
  const featured = project.featured;
  return (
    <article
      className={`group flex h-full overflow-hidden rounded-2xl border border-line bg-panel transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_rgba(95,211,196,0.35)] ${
        featured ? "flex-col lg:flex-row" : "flex-col"
      }`}
    >
      <div className={featured ? "lg:w-[48%] lg:shrink-0 lg:[&>div]:h-full lg:[&>div]:min-h-[16rem] lg:[&>div]:aspect-auto" : ""}>
        <ProjectCover project={project} large={featured} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-muted">{project.period}</p>
        <h3 className={`mt-1 font-display font-semibold ${featured ? "text-2xl" : "text-xl"}`}>{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Technology stack for ${project.title}`}>
          {project.stack.map((t) => (
            <li key={t} className="chip !px-2.5 !py-0.5 text-xs">
              {t}
            </li>
          ))}
        </ul>

        <details className="group/details mt-5 border-t border-line pt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between rounded text-sm font-medium text-fg marker:hidden [&::-webkit-details-marker]:hidden">
            Project details
            <ChevronDown
              className="h-4 w-4 text-accent transition-transform group-open/details:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <ul className="mt-3 space-y-2.5">
            {project.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </details>

        {(project.live || project.github) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-5">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !px-4 !py-2"
                aria-label={`Open live site for ${project.title} (opens in a new tab)`}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Live site
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !px-4 !py-2"
                aria-label={`View source code for ${project.title} on GitHub (opens in a new tab)`}
              >
                <GithubIcon className="h-4 w-4" />
                Source code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad border-y border-line/60 bg-panel/40">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="projects-title" title="Featured projects">
            Eight projects spanning learning platforms, business sites, dashboards, and commerce.
          </SectionHeading>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <li key={project.slug} className={project.featured ? "sm:col-span-2" : ""}>
              <Reveal y={14} delay={(i % 3) * 0.05} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
