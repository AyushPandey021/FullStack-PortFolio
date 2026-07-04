import {
  FaAws,
  FaDocker,
  FaGithub,
  FaLinkedin,
  FaNodeJs,
  FaPython,
  FaReact,
  FaTwitter,
} from 'react-icons/fa'
import {
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiGithubactions,
  SiGooglecloud,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { HiCodeBracket, HiCommandLine, HiCpuChip, HiServerStack } from 'react-icons/hi2'

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
]

export const titles = ['Full Stack Developer', 'AI Engineer', 'MERN Stack Developer', 'Python Developer']

export const profileStats = [
  { label: 'Projects Completed', value: 34, suffix: '+' },
  { label: 'Technologies', value: 28, suffix: '+' },
  { label: 'AI Apps Built', value: 9, suffix: '+' },
  { label: 'Years of Experience', value: 3, suffix: '+' },
]

export const aboutFacts = [
  ['Name', 'Ayush Pandey'],
  ['Location', 'India'],
  ['Focus', 'Full Stack, AI, Cloud'],
  ['Availability', 'Open to product teams and clients'],
]

export const skillGroups = [
  {
    title: 'Frontend',
    icon: HiCodeBracket,
    skills: [
      ['React', 94, FaReact],
      ['Next.js', 88, SiNextdotjs],
      ['Tailwind', 92, SiTailwindcss],
      ['JavaScript', 95, SiJavascript],
      ['TypeScript', 86, SiTypescript],
      ['Redux', 82, SiRedux],
    ],
  },
  {
    title: 'Backend',
    icon: HiServerStack,
    skills: [
      ['Node.js', 92, FaNodeJs],
      ['Express.js', 90, SiExpress],
      ['Python', 88, FaPython],
      ['FastAPI', 84, SiFastapi],
      ['Authentication', 86, HiCommandLine],
      ['JWT', 85, HiCpuChip],
    ],
  },
  {
    title: 'Database & Cloud',
    icon: SiGooglecloud,
    skills: [
      ['MongoDB', 90, SiMongodb],
      ['MySQL', 82, SiMysql],
      ['PostgreSQL', 80, SiPostgresql],
      ['Redis', 76, SiRedis],
      ['AWS', 78, FaAws],
      ['Docker', 82, FaDocker],
      ['GitHub Actions', 80, SiGithubactions],
      ['Firebase', 84, SiFirebase],
    ],
  },
  {
    title: 'AI Systems',
    icon: HiCpuChip,
    skills: [
      ['LangChain', 86, SiLangchain],
      ['OpenAI', 88, HiCpuChip],
      ['Google Gemini', 84, SiGooglecloud],
      ['Mistral AI', 78, HiCpuChip],
      ['RAG', 88, HiCommandLine],
      ['Vector Database', 80, HiServerStack],
      ['Pinecone', 78, HiCodeBracket],
    ],
  },
]

export const experience = [
  {
    company: 'Product Engineering Lab',
    position: 'Full Stack Developer',
    duration: '2024 - Present',
    responsibilities: [
      'Built MERN applications with clean APIs, secure authentication, and responsive dashboards.',
      'Integrated AI-assisted workflows using RAG, vector search, and production-grade prompt pipelines.',
      'Shipped CI/CD pipelines, Dockerized services, and observability-friendly backend patterns.',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Python', 'Docker', 'AWS'],
  },
  {
    company: 'Independent Client Studio',
    position: 'Frontend & AI Application Developer',
    duration: '2023 - 2024',
    responsibilities: [
      'Delivered premium UI systems with reusable components, animation, and polished interaction states.',
      'Created workflow automation tools that reduced repetitive manual tasks for client teams.',
      'Worked directly with stakeholders to translate product requirements into reliable releases.',
    ],
    technologies: ['React', 'Tailwind', 'Framer Motion', 'FastAPI', 'OpenAI'],
  },
  {
    company: 'Open Source & Research Builds',
    position: 'Software Engineer',
    duration: '2022 - 2023',
    responsibilities: [
      'Prototyped developer tools, data-driven apps, and AI experiments across the JavaScript/Python stack.',
      'Practiced performance profiling, accessibility review, and resilient state-management patterns.',
    ],
    technologies: ['JavaScript', 'Python', 'PostgreSQL', 'Redis', 'GitHub Actions'],
  },
]

export const projects = [
  {
    title: 'Perplexity Lite',
    category: 'AI Search',
    description: 'A source-aware answer engine with streaming responses, citations, and follow-up discovery.',
    features: ['RAG pipeline', 'Streaming UI', 'Citation cards', 'Prompt safety'],
    stack: ['React', 'FastAPI', 'LangChain', 'OpenAI', 'Pinecone'],
    tone: 'from-orange-500 to-rose-500',
  },
  {
    title: 'Visitor Management System',
    category: 'SaaS',
    description: 'Secure visitor intake, approvals, badge generation, and admin analytics for offices.',
    features: ['Role-based access', 'QR check-in', 'Dashboard analytics', 'Audit logs'],
    stack: ['React', 'Node.js', 'MongoDB', 'JWT', 'Docker'],
    tone: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'ITR SkillForge',
    category: 'Learning Platform',
    description: 'A guided learning portal with lessons, progress tracking, quizzes, and admin content tools.',
    features: ['Course builder', 'Progress engine', 'Quiz flows', 'Certificate-ready'],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    tone: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'FlowTrack',
    category: 'Productivity',
    description: 'Kanban, metrics, and automation for teams that need lightweight project visibility.',
    features: ['Drag and drop', 'Automations', 'Team metrics', 'Activity feed'],
    stack: ['React', 'Redux', 'Express', 'Redis'],
    tone: 'from-violet-500 to-fuchsia-600',
  },
  {
    title: 'AI PDF Chat',
    category: 'Document AI',
    description: 'A document assistant that extracts context, answers questions, and keeps evidence visible.',
    features: ['PDF parsing', 'Embeddings', 'Context windows', 'Answer grounding'],
    stack: ['Python', 'FastAPI', 'OpenAI', 'Vector DB'],
    tone: 'from-amber-500 to-orange-600',
  },
  {
    title: 'RAG Application',
    category: 'AI Platform',
    description: 'Production-oriented retrieval app with chunking controls, evaluation, and admin indexing.',
    features: ['Chunk tuning', 'Retriever evals', 'Index monitor', 'Multi-model routing'],
    stack: ['LangChain', 'Mistral', 'Gemini', 'Pinecone'],
    tone: 'from-sky-500 to-indigo-600',
  },
  {
    title: 'Portfolio Website',
    category: 'Interactive Web',
    description: 'A high-motion personal website with smooth scroll, command palette, and custom interactions.',
    features: ['GSAP reveals', 'Dark mode', 'Project modal', 'Responsive system'],
    stack: ['React', 'GSAP', 'Framer Motion', 'Tailwind'],
    tone: 'from-neutral-700 to-orange-500',
  },
]

export const services = [
  ['Web Development', 'Premium marketing sites, dashboards, and product interfaces built to feel fast.'],
  ['Frontend Development', 'Component systems, animations, accessibility, and responsive UI engineering.'],
  ['Backend Development', 'Node, Python, APIs, authentication, data models, and secure integrations.'],
  ['REST API Development', 'Clean endpoints, validation, documentation, and production-ready patterns.'],
  ['MERN Applications', 'End-to-end MongoDB, Express, React, and Node applications.'],
  ['Python Applications', 'FastAPI services, automation tools, and data-driven backend systems.'],
  ['AI Applications', 'LLM apps, RAG, chat experiences, document intelligence, and AI workflows.'],
  ['Database Design', 'Schema design, indexing, query performance, and reliable data flows.'],
  ['Cloud Deployment', 'Dockerized releases, CI/CD, Firebase, AWS, and deployment pipelines.'],
  ['Automation', 'Internal tools and scripts that save teams hours of repetitive work.'],
]

export const techLogos = [
  ['React', FaReact],
  ['Node', FaNodeJs],
  ['MongoDB', SiMongodb],
  ['Express', SiExpress],
  ['Python', FaPython],
  ['FastAPI', SiFastapi],
  ['Docker', FaDocker],
  ['GitHub', FaGithub],
  ['AWS', FaAws],
  ['Tailwind', SiTailwindcss],
  ['TypeScript', SiTypescript],
  ['LangChain', SiLangchain],
  ['Gemini', SiGooglecloud],
  ['OpenAI', HiCpuChip],
  ['Mistral', HiCpuChip],
  ['Redis', SiRedis],
  ['PostgreSQL', SiPostgresql],
]

export const achievements = [
  ['Projects Completed', 34, '+'],
  ['Happy Clients', 14, '+'],
  ['GitHub Repositories', 42, '+'],
  ['Certificates', 8, '+'],
  ['Coding Hours', 3800, '+'],
  ['AI Applications Built', 9, '+'],
]

export const testimonials = [
  {
    quote:
      'Ayush brings product taste and engineering discipline together. The final build felt sharp, fast, and ready for real users.',
    name: 'Client Partner',
    role: 'Founder, SaaS Studio',
  },
  {
    quote:
      'He understands both UX polish and backend reliability, which made the project feel unusually smooth from sprint one.',
    name: 'Product Lead',
    role: 'Workflow Automation Team',
  },
  {
    quote:
      'The AI prototype became a practical app because Ayush kept the retrieval quality, interface, and deployment equally strong.',
    name: 'Technical Mentor',
    role: 'AI Engineering Program',
  },
]

export const blogs = [
  {
    title: 'Designing RAG Apps That Recruiters Can Actually Trust',
    category: 'AI Engineering',
    read: '6 min read',
  },
  {
    title: 'The Full Stack Checklist I Use Before Shipping Client Work',
    category: 'Engineering',
    read: '8 min read',
  },
  {
    title: 'Making React Interfaces Feel Premium Without Making Them Heavy',
    category: 'Frontend',
    read: '5 min read',
  },
]

export const socials = [
  ['GitHub', FaGithub, 'https://github.com/'],
  ['LinkedIn', FaLinkedin, 'https://linkedin.com/'],
  ['Twitter', FaTwitter, 'https://twitter.com/'],
]
