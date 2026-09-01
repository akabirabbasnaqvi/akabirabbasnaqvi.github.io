export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  detail: string;
  technologies: string[];
  visibility: "public" | "private";
  repository?: string;
  tone: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Shopkeeper POS",
    category: "Offline operations system",
    summary: "A Windows desktop operating system for a real retail business.",
    detail:
      "Tracks sales, purchases, inventory, credit, expenses, and profit & loss while keeping all data local to one machine.",
    technologies: ["Electron", "React", "SQLite", "Windows"],
    visibility: "private",
    tone: "#c75035",
    featured: true,
  },
  {
    id: "02",
    title: "ModelOps Doctor",
    category: "ML monitoring platform",
    summary: "Model health, data drift, and diagnosis in one practical control room.",
    detail:
      "Registers models and datasets, ingests prediction logs, computes health scores, and schedules monitoring workflows with clear retraining guidance.",
    technologies: ["Python", "MLOps", "Celery", "Redis"],
    visibility: "public",
    repository: "https://github.com/akabirabbasnaqvi/modelops-doctor",
    tone: "#2349b6",
    featured: true,
  },
  {
    id: "03",
    title: "Automated Evaluation System",
    category: "Assessment platform",
    summary: "A desktop-style exam workflow for OMR, essays, reports, and review.",
    detail:
      "Combines authentication, bubble-sheet processing, barcode detection, AI-assisted essay utilities, and report generation in one operational tool.",
    technologies: ["Python", "Flask", "Eel", "Computer vision"],
    visibility: "public",
    repository: "https://github.com/akabirabbasnaqvi/Automated-Bubblesheet-and-Essay-Evaluation-System",
    tone: "#71846b",
    featured: true,
  },
  {
    id: "04",
    title: "DevMatch AI",
    category: "Applied machine learning",
    summary: "A role predictor and skill-roadmap tool trained on developer-survey data.",
    detail:
      "Uses a KNN model, similar-developer matching, and tailored skill-gap guidance to make a large public dataset personally useful.",
    technologies: ["Python", "scikit-learn", "Streamlit", "Pandas"],
    visibility: "public",
    repository: "https://github.com/akabirabbasnaqvi/devmatch-ai",
    tone: "#b67b35",
    featured: true,
  },
  {
    id: "05",
    title: "Aims Backoffice",
    category: "Reporting desktop app",
    summary: "Turns raw POS exports into multi-sheet operational reports.",
    detail:
      "Replaces manual spreadsheet work with a focused Windows workflow for store, employee, and protection-sales reporting.",
    technologies: ["Python", "CustomTkinter", "Excel", "PyInstaller"],
    visibility: "private",
    tone: "#4d7894",
  },
  {
    id: "06",
    title: "Red Bug Solution",
    category: "Marketing website",
    summary: "A performance-minded product site with an original canvas particle field.",
    detail:
      "Built with the Next.js App Router and Tailwind, featuring a hand-written 2D particle engine rather than dependency-heavy WebGL.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Canvas"],
    visibility: "private",
    tone: "#6a5c9e",
  },
  {
    id: "07",
    title: "PromptVault",
    category: "Prompt operations API",
    summary: "Production-style lifecycle management for prompts, tests, and evaluations.",
    detail:
      "Organizes prompts and workspaces, runs evaluation jobs in the background, and combines durable storage with fast cached reads.",
    technologies: ["FastAPI", "PostgreSQL", "Redis", "Docker"],
    visibility: "public",
    repository: "https://github.com/akabirabbasnaqvi/prompt-vault",
    tone: "#ae5a69",
  },
  {
    id: "08",
    title: "BigQuery Release Pulse",
    category: "Release intelligence",
    summary: "A live, searchable reading surface for BigQuery release notes.",
    detail:
      "Parses and groups an XML feed into useful updates, with offline-aware caching, filtering, and a sharing composer.",
    technologies: ["Flask", "JavaScript", "RSS", "Beautiful Soup"],
    visibility: "public",
    repository: "https://github.com/akabirabbasnaqvi/bq-release-notes",
    tone: "#286d6c",
  },
  {
    id: "09",
    title: "Public Intelligence",
    category: "Research prototype",
    summary: "A privacy-conscious prototype for aggregating lawful public-source research.",
    detail:
      "Pairs a Next.js interface with a FastAPI, worker, and database stack; the project explicitly frames responsible, authorized use.",
    technologies: ["Next.js", "FastAPI", "Celery", "PostgreSQL"],
    visibility: "public",
    repository: "https://akabirabbas.me/osint-data-extractor/",
    tone: "#4d5f85",
  },
  {
    id: "10",
    title: "YouTube Shorts Automation",
    category: "Content pipeline",
    summary: "A zero-paid-API workflow for producing and scheduling vertical video.",
    detail:
      "Finds trend signals, assembles scripts and media, creates voiceover and captions, renders with FFmpeg, and handles uploads through OAuth.",
    technologies: ["Python", "FFmpeg", "OAuth", "Automation"],
    visibility: "private",
    tone: "#bc4d4d",
  },
  {
    id: "11",
    title: "Smart Task Manager",
    category: "Android productivity app",
    summary: "A complete task workflow from priorities and subtasks to reminders.",
    detail:
      "A Kotlin and Jetpack Compose app with Room persistence, background reminder checks, and an operational dashboard.",
    technologies: ["Kotlin", "Jetpack Compose", "Room", "WorkManager"],
    visibility: "public",
    repository: "https://github.com/akabirabbasnaqvi/Smart-Task-Manager-App-Android-App",
    tone: "#49855e",
  },
  {
    id: "12",
    title: "Project Pilot AI",
    category: "Project concept",
    summary: "An early public concept held as a future project direction.",
    detail:
      "Included honestly as an early-stage repository with no implementation details claimed yet.",
    technologies: ["AI", "Planning", "In discovery"],
    visibility: "public",
    repository: "https://github.com/akabirabbasnaqvi/Project-Pilot-AI",
    tone: "#8b6d42",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
