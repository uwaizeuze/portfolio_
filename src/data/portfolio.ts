export const personalInfo = {
  name: "Owais Ahmad",
  title: "Software Engineer — React.js / Next.js / Frontend Specialist",
  location: "Rainawari, Srinagar, India",
  coordinates: {
    lat: 34.0837,
    lng: 74.7973,
    city: "Srinagar",
    region: "Jammu & Kashmir",
    country: "India",
    timezone: "Asia/Kolkata",
    utcOffset: "+05:30",
  },
  phone: "+91 6006212896",
  email: "owaisibnkhursheed@gmail.com",
  linkedin: "https://linkedin.com/in/owais-ahmad-87093a225",
  linkedinHandle: "linkedin.com/in/owais-ahmad-87093a225",
} as const;

export const summary =
  "Software Engineer with 4+ years of experience building scalable, user-focused web applications using React.js, Next.js, TypeScript, Node.js, Express.js, and MongoDB. Skilled across the modern frontend stack, with a track record of delivering high-performance responsive interfaces, secure enterprise authentication systems, CMS platforms, and pragmatic AI & automation integrations.";

export const shortSummary =
  "Building scalable web applications, responsive frontend architectures, and modern AI & automation workflows with React, Next.js, and Node.js.";

export const skills = [
  "JavaScript (ES6+)",
  "TypeScript",
  "HTML5",
  "CSS3",
  "React.js",
  "Next.js",
  "Redux Toolkit",
  "Context API",
  "React Query",
  "Zustand",
  "Tailwind CSS",
  "Bootstrap",
  "Node.js",
  "Express.js",
  "MongoDB",
  "RESTful APIs",
  "JWT Authentication",
  "Axios",
  "Git & GitHub",
] as const;

export const categorizedSkills = {
  frontend: [
    { name: "React.js", level: "Expert", years: "4+ yrs" },
    { name: "Next.js (App Router)", level: "Advanced", years: "3+ yrs" },
    { name: "TypeScript", level: "Advanced", years: "3+ yrs" },
    { name: "Tailwind CSS & CSS3", level: "Expert", years: "4+ yrs" },
    { name: "Zustand & Redux Toolkit", level: "Advanced", years: "3+ yrs" },
    { name: "React Query & Context API", level: "Advanced", years: "3+ yrs" },
  ],
  aiAndAutomation: [
    {
      name: "AI Integration",
      level: "Advanced",
      desc: "Embedding intelligent features into React & Next.js applications",
    },
    {
      name: "RAG Architecture",
      level: "Proficient",
      desc: "Context grounding with vector search & document chunking",
    },
    {
      name: "AI Agents",
      level: "Advanced",
      desc: "Autonomous planning, tool calling, and multi-step workflows",
    },
    {
      name: "API Automation",
      level: "Expert",
      desc: "Automated REST data pipelines, template processing & webhooks",
    },
    {
      name: "LLM Integration",
      level: "Advanced",
      desc: "Structured outputs, streaming UI responses, and prompt tuning",
    },
  ],
  backend: [
    { name: "Node.js & Express.js", level: "Advanced", years: "3+ yrs" },
    { name: "MongoDB & Mongoose", level: "Advanced", years: "3+ yrs" },
    { name: "RESTful API Integration", level: "Expert", years: "4+ yrs" },
    { name: "JWT & Role-Based Auth", level: "Advanced", years: "3+ yrs" },
  ],
  toolsAndWorkflow: [
    { name: "Git & Version Control", level: "Expert" },
    { name: "Chrome Extension API", level: "Advanced" },
    { name: "Vite & Webpack", level: "Advanced" },
    { name: "Postman & API Debugging", level: "Expert" },
  ],
} as const;

export const aiAutomationPillars = [
  {
    id: "ai-integration",
    title: "AI Integration",
    tagline: "Intelligent Frontend Experiences",
    icon: "sparkles",
    description:
      "Integrating AI capabilities directly into modern React and Next.js interfaces with seamless state synchronization, optimistic updates, and clean fallback UX.",
    tags: ["Next.js App Router", "Optimistic UI", "Vercel AI"],
  },
  {
    id: "rag",
    title: "RAG (Retrieval-Augmented Generation)",
    tagline: "Context-Aware Knowledge Retrieval",
    icon: "database",
    description:
      "Grounding LLM interactions in verified private and enterprise documents via semantic vector search, efficient chunking, and similarity re-ranking.",
    tags: ["Vector Search", "Embeddings", "Context Grounding"],
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    tagline: "Autonomous Tool Calling & Logic",
    icon: "bot",
    description:
      "Building agents that dynamically select tools, validate JSON schemas, and orchestrate multi-step reasoning cycles to solve non-trivial business tasks.",
    tags: ["Function Calling", "ReAct Loops", "Schema Validation"],
  },
  {
    id: "api-automation",
    title: "API Automation",
    tagline: "Dynamic Pipelines & Workflow Sync",
    icon: "cpu",
    description:
      "Automating complex RESTful workflows, variable extraction from document templates (e.g. in Legacy Assurance), and background task dispatching.",
    tags: ["REST APIs", "Document Parsing", "Webhook Triggers"],
  },
  {
    id: "llm-integration",
    title: "LLM Integration",
    tagline: "Structured Outputs & Streaming UI",
    icon: "message",
    description:
      "Connecting modern LLMs (OpenAI, Anthropic) with streaming token interfaces, markdown rendering, syntax highlighting, and guardrails against bad outputs.",
    tags: ["Streaming SSE", "Structured Outputs", "Prompt Engineering"],
  },
] as const;

export const experience = [
  {
    id: "fintegration",
    role: "Software Engineer (React.js)",
    company: "MobileFirst Applications – Fintegration",
    location: "Gujarat, India",
    period: "Mar 2024 – Jun 2026",
    highlights: [
      "Designed and built reusable React components used across multiple product modules, improving development speed and consistency.",
      "Managed application state using Redux and Context API, reducing bugs related to data flow across components.",
      "Integrated RESTful APIs to connect frontend interfaces with backend services, ensuring reliable data exchange.",
      "Collaborated with designers to translate UI/UX designs into functional, responsive interfaces.",
      "Wrote clean, maintainable, and scalable code following industry best practices; tested and debugged features across the development lifecycle.",
    ],
  },
  {
    id: "accubits",
    role: "Software Engineer (React.js)",
    company: "Accubits Technologies Inc.",
    location: "Thiruvananthapuram, Kerala, India",
    period: "Mar 2022 – Aug 2023",
    highlights: [
      "Optimized React.js components to improve user experience and application performance.",
      "Implemented state management solutions using Redux and Context API for complex, data-driven interfaces.",
      "Built responsive, cross-browser-compatible interfaces and integrated third-party APIs reliably.",
      "Collaborated within an agile team, contributing to code reviews and maintaining code quality standards.",
    ],
  },
  {
    id: "nielit",
    role: "Software Engineer Intern (Web Developer)",
    company:
      "National Institute of Electronics & Information Technology (NIELIT)",
    location: "Rangreth, Budgam, Kashmir, India",
    period: "Sep 2021 – Feb 2022",
    highlights: [
      "Developed responsive web applications using HTML, CSS, JavaScript, and React.js.",
      "Enhanced application interactivity and collaborated with cross-functional teams on feature delivery.",
      "Gained hands-on experience with modern web development practices and version control workflows.",
    ],
  },
] as const;

export const projects = [
  {
    id: "cersai",
    title: "CERSAI — Central Registry Platform",
    shortTitle: "CERSAI",
    description:
      "Secure registry platform with authentication, CMS, and role-based management for securitisation asset reconstruction.",
    tags: ["React.js", "TypeScript", "REST APIs", "CMS", "RBAC"],

    links: [
      {
        label: "Preprod Admin",
        url: "https://preprod-admin.niyamitnivesh.in/",
      },
      { label: "Preprod App", url: "https://preprod.niyamitnivesh.in/" },
    ],
    highlights: [
      "Built responsive web interfaces using React.js and TypeScript, and implemented secure authentication and authorization mechanisms.",
      "Collaborated with backend developers to integrate RESTful APIs and streamline data exchange.",
      "Built a content management system (CMS) and role-based management system to support administrative control and scalability.",
      "Designed dynamic input fields for the admin panel and developed a portal for streamlined access and communication.",
    ],
  },
  {
    id: "legacy-assurance",
    title: "Legacy Assurance — AI Document Automation",
    shortTitle: "Legacy Assurance",
    description:
      "AI-powered document automation system with role-based access, CMS, and intelligent campaign workflows.",
    tags: ["React.js", "TypeScript", "Zustand", "React Query", "AI"],
    links: [
      { label: "Admin Panel", url: "https://admin.networkattorney.net/" },
      { label: "UAT Admin", url: "https://adminuat.networkattorney.net/" },
    ],

    highlights: [
      "Developed a responsive, dynamic frontend using React.js, TypeScript, Zustand, and React Query.",
      "Integrated role-based access management and CMS features for flexible content control.",
      "Implemented AI-driven document processing to extract placeholders from Word files and auto-generate variables.",
      "Built an AI-driven campaign creation module to generate and manage document-based responses, streamlining approval workflows.",
    ],
  },
  {
    id: "cryptofunds",
    title: "CryptoFundsToday.com & CodeEgo",
    shortTitle: "CryptoFundsToday",
    description:
      "Scalable Next.js platforms with modern state management and third-party API integrations.",
    tags: ["Next.js", "React Query", "Context API", "Tailwind CSS"],
    links: [],
    highlights: [
      "Developed scalable Next.js components and interfaces, integrating React Context, React Query, and third-party APIs.",
      "Implemented Tailwind CSS for efficient, maintainable styling.",
    ],
  },
  {
    id: "developer-buddy",
    title: "DeveloperBuddy — Chrome Extension",
    shortTitle: "DeveloperBuddy",
    description:
      "Chrome extension built for developer productivity workflows using React and TypeScript.",
    tags: ["React.js", "TypeScript", "Chrome Extension"],
    links: [
      {
        label: "Chrome Web Store",
        url: "https://chrome.google.com/webstore/detail/bud-studio/hfnliplfeblcbeaaikaajpjedmpgniac?hl=en&authuser=6",
      },
    ],
    highlights: [
      "Built a Chrome extension using React.js and TypeScript to support developer productivity workflows.",
    ],
  },
] as const;

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  institution: "Amar Singh College",
  location: "Srinagar, Jammu & Kashmir, India",
  period: "May 2018 – Aug 2021",
  grade: "First Class / Distinction",
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#ai-automation", label: "AI & Automation" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
] as const;
