export const profile = {
  name: "Souhayb Hadi",
  role: "Full Stack Developer",
  tagline: "Java / Spring Boot & React",
  location: "Béni Mellal, Morocco",
  email: "souhaybhadi06@gmail.com",
  phone: "+212 6 39 42 92 94",
  github: "https://github.com/Souhayb120",
  linkedin: "https://www.linkedin.com/in/souhayb-hadi/",
  summary:
    "Full Stack Java/Spring Boot and React developer specializing in secure REST APIs, resilient data layers, and clean interfaces — from the database to the browser.",
  status: "Open to opportunities",
};

export const stats = [
  { label: "Projects shipped", value: 5, suffix: "" },
  { label: "Core stack tools", value: 15, suffix: "+" },
  { label: "Years learning & building", value: 2, suffix: "+" },
  { label: "Certifications", value: 1, suffix: "" },
];

export const skillCategories = ["All", "Backend", "Frontend", "Data", "DevOps", "AI"];

export const skills = [
  { name: "Java", category: "Backend", level: 90 },
  { name: "Spring Boot", category: "Backend", level: 90 },
  { name: "Spring Security", category: "Backend", level: 82 },
  { name: "Spring MVC", category: "Backend", level: 85 },
  { name: "Hibernate / JPA", category: "Backend", level: 80 },
  { name: "REST APIs", category: "Backend", level: 90 },
  { name: "JWT", category: "Backend", level: 85 },
  { name: "Unit Testing", category: "Backend", level: 70 },
  { name: "React", category: "Frontend", level: 85 },
  { name: "JavaScript", category: "Frontend", level: 85 },
  { name: "Tailwind CSS", category: "Frontend", level: 85 },
  { name: "HTML5 / CSS3", category: "Frontend", level: 90 },
  { name: "JS DOM", category: "Frontend", level: 80 },
  { name: "MySQL", category: "Data", level: 85 },
  { name: "PostgreSQL", category: "Data", level: 75 },
  { name: "Flyway", category: "Data", level: 75 },
  { name: "Docker", category: "DevOps", level: 78 },
  { name: "GitHub Actions", category: "DevOps", level: 70 },
  { name: "Git & GitHub", category: "DevOps", level: 88 },
  { name: "Postman & Swagger", category: "DevOps", level: 82 }
];

export const projects = [
  {
    id: "healthcare",
    name: "HealthCare",
    tag: "Hospital Management System",
    description:
      "A full-stack hospital management platform for patients, doctors, appointments, and medical records — centralizing data behind role-based access.",
    stack: ["Spring Boot", "Spring Security", "React", "MySQL", "Flyway", "Docker", "JWT"],
    features: [
      "Role-based authentication for staff, doctors and admins",
      "Patient, doctor and appointment CRUD with validation",
      "Search, filtering and pagination across medical records",
      "Versioned schema migrations with Flyway",
    ],
    github: "https://github.com/ENAA-School-Student/HealthCare",
    status: "200",
    accent: "gold",
  },
  {
    id: "fleetflow",
    name: "FleetFlow",
    tag: "Fleet Management Platform",
    description:
      "Coordinates drivers, vehicles, clients and deliveries in one system, keeping fleet operations traceable end to end.",
    stack: ["Spring Boot", "MySQL", "Flyway", "Docker", "JWT"],
    features: [
      "Modules for drivers, vehicles, clients and deliveries",
      "JWT-secured endpoints for every role",
      "Containerized with Docker for consistent deploys",
    ],
    github: "https://github.com/Souhayb120/FleetFlow",
    status: "200",
    accent: "violet",
  },
 

  {
    id: "enaa",
    name: "Enaa's Store",
    tag: "Mini Online Shop",
    description:
      "A React e-commerce mini-app with a product catalogue, shopping cart, multi-page navigation and validated forms.",
    stack: ["React", "JavaScript", "HTML5", "CSS3"],
    features: [
      "Product catalogue with cart management",
      "Client-side routing between pages",
      "Form validation on checkout",
    ],
    github: "https://github.com/Souhayb120/Mini_Boutique_React",
    status: "200",
    accent: "violet",
  },
];

export const experience = [
  {
    period: "2025 — Present",
    title: "Full Stack Developer — Training",
    org: "Ahmed El Hansali Digital School, Béni Mellal",
    description:
      "Building production-style full-stack applications end to end: Spring Boot APIs secured with JWT, MySQL/PostgreSQL data layers, and React front-ends.",
  },
  {
    period: "2022 — 2024",
    title: "Technicien Spécialisé en Développement Informatique",
    org: "BillGates Institute, Béni Mellal",
    description:
      "Specialized technician training in software development — foundations in programming, databases and web technologies.",
  },
];

export const education = [
  {
    period: "2025 — Present",
    title: "Full Stack Developer",
    org: "Ahmed El Hansali Digital School (ENAA), Béni Mellal",
  },
  {
    period: "2022 — 2024",
    title: "Technicien Spécialisé en Développement Informatique",
    org: "BillGates Institute (OFPPT), Béni Mellal",
  },
];

export const certifications = [
  { name: "Git & GitHub", issuer: "365 Data Science", date: "11/2024" },
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "French", level: "Intermediate" },
  { name: "English", level: "Fluent" },
];

export const aiInterests = [
  { name: "Spring AI", note: "Wiring LLM calls into Spring Boot services" },
  { name: "RAG", note: "Retrieval-augmented generation over app data" },
  { name: "Embeddings & Vector DBs", note: "Semantic search foundations" },
  { name: "AI Agents", note: "Tool-calling agents on top of REST APIs" },
  { name: "Prompt Engineering", note: "Structuring reliable model instructions" },
  { name: "MCP", note: "Model Context Protocol for tool-connected AI" },
];
