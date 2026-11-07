// All site copy and contact details live here.
// Any value written in [square brackets] is a placeholder: the site shows it
// with a dashed "placeholder" style until you replace it with the real value.

export const isPlaceholder = (value) => !value || /^\[.*\]$/.test(String(value).trim())

export const site = {
  name: 'Nevnoc',
  tagline: 'Global web solutions',
  email: 'laibaqaiser2005@gmail.com',
  domain: 'https://nevnoc.com',
  whatsapp: '923007140671', // digits with country code
  location: 'Phalia, Pakistan',
  locationNote: 'Working with clients worldwide',
  links: {
    linkedin: 'https://www.linkedin.com/in/laiba-qaiser-140633313/',
    github: 'https://github.com/LaibaQaiser25',
    upwork: 'https://www.upwork.com/freelancers/~0183dd560c2e5e3361',
  },
}

export const nav = [
  { href: '#services', label: 'Services' },
  { href: '#case-study', label: 'Case study' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
]

export const hero = {
  eyebrow: 'Web & AI automation studio',
  title: 'We automate the work that slows your business down.',
  subtitle: 'AI agents, n8n workflow automation and custom web apps for growing businesses.',
}

export const services = [
  {
    icon: 'bot',
    title: 'AI Agents & Chatbots',
    text: 'Agents that answer leads, qualify customers and book meetings, so no enquiry goes cold.',
  },
  {
    icon: 'flow',
    title: 'Workflow Automation (n8n)',
    text: 'Connect your forms, CRM, email, Google Sheets, Slack and WhatsApp so data moves on its own.',
  },
  {
    icon: 'dashboard',
    title: 'Custom Web Apps & Dashboards',
    text: 'Full-stack apps on the PERN stack (PostgreSQL, Express, React, Node.js), built around how you work.',
  },
  {
    icon: 'globe',
    title: 'Business Websites',
    text: 'Fast, modern websites for local and international businesses that turn visitors into enquiries.',
  },
]

export const caseStudy = {
  title: 'AI-Integrated Factory Management System',
  problem:
    'A factory ran its operations on paper registers. Finding a record was slow, and errors were hard to catch.',
  solution:
    'A full-stack platform that automates core processes, with AI agents that send automated alerts and a natural-language search module, so staff can find records by simply asking.',
  tech: ['PostgreSQL', 'Express.js', 'React', 'Node.js', 'n8n', 'Twilio', 'AI agent APIs'],
  result: 'Deployed on a cloud server for a paying client on an annual subscription.',
  screenshots: [
    { src: '/case-study/dashboard.webp', caption: 'Dashboard', alt: 'Dashboard with quick actions, today’s sales, low stock alerts, pending payments and orders by status' },
    { src: '/case-study/analytics.webp', caption: 'Analytics', alt: 'Analytics page with revenue, purchases, expenses, a monthly sales vs purchases chart and an earnings breakdown' },
    { src: '/case-study/orders.webp', caption: 'Orders', alt: 'Orders table filtered by status, with amount, advance, balance and gate pass for each order' },
    { src: '/case-study/customer-ledger.webp', caption: 'Customer ledger', alt: 'Customer ledger showing debit, credit and outstanding debt for each customer, with record and invoice buttons' },
  ],
  video: '/case-study/walkthrough.webp',
}

export const projects = [
  {
    title: 'AI Lead Responder',
    text: 'Replies to new leads in seconds, asks qualifying questions and books a call.',
    tags: ['n8n', 'AI agent', 'Google Sheets'],
    demo: '[Loom link]',
  },
  {
    title: 'E-commerce Order Automation',
    text: 'Moves new orders into sheets, notifies the team and updates customers automatically.',
    tags: ['n8n', 'WhatsApp', 'Email'],
    demo: '[Loom link]',
  },
  {
    title: 'AI Customer-Support Chatbot',
    text: 'Answers common customer questions 24/7 and hands complex ones to a human.',
    tags: ['AI agent', 'React', 'Node.js'],
    demo: '[Loom link]',
  },
]

export const steps = [
  { title: 'Discovery call', text: 'A free call to understand your business and find what is worth automating.' },
  { title: 'Proposal and fixed price', text: 'A clear plan, timeline and fixed price. No surprises.' },
  { title: 'Build and updates', text: 'We build in small steps and share progress with you regularly.' },
  { title: 'Delivery and support', text: 'We launch, train your team and stay available for support.' },
]

export const founder = {
  name: 'Laiba Qaiser',
  role: 'Founder, Nevnoc',
  photo: '[founder photo]',
  bio: [
    'Laiba is a Computer Science graduate (GPA 3.96/4.00) and the founder of Nevnoc.',
    'She focuses on helping businesses move from manual work and paper records to simple, practical software that saves time every day.',
  ],
}
