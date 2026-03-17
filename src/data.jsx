// ============================================================
//  data.jsx — Central content file for the portfolio site
//  Edit content HERE and it updates automatically everywhere.
// ============================================================

import {
  FiHome, FiUser, FiFolder, FiMail, FiGithub, FiLinkedin, FiFileText,
  FiBarChart2, FiFileText as FiFileTextAlt, FiExternalLink,
} from 'react-icons/fi';
import {
  SiPython, SiJavascript, SiPostgresql, SiMysql, SiDjango, SiReact,
  SiTailwindcss, SiPytorch, SiGit, SiGithub, SiTensorflow, SiLangchain,
  SiDocker, SiFastapi, SiScikitlearn, SiNginx, SiOpencv, SiPandas,
  SiNumpy, SiHtml5, SiCss3, SiHtmx, SiGoogle,
} from 'react-icons/si';
import {
  FaChartLine, FaCamera, FaWandMagicSparkles, FaMedal, FaLaptopCode,
} from 'react-icons/fa6';

// ─── Image Imports (Projects) ────────────────────────────────
// FinAI
import finAiBanner from '../FinAiPreview/banner.png';
import finAiBanks from '../FinAiPreview/Bankspage.png';
import finAiLogin from '../FinAiPreview/Login.png';
import finAiAbout from '../FinAiPreview/about page.png';
import finAiChat from '../FinAiPreview/chatconfrsation.png3.png';
import finAiReg from '../FinAiPreview/regstraion.png';
// QuoteX
import quoteXDash from '../QuoteXPreview/DashBoard.jpeg';
import quoteXMgmt from '../QuoteXPreview/QuoteManagement.jpeg';
import quoteXBanner from '../QuoteXPreview/banner.png';
// Hfawa
import hfawaBanner from '../HfawaPreview/banner.png';
// FER
import ferThumbnail from '../FERPreview/FERthumnail.png';
// OCR
import ocrThumbnail from '/ocr.png';


// ─────────────────────────────────────────────────────────────
//  PERSONAL INFO
//  Used by: Hero, Footer
// ─────────────────────────────────────────────────────────────
export const personalInfo = {
  name: 'Abdallah Zeine Elabidine',
  title: "Hello, I'm Abdallah Zeine Elabidine",
  subtitle: 'AI Engineer with Backend Experience',
  location: 'Based in Jeddah, Saudi Arabia • Open to opportunities',
};


// ─────────────────────────────────────────────────────────────
//  HERO BADGES
//  The small pill badges displayed in the hero section.
//  Add/remove objects here to change what appears.
//  Used by: Hero
// ─────────────────────────────────────────────────────────────
export const heroBadges = [
  'Excellence GPA Student',
  'IBM AI Engineering Certified',
  '3rd Place Fintech Rally Hackathon',
];


// ─────────────────────────────────────────────────────────────
//  HERO TOOLTIPS
//  The hoverable keywords in the hero description text.
//  Used by: Hero
// ─────────────────────────────────────────────────────────────
export const heroTooltips = {
  django: {
    text: 'Django web development',
    items: [
      { icon: SiDjango, name: 'Django', color: '#092E20' },
      { icon: SiLangchain, name: 'LangChain', color: '#005500' },
    ],
  },
  ai: {
    text: 'Artificial Intelligence models',
    items: [
      { icon: SiPytorch, name: 'PyTorch', color: '#EE4C2C' },
      { icon: SiTensorflow, name: 'TensorFlow', color: '#FF6F00' },
    ],
  },
};


// ─────────────────────────────────────────────────────────────
//  NAVIGATION LINKS
//  Used by: Navbar
// ─────────────────────────────────────────────────────────────
export const navLinks = [
  { name: 'Home', href: '#home', icon: FiHome },
  { name: 'About', href: '#about', icon: FiUser },
  { name: 'Projects', href: '#projects', icon: FiFolder },
  { name: 'Contact', href: '#contact', icon: FiMail },
];

export const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/abdallahzeine', icon: FiGithub },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/abdallah-zeineelabidine/', icon: FiLinkedin },
];


// ─────────────────────────────────────────────────────────────
//  SKILLS
//  Add a skill object { name, icon } to any category.
//  Add a new category by adding a new key to the object.
//  Used by: About
// ─────────────────────────────────────────────────────────────
export const skillsData = {
  'Languages': [
    { name: 'Python', icon: <SiPython className="text-blue-500" /> },
    { name: 'JavaScript', icon: <SiJavascript className="text-yellow-500" /> },
  ],
  'Web Development': [
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-indigo-500" /> },
    { name: 'MySQL', icon: <SiMysql className="text-orange-500" /> },
    { name: 'Django', icon: <SiDjango className="text-emerald-600" /> },
    { name: 'FastAPI', icon: <SiFastapi className="text-teal-500" /> },
    { name: 'HTML', icon: <SiHtml5 className="text-orange-500" /> },
    { name: 'CSS', icon: <SiCss3 className="text-blue-500" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: 'React', icon: <SiReact className="text-cyan-500" /> },
  ],
  'AI & Data Science': [
    { name: 'PyTorch', icon: <SiPytorch className="text-orange-600" /> },
    { name: 'TensorFlow', icon: <SiTensorflow className="text-orange-500" /> },
    { name: 'scikit-learn', icon: <SiScikitlearn className="text-orange-400" /> },
    { name: 'OpenCV', icon: <SiOpencv className="text-emerald-500" /> },
    { name: 'Pandas', icon: <SiPandas className="text-indigo-500" /> },
    { name: 'NumPy', icon: <SiNumpy className="text-cyan-500" /> },
    { name: 'Matplotlib', icon: <FaChartLine className="text-slate-500" /> },
    { name: 'LangChain', icon: <SiLangchain className="text-emerald-500" /> },
    { name: 'Prompt Engineering', icon: <FaWandMagicSparkles className="text-violet-500" /> },
  ],
  'DevOps': [
    { name: 'Docker', icon: <SiDocker className="text-blue-500" /> },
    { name: 'Git', icon: <SiGit className="text-orange-500" /> },
    { name: 'GitHub', icon: <SiGithub className="text-gray-700" /> },
    { name: 'Nginx', icon: <SiNginx className="text-green-500" /> },
  ],
  'Hobbies': [
    { name: 'Photography', icon: <FaCamera className="text-rose-500" /> },
    { name: 'Photo Editing', icon: <FaWandMagicSparkles className="text-violet-500" /> },
  ],
};


// ─────────────────────────────────────────────────────────────
//  EDUCATION
//  Used by: About
// ─────────────────────────────────────────────────────────────
export const education = [
  {
    degree: 'BASc Data Science & AI',
    university: 'Al Ahliyya Amman University',
    period: '2022 - Present',
    tags: ['GPA 3.71 / 4.0', 'Senior Year'],
  },
];


// ─────────────────────────────────────────────────────────────
//  EXPERIENCE
//  active: true  → filled primary dot (current role)
//  active: false → muted dot (past role)
//  Used by: About
// ─────────────────────────────────────────────────────────────
export const experience = [
  {
    title: 'AI Developer internship',
    company: 'Optimum Partners Global',
    type: 'Internship',
    period: 'Mar 2026 - Present',
    location: 'Jordan - On-site',
    active: true,
  },
  {
    title: 'Full Stack Developer',
    company: 'Freelancer',
    type: 'Freelance',
    period: 'Jan 2023 - Present',
    location: 'Remote',
    active: false,
  },
];


// ─────────────────────────────────────────────────────────────
//  HIGHLIGHTS
//  icon: a react-icons component element
//  Used by: About
// ─────────────────────────────────────────────────────────────
export const highlights = [
  {
    icon: <FaMedal className="text-amber-500" />,
    title: 'Fintech Rally',
    subtitle: '3rd Place • JOPACC',
    date: 'Jul 2025',
  },
  {
    icon: <FaLaptopCode className="text-blue-500" />,
    title: 'Programming Contest',
    subtitle: 'Participant • AAU',
    date: 'Nov 2023',
  },
];


// ─────────────────────────────────────────────────────────────
//  CERTIFICATIONS
//  accent: a Tailwind bg color class for the left border stripe
//  Used by: About
// ─────────────────────────────────────────────────────────────
export const certifications = [
  { title: 'Retrieval-Augmented Generation (RAG) with Embeddings & Vector Databases', org: 'Scrimba', date: 'Jan 2026', accent: 'bg-indigo-500' },
  { title: 'AI Infrastructure and Operations Fundamentals', org: 'NVIDIA', date: 'Jan 2026', accent: 'bg-green-500' },
  { title: 'IBM AI Engineering', org: 'IBM', date: 'Jun 2025', accent: 'bg-blue-500' },
  { title: 'Google Prompting', org: 'Google', date: 'Jun 2025', accent: 'bg-orange-500' },
  { title: 'Meta Back-End Dev', org: 'Meta', date: 'Feb 2025', accent: 'bg-blue-600' },
];

export const certificationsUrl = 'https://www.linkedin.com/in/abdallah-zeineelabidine/details/certifications/';


// ─────────────────────────────────────────────────────────────
//  VOLUNTEERING
//  logo: path to image in /public
//  Used by: About
// ─────────────────────────────────────────────────────────────
export const volunteering = [
  { role: 'Event Coordinator', org: 'IEEE CS Chapter', logo: '/IEEE-CS_LogoTM-orange.png' },
  { role: 'Course Manager', org: 'Data Science Club', logo: '/DSAI_logo.jpg' },
];


// ─────────────────────────────────────────────────────────────
//  PROJECTS
//  icons: array of react-icons JSX elements
//  image: imported image or null
//  gallery: array of imported images (empty = no gallery)
//  link: GitHub/live URL or "#" if unavailable
//  Used by: Projects
// ─────────────────────────────────────────────────────────────
export const projects = [
  {
    title: 'FinAI',
    description: 'AI-Powered Fintech Assistant. Full-featured personal banker app to manage accounts, discover offers, and make informed decisions.',
    tags: ['Django', 'LangChain', 'Gemini', 'Tailwind', 'PostgreSQL'],
    icons: [<SiDjango title="Django" />, <SiGoogle title="Gemini" />, <SiTailwindcss title="Tailwind CSS" />, <SiPostgresql title="PostgreSQL" />],
    image: finAiBanner,
    gallery: [finAiBanks, finAiLogin, finAiChat, finAiReg, finAiAbout],
    link: 'https://github.com/abdallahzeine/FinAi',
  },
  {
    title: 'QuoteX',
    description: 'Comprehensive Quote Management System (SaaS). Streamlines the quoting process for businesses.',
    tags: ['Django', 'HTMX', 'JS', 'PDF', 'Gemini', 'LangChain'],
    icons: [<SiDjango title="Django" />, <SiHtmx title="HTMX" />, <SiJavascript title="JavaScript" />, <FiFileTextAlt title="PDF" />, <SiGoogle title="Gemini" />],
    image: quoteXBanner,
    gallery: [quoteXDash, quoteXMgmt],
    link: 'https://github.com/abdallahzeine/QuoteX',
  },
  {
    title: 'Hfawa',
    description: 'Hospitality Management Platform. Elevating guest experiences through digital solutions.',
    tags: ['Django', 'HTMX', 'JS', 'Tailwind', 'PostgreSQL'],
    icons: [<SiDjango title="Django" />, <SiHtmx title="HTMX" />, <SiJavascript title="JavaScript" />, <SiTailwindcss title="Tailwind CSS" />, <SiPostgresql title="PostgreSQL" />],
    image: hfawaBanner,
    gallery: [],
    link: 'https://github.com/abdallahzeine/Hfawa-UIX',
  },
  {
    title: 'Facial Expression Recognition',
    description: 'A deep learning project for classifying facial expressions into 6 emotion categories using MobileNetV4 architecture.',
    tags: ['PyTorch', 'OpenCV', 'Python', 'Deep Learning'],
    icons: [<SiPytorch title="PyTorch" />, <SiPython title="Python" />, <SiNumpy title="NumPy" />, <FiBarChart2 title="Matplotlib" />],
    image: ferThumbnail,
    gallery: [],
    link: 'https://github.com/abdallahzeine/Facial-expression-project',
  },
  {
    title: 'OCR Deep Learning Model',
    description: 'Custom, optimized OCR architecture solving complex CAPTCHAs with 93% accuracy.',
    tags: ['PyTorch', 'Python', 'Matplotlib', 'Numpy', 'Pandas'],
    icons: [<SiPytorch title="PyTorch" />, <SiPython title="Python" />, <SiNumpy title="Numpy" />, <SiPandas title="Pandas" />, <FiBarChart2 title="Matplotlib" />],
    image: ocrThumbnail,
    gallery: [],
    link: 'https://github.com/abdallahzeine/OCR-Custom-model',
  },
  {
    title: 'Lung Cancer MRI Classification',
    description: 'Multi-class MRI tumor classification using ResNet with 91% accuracy and GAN-balanced datasets.',
    tags: ['PyTorch', 'Python', 'Matplotlib', 'Numpy', 'Pandas'],
    icons: [<SiPytorch title="PyTorch" />, <SiPython title="Python" />, <SiNumpy title="Numpy" />, <SiPandas title="Pandas" />, <FiBarChart2 title="Matplotlib" />],
    image: null,
    gallery: [],
    link: '#',
  },
];


// ─────────────────────────────────────────────────────────────
//  CONTACT INFO
//  Used by: Contact, Footer
// ─────────────────────────────────────────────────────────────
export const contactInfo = {
  email: 'abdallahzeine@gmail.com',
  phones: [
    { number: '+962 78 007 1840', href: 'tel:+962780071840', label: 'Jordan' },
    { number: '+966 56 645 4894', href: 'tel:+966566454894', label: 'Saudi Arabia', secondary: true },
  ],
  heading: "Let's Chat!",
  subheading: 'Open to opportunities, collaborations, or just a friendly hello.',
  quickMsgTitle: 'Quick Message',
  quickMsgDesc: 'Prefer email? Click the button below.',
  quickMsgBtn: 'Send Email',
};
