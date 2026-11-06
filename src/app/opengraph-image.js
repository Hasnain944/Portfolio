import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}, ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "80px", background: "#0c1016", color: "#e8ecf2",
          backgroundImage: "radial-gradient(circle at 15% 0%, rgba(95,211,196,0.22), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", width: 96, height: 96,
            borderRadius: 24, border: "3px solid rgba(95,211,196,0.6)", color: "#5fd3c4",
            fontSize: 44, fontWeight: 700, marginBottom: 40,
          }}
        >
          {site.initials}
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>{site.name}</div>
        <div style={{ fontSize: 40, color: "#5fd3c4", marginTop: 14 }}>
          {`${site.title} (${site.titleDetail})`}
        </div>
        <div style={{ fontSize: 28, color: "#9aa6b8", marginTop: 28 }}>{site.location}</div>
      </div>
    ),
    size
  );
}
