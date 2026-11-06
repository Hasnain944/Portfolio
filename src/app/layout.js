import "./globals.css";
import Providers from "@/components/ui/Providers";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { site } from "@/data/site";

const title = `${site.name} | ${site.title} (${site.titleDetail})`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  keywords: [
    "Hasnain Ali", "Full Stack Developer", "MERN Stack", "Next.js developer", "React developer",
    "Node.js", "MongoDB", "PostgreSQL", "Tailwind CSS", "Haripur", "Pakistan", "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.name} Portfolio`,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#0c1016", colorScheme: "dark" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: `${site.title} (${site.titleDetail})`,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Haripur", addressRegion: "Khyber Pakhtunkhwa", addressCountry: "PK" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Pak-Austria Fachhochschule (PAF-IAST)" },
  sameAs: [site.linkedin, site.github].filter(Boolean),
  knowsAbout: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Tailwind CSS", "REST APIs"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only z-[70] rounded-lg bg-accent px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
