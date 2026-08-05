/**
 * Single source of truth for all site content.
 * Derived from Ganesh_Balaraju 2.pdf (RevOps CV, 2026).
 *
 * Positioning is dual: Revenue Operations first, frontend engineering second —
 * the two reinforce each other (owning a CRM *and* building the tooling around
 * it), so the site leads with RevOps without dropping the engineering story.
 *
 * Icons are referenced by key and resolved to local react-icons components in
 * src/data/icons.js — no third-party CDN requests at runtime.
 */

export const Bio = {
  name: "Ganesh Balaraju",
  title: "Revenue Operations Analyst",
  headline: "Revenue Operations Analyst · HubSpot CRM, Data & Process Automation",
  roles: [
    "Revenue Operations Analyst",
    "HubSpot CRM Specialist",
    "Process Automation Engineer",
    "Frontend Developer",
  ],
  tagline:
    "I build the systems that make process improvements stick — not just recommend them.",
  description:
    "Revenue Operations professional with hands-on ownership of a live HubSpot CRM: process design, data hygiene, integrations and reporting that keep Sales, Marketing, Finance and Operations aligned around one pipeline. An engineering background means I build and automate the systems behind the process, and ship the dashboards that report on them.",
  location: "Berlin, Germany",
  email: "ganeshbalarajude@gmail.com",
  phone: "+49 176 43830537",
  github: "https://github.com/GaneshMandakapu",
  linkedin: "https://www.linkedin.com/in/ganeshbalaraju/",
  resume: "/Ganesh_Balaraju_Resume.pdf",
  availability: "Available from 1 October 2026",
};

/** Scannable proof points for the hero strip. */
export const highlights = [
  { value: "4+", label: "Years across engineering & ops" },
  { value: "1", label: "Live CRM owned end to end" },
  { value: "4", label: "Professional certifications" },
  { value: "3", label: "Countries delivered in" },
];

export const skills = [
  {
    title: "Revenue Operations & CRM",
    accent: "#FF7A59", // HubSpot orange
    skills: [
      { name: "HubSpot Sales Hub", icon: "hubspot" },
      { name: "HubSpot Service Hub", icon: "hubspot" },
      { name: "CRM Administration", icon: "crm" },
      { name: "Data Hygiene", icon: "database" },
      { name: "Pipeline Management", icon: "funnel" },
      { name: "Deal-Stage & Workflow Design", icon: "automation" },
      { name: "KPI & Funnel Reporting", icon: "report" },
      { name: "Forecasting", icon: "chart" },
    ],
  },
  {
    title: "Data & Analytics",
    accent: "#3CC2BD",
    skills: [
      { name: "SQL", icon: "sql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Python", icon: "python" },
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "ETL Pipelines", icon: "etl" },
    ],
  },
  {
    title: "Systems & Integration",
    accent: "#5856D6",
    skills: [
      { name: "HubSpot CRM API", icon: "hubspot" },
      { name: "Webhooks", icon: "webhook" },
      { name: "Event-Driven Sync", icon: "automation" },
      { name: "Make", icon: "make" },
      { name: "REST APIs", icon: "api" },
      { name: "FastAPI", icon: "fastapi" },
    ],
  },
  {
    title: "Frontend & Dashboards",
    accent: "#E50914",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
    ],
  },
  {
    title: "Platform & DevOps",
    accent: "#34C759",
    skills: [
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Git", icon: "git" },
    ],
  },
  {
    title: "Ways of Working",
    accent: "#FFD60A",
    skills: [
      { name: "Agile / Scrum", icon: "agile" },
      { name: "Jira", icon: "jira" },
      { name: "Stakeholder Management", icon: "users" },
      { name: "Process Documentation", icon: "report" },
    ],
  },
];

export const experiences = [
  {
    id: 0,
    role: "Working Student, Revenue Operations & Platform Automation",
    company: "Steinbeis University (Steinbeis Next)",
    date: "Dec 2024 – Present",
    location: "Berlin, Germany",
    current: true,
    bullets: [
      "Own the HubSpot CRM instance end to end — designed and built an event-driven integration with the Academy5 ERP that automated contract delivery and enrollment workflows, replacing manual handoffs between Sales/Admissions and Operations.",
      "Manage pipeline stage design and CRM data hygiene across the prospective-student lifecycle (lead → applicant → enrolled), improving forecast accuracy and funnel visibility for leadership.",
      "Defined and monitor operational KPIs — conversion rates by stage, enrollment forecasts, pipeline velocity — and built the Next.js/React dashboards that report them, replacing spreadsheet-based tracking.",
      "Standardised the deployment lifecycle for internal RevOps tooling on GitHub Actions, Docker and Kubernetes, with automated test and validation gates.",
      "Translate evolving cross-functional requirements (Sales, Ops, Finance) into working tools, including an automated lead-matching engine and internal qualification tooling.",
    ],
    skills: ["HubSpot CRM", "Process Design", "Next.js", "Kubernetes", "KPI Reporting"],
  },
  {
    id: 1,
    role: "Student Assistant, Data Infrastructure & Reporting",
    company: "Institute of Biometrics and Medical Informatics, OVGU",
    date: "Aug 2024 – Dec 2024",
    location: "Magdeburg, Germany",
    bullets: [
      "Built automated ETL pipelines in Python that ingested, cleaned and normalised highly variable records into structured PostgreSQL schemas, consolidating fragmented data into a single reporting-ready source.",
      "Developed FastAPI endpoints exposing curated datasets to a React/TypeScript reporting interface, replacing manual database queries for research staff.",
    ],
    skills: ["Python", "PostgreSQL", "ETL", "FastAPI", "React", "TypeScript"],
  },
  {
    id: 2,
    role: "Research Assistant",
    company: "Telemedicine, Digitalisation & Economics Dept, OVGU",
    date: "Sept 2023 – Aug 2024",
    location: "Magdeburg, Germany",
    bullets: [
      "Designed low- and high-fidelity prototypes for three applications using Figma and Adobe Suite.",
      "Developed applications targeting multiplatform devices.",
    ],
    skills: ["Figma", "Prototyping", "UX/UI"],
  },
  {
    id: 3,
    role: "Programmer Analyst",
    company: "Cognizant Technology Solutions",
    date: "Sept 2021 – Mar 2023",
    location: "Bangalore, India",
    bullets: [
      "Delivered feature modules and REST API integrations for the Dunkin' Donuts USA application within a cross-functional Agile team, coordinating with product and business stakeholders on release scope.",
    ],
    skills: ["REST APIs", "Agile", "Stakeholder Management"],
  },
];

/** On-site consulting engagement — distinct from salaried roles. */
export const clientDelivery = [
  {
    id: 0,
    title: "Enterprise Enablement & Process Alignment",
    client: "Home Credit Bank",
    location: "Almaty, Kazakhstan",
    date: "May 2026",
    bullets: [
      "Ran discovery sessions with the bank's business and technical stakeholders to identify process and infrastructure gaps.",
      "Designed and delivered a four-day on-site programme on scalable process architecture and system integration.",
    ],
    skills: ["Discovery", "Process Architecture", "System Integration", "Facilitation"],
  },
];

export const education = [
  {
    id: 0,
    school: "Otto von Guericke University",
    degree: "M.Sc. Digital Engineering",
    date: "Apr 2023 – Oct 2026 (expected)",
    location: "Magdeburg, Germany",
    desc: "Thesis: automated user story classification using a hybrid BERT + Bi-GRU model, with NLP pipelines for structuring enterprise software requirements. Focus: Machine Learning, Distributed Systems, Database Concepts, Software Development.",
  },
  {
    id: 1,
    school: "Visvesvaraya Technological University",
    degree: "B.E. Telecommunication Engineering",
    date: "Aug 2017 – Aug 2021",
    location: "Bangalore, India",
    desc: "Coursework in Neural Networks, Computer Networking, Signal Processing and Object Oriented Programming.",
  },
];

/**
 * `github` / `webapp` are intentionally null where no public link exists —
 * the card hides the button rather than rendering a dead link.
 */
export const projects = [
  {
    id: 0,
    title: "HubSpot ↔ Academy5 ERP Integration",
    subtitle: "Revenue Operations",
    date: "2025 – 2026",
    description:
      "Event-driven integration connecting the HubSpot CRM to the Academy5 ERP, automating contract delivery and enrollment so deals close without manual handoff between Sales/Admissions and Operations.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["HubSpot API", "Webhooks", "Event-Driven", "Python", "Automation"],
    category: "revops",
    github: null,
    webapp: null,
    featured: true,
    confidential: true,
  },
  {
    id: 1,
    title: "Pipeline KPI Dashboards",
    subtitle: "Revenue Operations",
    date: "2025 – 2026",
    description:
      "Next.js/React dashboards reporting conversion rate by stage, enrollment forecasts and pipeline velocity — replacing spreadsheet tracking as the operations team's source of truth.",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=500&fit=crop",
    tags: ["Next.js", "React", "KPI Reporting", "Forecasting", "SQL"],
    category: "revops",
    github: null,
    webapp: null,
    featured: true,
    confidential: true,
  },
  {
    id: 2,
    title: "User Story Classification",
    subtitle: "M.Sc. Thesis · BERT + Bi-GRU",
    date: "2026",
    description:
      "A hybrid BERT + Bi-GRU model that automatically classifies user stories, with NLP pipelines for structuring enterprise software requirements.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop",
    tags: ["BERT", "Bi-GRU", "NLP", "Python", "PyTorch"],
    category: "data",
    github: null,
    webapp: null,
    featured: true,
  },
  {
    id: 3,
    title: "Sweet Slider",
    subtitle: "Circular Cake Carousel",
    date: "December 2024",
    description:
      "A circular carousel built around swipe gestures, keyboard control and auto-play. Glassmorphism UI with rotating circular text, tuned to stay smooth on mobile.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=500&fit=crop",
    tags: ["React", "Vite", "Framer Motion", "CSS3", "Responsive"],
    category: "frontend",
    github: "https://github.com/GaneshMandakapu/sweet-slider",
    webapp: "https://sweet-slider.vercel.app/",
  },
  {
    id: 4,
    title: "Stranger Things",
    subtitle: "Interactive Website",
    date: "December 2024",
    description:
      "An immersive themed site with scroll-driven animation and character showcases. Built for atmosphere without sacrificing load time.",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop",
    tags: ["React", "JavaScript", "CSS3", "Animation", "Vercel"],
    category: "frontend",
    github: "https://github.com/GaneshMandakapu/StrangerThings",
    webapp: "https://stranger-things-henna.vercel.app/",
  },
  {
    id: 5,
    title: "Medical ChatBot LLM",
    subtitle: "AI Engineering Project",
    date: "September 2024",
    description:
      "An AI-driven web app pairing a Flask backend with a React frontend so users can query medical information conversationally.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    tags: ["Python", "Flask", "React", "LLM", "AWS"],
    category: "data",
    github: null,
    webapp: null,
  },
];

export const certifications = [
  {
    name: "HubSpot Revenue Operations Certified",
    issuer: "HubSpot Academy",
    year: "2026",
    featured: true,
  },
  {
    name: "HubSpot Service Hub Software Certified",
    issuer: "HubSpot Academy",
    year: "2026",
    featured: true,
  },
  {
    name: "Google Cloud Engineer Learning Path",
    issuer: "Google Cloud",
    year: "2023",
  },
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    year: "2022",
  },
];

export const languages = [
  { name: "Telugu", level: "Native", proficiency: 100 },
  { name: "English", level: "C1 – C2", proficiency: 90 },
  { name: "German", level: "B1 · actively improving", proficiency: 50 },
];

export const volunteering = [
  {
    role: "Student Lead",
    org: "OVGU Academic Club",
    desc: "Organised inter-departmental technical talks and student projects.",
  },
];
