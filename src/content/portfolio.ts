export const profile = {
  name: "Nafi Ul Sheak",
  email: "nafiulsheak.pubcse@gmail.com",

  whatsapp: "01540395870",
  whatsappHref: "https://api.whatsapp.com/send?phone=8801540395870",
  calendar: "https://cal.com/nafiulsheak",
  location: "Bogura, Bangladesh",
  timezone: "GMT+6 (BST)",

  valueProp:
    "Building high-performance web applications and fluid interactive interfaces that turn complex workflows into clean, effortless digital experiences.",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/nafi181281" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nafiul-sheak-887285351/" },
  { label: "WhatsApp", href: profile.whatsappHref },
  { label: "YouTube", href: "https://www.youtube.com/@CODEWITHSHEAK" },
  { label: "Threads", href: "https://www.threads.com/@nafi_ulsheak" },
   { label: "Facebook", href: "https://www.facebook.com/share/1DgXQBqhbt/" },
];

export type Project = {
  name: string;
  category: string;
  role: string;
  year: string;
  stack: string[];
  summary: string;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: "PUB SuperVise",
    category: "Academic Management Portal & Web Platform",
    role: "Full-Stack Developer & Frontend Architect",
    year: "2026",
    stack: ["Next.js", "TypeScript", "React", "Prisma", "Tailwind CSS", "PostgreSQL"],
    summary:
      "The university had no single digital system for final-year project and thesis submissions, mentor tracking or paper archiving, so files went missing and communication broke down. PUB SuperVise gives teachers and students one automated, end-to-end flow for proposal submission, real-time milestone reviews and a central paper archive.",
    links: [{ label: "GitHub", href: "https://github.com/nafi181281/PubSupervise" }],
  },
  {
    name: "RedNav",
    category: "3D Planetary Mapping & Astronaut HUD Visualizer",
    role: "Core Frontend & 3D Interactive Developer",
    year: "2026",
    stack: ["Next.js", "React", "Three.js / WebGL", "TypeScript", "NASA/USGS PDS Data APIs"],
    summary:
      "At a space hackathon, complex geospatial data made it hard for astronauts to plan surface expeditions and navigate rough Martian terrain. RedNav (rednav-N399) combines high-resolution 3D models of Martian terrain, including Bogura Crater, with a neon HUD built for helmet visors, showing real-time no-go zones and slope analysis.",
    links: [{ label: "GitHub", href: "https://github.com/nafi181281/RedNav-N399" }],
  },
  {
    name: "FluxMath",
    category: "Glassmorphic Scientific Web Calculator",
    role: "Frontend Developer & UI Designer",
    year: "2026",
    stack: ["Semantic HTML5", "Vanilla CSS3", "JavaScript (ES6+)"],
    summary:
      "Most online calculators are packed with ads and slow, heavy scripts that ruin the experience. FluxMath is a fast, lightweight scientific calculator with a modern frosted-glass interface, built with pure CSS and vanilla JavaScript and no heavy frameworks.",
    links: [
      { label: "Live demo", href: "https://nafi181281.github.io/FluxMath/" },
      { label: "GitHub", href: "https://github.com/nafi181281/FluxMath" },
    ],
  },
  {
    name: "Native Banking Portal",
    category: "Core Banking System — Windows Desktop Application",
    role: "Systems & Software Developer",
    year: "2026",
    stack: ["C", "Win32 GUI API", "Low-level system calls"],
    summary:
      "Banking terminals need reliable, memory-efficient client software that runs smoothly without heavy frameworks. This high-performance desktop banking client is written in C on a pure Win32 API architecture, with a clean blue-and-white interface and secure transaction logic.",
    links: [{ label: "GitHub", href: "https://github.com/nafi181281/sonali-bank-atm" }],
  },
];

export const bio = [
  "I’m Nafiul Islam Sheak Nafi, a software and frontend engineer. I study Computer Science & Engineering at Pundra University of Science & Technology (PUB), and alongside my studies I build modern web applications and system software that solve real problems.",
  "My core strengths are performance-first architecture and clean code. I’m most at home turning complex business logic into easy-to-use digital platforms and crafting interactive, fluid interfaces.",
  "From an academic management portal in Next.js and Prisma, to a 3D space-mapping tool built at a hackathon, to desktop apps in low-level C and the Win32 API — every project balances reliability, speed and modern design.",
];

export const services = [
  {
    n: "01",
    title: "Web & App Development",
    text: "Scalable, high-performing, responsive web applications built with Next.js, TypeScript and a modern frontend stack — with backend integration, database modelling (Prisma/PostgreSQL) and secure system architecture.",
  },
  {
    n: "02",
    title: "UI/UX & Interaction Design",
    text: "Clean, user-friendly interfaces that blend modern dark-theme aesthetics, glassmorphism and micro-interactions, so every interaction feels smooth and purposeful.",
  },
  {
    n: "03",
    title: "Performance & SEO",
    text: "Lightweight code, optimised assets and modern semantic HTML5 for fast page loads and strong search engine visibility.",
  },
];

export const stack = [
  {
    group: "Frontend",
    items: ["Next.js", "React", "TypeScript", "JavaScript (ES6+)", "Semantic HTML5", "CSS3 / Tailwind CSS"],
  },
  { group: "Backend & Database", items: ["Node.js", "Prisma", "PostgreSQL"] },
  { group: "Systems & Core", items: ["C Language", "Win32 GUI API"] },
  { group: "Tools & Deployment", items: ["Git", "GitHub", "Vercel", "VS Code"] },
];

export const experience = [
  {
    role: "Lead Web Engineer & Platform Developer",
    org: "PUB SuperVise Project",
    period: "2026 – Present",
    text: "Leading the full frontend architecture, database schema design and performance optimisation of the department’s thesis and project management platform.",
  },
  {
    role: "Core Frontend & Interactive Visualizer",
    org: "Team NAKKHATRA-399",
    period: "2026",
    text: "Built the Mars-surface and no-go-zone navigation HUD for an interplanetary hackathon.",
  },
  {
    role: "Team Representative & Systems Builder",
    org: "Team BUG SLAYER / GradPath",
    period: "2026",
    text: "Led the hackathon team at PUB CSE Fest 2026, writing the system proposal and building the prototype.",
  },
  {
    role: "Independent Frontend & Web Developer",
    org: "Self-Employed / Freelance",
    period: "2024 – Present",
    text: "Delivering custom web interfaces, glassmorphic tools and responsive web applications for clients and open-source projects.",
  },
];

export const achievements = [
  {
    title: "Research paper submission",
    text: "Submitted a paper on real-time pose tracking with YOLOv8-Pose and machine-learning classifiers to the RURS International Conference & Research Fair (RICRF 2026).",
  },
  {
    title: "Hackathons & space tech",
    text: "Took part in the NASA Space Apps Challenge and an interplanetary survival hackathon, building the 3D space-mapping tool RedNav.",
  },
];

export const testimonial = {
  quote:
    "Nafi possesses an exceptional eye for modern frontend details and clean system architecture. His work on the departmental management platform demonstrated both high technical reliability and fluid user experience.",
  source: "Peer / Academic Review",
};

export const pages = {
  work: {
    title: "Work — Nafi Ul Sheak",
    description:
      "Selected projects by Nafi Ul Sheak: an academic management portal, a 3D Mars mapping HUD, a glassmorphic calculator and a native Win32 banking client.",
    heading: "Building fast, purposeful digital products",
  },
  about: {
    title: "About — Nafi Ul Sheak",
    description:
      "About Nafi Ul Sheak, a CSE student and frontend & web application engineer from Bogura, Bangladesh — services, skills and tech stack.",
    heading: "Clean code, fluid interfaces and products that simply work",
  },
  experience: {
    title: "Experience — Nafi Ul Sheak",
    description:
      "Experience, hackathons, research and achievements of Nafi Ul Sheak, frontend & web application engineer.",
    heading: "Where I’ve built, competed and shipped",
  },
  contact: {
    title: "Contact — Nafi Ul Sheak",
    description:
      "Start a project with Nafi Ul Sheak. Send a message, call, chat on WhatsApp or book a 15–30 minute call.",
    heading: "Let’s build something exceptional together",
  },
};

export const contactForm = [
  { n: "01", name: "name", label: "What should I call you?", placeholder: "Your full name *", type: "text" },
  { n: "02", name: "email", label: "Where can I reach you?", placeholder: "you@example.com *", type: "email" },
  { n: "03", name: "organization", label: "Which company or team are you with?", placeholder: "Company or team name", type: "text" },
  { n: "04", name: "services", label: "What do you need help with?", placeholder: "Web app, UI/UX, Performance & SEO …", type: "text" },
  { n: "05", name: "message", label: "Tell me about your project", placeholder: "Hi Nafi, I’d love your help with … *", type: "textarea" },
] as const;
