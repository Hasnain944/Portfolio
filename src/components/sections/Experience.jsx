"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { experience } from "@/data/profile";

export default function Experience() {
  const listRef = useRef(null);
  // The teal line fills as the visitor scrolls down the timeline.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 70%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.2 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="experience-title" title="Work experience">
            Five positions across full stack, frontend, and data work, most recent first.
          </SectionHeading>
        </Reveal>

        <ol ref={listRef} className="relative space-y-8 pl-8">
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent"
          />

          {experience.map((job) => (
            <li key={`${job.company}-${job.start}`} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-8 top-6 h-3.5 w-3.5 rounded-full border-2 bg-ink ${
                  job.current ? "border-gold shadow-[0_0_0_5px_rgba(240,195,106,0.15)]" : "border-accent"
                }`}
              />
              <Reveal y={12}>
                <article className="rounded-2xl border border-line bg-panel p-6 transition duration-300 hover:border-accent/40 sm:p-7">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold">{job.role}</h3>
                      <p className="mt-0.5 text-accent">{job.company}</p>
                    </div>
                    <p
                      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm ${
                        job.current ? "border-gold/40 bg-gold/10 text-gold" : "border-line text-muted"
                      }`}
                    >
                      <time>{job.start}</time>
                      <span aria-hidden="true">–</span>
                      <span className="sr-only">to</span>
                      <time>{job.end}</time>
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
