// Central, editable configuration. Everything personal lives here or in profile.js.

export const site = {
  name: "Hasnain Ali",
  initials: "HA",
  title: "Full Stack Developer",
  titleDetail: "MERN Stack / Next.js",
  location: "Haripur, Khyber Pakhtunkhwa, Pakistan",
  email: "hasnai0309@gmail.com",
  gmailCompose: "https://mail.google.com/mail/?view=cm&fs=1&to=hasnai0309@gmail.com",
  phone: "+92 346 2219309",
  phoneHref: "+923462219309",
  linkedin: "https://linkedin.com/in/hasnain-ali-97871233b",

  // Leave empty to hide the GitHub icon everywhere.
  github: "https://github.com/Hasnain944",

  // Put your photo in /public (for example /public/profile.jpg) and set "/profile.jpg".
  // Leave empty to show the HA monogram instead.
  profileImage: "/profile.jpg",

  cv: "/Hasnain-Ali-CV.pdf",
  cvFileName: "Hasnain-Ali-CV.pdf",

  description:
    "Portfolio of Hasnain Ali, a Full Stack Developer building scalable, responsive web applications with the MERN stack and Next.js. Based in Haripur, Pakistan.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hasnain-ali.vercel.app",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
