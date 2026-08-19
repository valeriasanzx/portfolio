export const profile = {
  name: "Valeria Sanz Jones",
  title: "AI Workflows & Data Analytics",
  tagline:
    "I build GenAI tools that take real work off people's plates — computer vision pipelines, content moderation systems, and workflow automation, mostly with Claude.",
  bio: [
    "I'm a double major in Information Systems & Business Analytics and Entrepreneurship at Loyola Marymount University, with a Computer Science minor. Originally from Spain, based in Los Angeles.",
    "What I actually do is sit between a team that has a repetitive, judgment-heavy task and the AI that can absorb it. That means understanding the workflow well enough to know which parts should be automated and which parts a person should keep — then building the thing, shipping it, and teaching the team to use it.",
  ],
  education: {
    school: "Loyola Marymount University",
    degree: "B.S. — Information Systems & Business Analytics, Entrepreneurship",
    minor: "Minor: Computer Science",
    graduation: "Expected May 2026",
    gpa: "3.81",
  },
  location: "Los Angeles, CA",
  email: "valesanzjones@gmail.com",
  github: "https://github.com/valeriasanzx",
  // TODO(valeria): add your LinkedIn URL
  linkedin: "",
  languages: ["Spanish (native)", "English (fluent)"],
  certifications: [
    "Bloomberg Market Concepts (BMC)",
    "Business, Engineering, Science & Technology (BEST) Bootcamp",
    "Microsoft Excel Associate",
  ],
};

export const experience = [
  {
    role: "AI Creator Marketing Associate",
    org: "Social Native",
    period: "April 2026 — Present",
    location: "Los Angeles, CA",
    bullets: [
      "Built an AI-assisted moderation pipeline that automates a 3-stage UGC review workflow, cutting per-image review from 15 minutes to seconds using Claude.",
      "Designed and shipped a full-stack internal moderation platform (React, FastAPI, PostgreSQL, AWS) replacing a manual process across multiple brand clients.",
      "Turned each brand's written guidelines into structured data that drives classification, so onboarding a new client is configuration rather than engineering.",
    ],
    tags: ["Claude", "FastAPI", "React", "PostgreSQL", "AWS"],
    project: "social-native-moderation",
  },
  {
    role: "Influencer Marketing Data Analyst Intern",
    org: "Bloom Nutrition",
    period: "April 2025 — April 2026",
    location: "Los Angeles, CA",
    bullets: [
      "Designed and built a computer-vision pipeline that identifies which products appear in creator videos, automating a daily manual labeling task.",
      "Built live KPI dashboards and monthly analytics reports on sales, social impressions, and influencer campaign performance for leadership.",
      "Managed campaign data collection in Tribe Dynamics and supported campaign execution and performance tracking.",
    ],
    tags: ["Computer Vision", "Node.js", "PostgreSQL", "Tableau"],
    project: "bloom-product-detection",
  },
  {
    role: "Marketing Intern",
    org: "Foodini App",
    period: "January 2025 — April 2025",
    location: "Los Angeles, CA",
    bullets: [
      "Built and ran targeted Meta Ads campaigns that contributed to 5,000+ app downloads.",
      "Optimized ad performance through A/B testing and performance analysis.",
    ],
    tags: ["Meta Ads", "A/B Testing", "Campaign Analytics"],
  },
  {
    role: "Marketing & Social Media Assistant",
    org: "Loyola Marymount University",
    period: "December 2023 — December 2024",
    location: "Los Angeles, CA",
    bullets: [
      "Produced 2 campus campaigns and 100+ posts for university housing.",
      "Ran interviews and interactive events to drive student engagement.",
    ],
    tags: ["Content", "Campaign Design"],
  },
];

export const skills = [
  {
    group: "AI & Automation",
    items: ["Claude / Anthropic API", "Prompt & workflow design", "Computer vision (Roboflow)", "n8n", "AI-assisted pipelines"],
  },
  {
    group: "Engineering",
    items: ["Python", "FastAPI", "JavaScript / TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "SQL"],
  },
  {
    group: "Data & Reporting",
    items: ["Tableau", "Excel (Associate)", "KPI dashboards", "Tribe Dynamics", "Campaign analytics", "A/B testing"],
  },
  {
    group: "Ways of working",
    items: ["Stakeholder discovery", "Enabling non-technical teams", "Documentation", "Shipping to production"],
  },
];
