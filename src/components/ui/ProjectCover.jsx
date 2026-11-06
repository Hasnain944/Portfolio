import Image from "next/image";
import { NamedIcon } from "@/components/ui/Icons";

// Shows a real screenshot when project.image is set; otherwise a generated cover.
export default function ProjectCover({ project, large = false }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes={large ? "(min-width: 1024px) 900px, 100vw" : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"}
          quality={90}
          className="object-cover object-left-top transition duration-500 group-hover:scale-[1.03]"
        />
        {project.illustrative && (
          <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-ink/80 px-2.5 py-1 text-[11px] text-muted backdrop-blur">
            Illustrative preview
          </span>
        )}
      </div>
    );
  }

  const h = project.hue;
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/10] w-full overflow-hidden"
      style={{ background: `linear-gradient(140deg, hsl(${h} 45% 17%), hsl(${h} 40% 8%) 70%)` }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(hsl(${h} 60% 70% / .12) 1px, transparent 1px), linear-gradient(90deg, hsl(${h} 60% 70% / .12) 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(circle at 30% 30%, #000, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 30% 30%, #000, transparent 75%)",
        }}
      />
      <div
        className="absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl"
        style={{ background: `hsl(${h} 80% 60% / .28)` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="grid h-16 w-16 place-items-center rounded-2xl border backdrop-blur-sm transition duration-500 group-hover:scale-110 group-hover:-rotate-3"
          style={{
            borderColor: `hsl(${h} 70% 70% / .45)`,
            background: `hsl(${h} 50% 14% / .75)`,
            color: `hsl(${h} 85% 75%)`,
          }}
        >
          <NamedIcon name={project.icon} className="h-8 w-8" />
        </span>
      </div>
    </div>
  );
}
