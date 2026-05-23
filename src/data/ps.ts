import {
  AlertTriangle,
  BookOpen,
  Briefcase,
  Building2,
  type LucideIcon,
  MessageSquare,
  Stethoscope,
  Store,
} from "lucide-react";

export interface ProblemStatement {
  id: string;
  title: string;
  category: string;
  icon: LucideIcon;
  problem: string;
  lookingFor: string;
  focusAreas: string[];
  constraints: string[];
}

export const problemsData: ProblemStatement[] = [
  {
    id: "healthcare",
    title: "Medical Information Clarity Platform",
    category: "Healthcare",
    icon: Stethoscope,
    problem:
      "Doctors see dozens of patients daily, leaving little time to explain diagnoses, lab results, or discharge summaries in full. Patients often leave consultations without understanding what it means for them or what to do about it — leading to confusion, anxiety, and poor follow-through on care. Medical jargon, time constraints, and low health literacy compound the issue, especially in multilingual contexts.",
    lookingFor:
      "A prototype that helps patients understand their own medical information more clearly. Think: a patient uploads a lab report or discharge summary and walks away actually knowing what it means, what to do next, and in a language they understand.",
    focusAreas: [
      "Plain-language interpretation of medical documents (lab reports, prescriptions, discharge summaries)",
      "Contextual explanations — not just definitions, but what something means for the patient",
      "Multilingual support (e.g., Assamese + English) and accessibility for low-health-literacy users",
      "A tone that informs without alarming",
      "Clear medical disclaimers directing users back to their doctor for clinical decisions",
    ],
    constraints: [
      "Must not diagnose conditions or recommend treatments",
      "Must clearly advise users to consult medical professionals",
      "Use anonymized or sample medical data only",
    ],
  },
  {
    id: "edtech",
    title: "Holistic Learning & Certification",
    category: "EdTech",
    icon: BookOpen,
    problem:
      "A single exam score has become the default measure of student ability, even though it captures almost nothing about how a student thinks, improves, or applies knowledge. Students who genuinely understand a subject can fail on a bad exam day. Students who cram can pass without retaining anything. Meanwhile, real growth — in thinking, confidence, and mastery — goes invisible.",
    lookingFor:
      "A prototype that demonstrates 2-3 practical evaluation methods beyond traditional exams — methods that reveal genuine understanding rather than memorization. Examples: concept explanation tasks, peer-review rubrics, or applied problem-solving.",
    focusAreas: [
      "Module-level assessments that give feedback before the final exam, not after",
      "Concept explanation tasks — having students articulate ideas in their own words as a measure of depth",
      "Applied or project-based tasks scored against clear, transparent rubrics",
      "A learning trajectory view that shows growth over time so students can see themselves improving",
    ],
    constraints: [
      "You don't need to build a full certification system",
      "A focused prototype demonstrating a few well-reasoned evaluation methods with clear logic for why they reveal understanding better than a single exam is complete and strong",
    ],
  },
  {
    id: "fintech",
    title: "Business Health Dashboard",
    category: "FinTech",
    icon: Store,
    problem:
      "Small business owners often manage cash flow, inventory, and expenses manually or with scattered spreadsheets. They know they're busy, but don't always know whether their business is healthy, improving, or at risk — until it's too late to do anything about it. Financial metrics feel abstract and overwhelming, leaving owners flying blind.",
    lookingFor:
      "A prototype that gives small business owners a simplified 'business health dashboard' — translating basic financial inputs into understandable signals about stability, growth, and risk.",
    focusAreas: [
      "Simple input system for revenue, expenses, and inventory costs",
      "Clear visualisation of cash flow trends and break-even points",
      "Contextual explanations of financial metrics in plain language",
      "Early warning signals when trends indicate potential risk (declining margins, inventory buildup, etc.)",
      "Visual trends showing month-over-month and year-over-year changes",
    ],
    constraints: [
      "Do not build a lending or investment platform",
      "Goal is clarity and awareness, not financial advisory services or regulatory-sensitive features",
    ],
  },
  {
    id: "civictech",
    title: "Public Scheme Discovery & Guidance System",
    category: "CivicTech",
    icon: Building2,
    problem:
      "Government welfare schemes exist to support citizens, but information about eligibility, application steps, and benefits is scattered across portals and dense documents. Many eligible people miss out because they don't understand what applies to them, don't know how to apply, or face language barriers that obscure opportunity.",
    lookingFor:
      "A prototype that helps a citizen understand which public schemes they may qualify for, what documents are required, and the exact steps to apply — in simple, accessible language and their preferred regional language.",
    focusAreas: [
      "Personalised scheme discovery based on basic user inputs (age, income range, occupation, location)",
      "Step-by-step application guidance with document checklists",
      "Regional language accessibility to reach more citizens",
      "Clear disclaimers and direct links to official sources",
      "Transparent eligibility criteria without false guarantees",
    ],
    constraints: [
      "Use publicly available government data and clearly cite official sources",
      "Must not submit applications on behalf of users",
      "Must not provide legal guarantees of eligibility",
    ],
  },
  {
    id: "opportunities",
    title: "Student Opportunity & Internship Matching Portal",
    category: "Opportunities",
    icon: Briefcase,
    problem:
      "Students in the Northeast region lack centralized access to internships, startups, and skill-based opportunities. Opportunity information is fragmented across websites, emails, and social media, making it hard for students to discover roles that match their skills — and equally hard for employers to find talent. Meanwhile, students waste time applying to mismatched roles or miss opportunities entirely because they never heard about them.",
    lookingFor:
      "A prototype that intelligently connects students to relevant opportunities. Think: a final-year student uploads their resume, and the system surfaces internships and roles where their skills actually match what's needed, plus flags the gaps they could fill.",
    focusAreas: [
      "Resume-to-role matching based on skills and experience",
      "Skill-gap analysis showing what students need to strengthen for their target roles",
      "Centralized internship and startup listings relevant to the region",
      "Event and hackathon discovery aligned with student interests",
      "Transparent opportunity sourcing and listing with clear indication of opportunity type, timeline, and eligibility",
    ],
    constraints: [
      "Must ensure transparency and authenticity of opportunity listings",
      "Avoid paid placement, brokerage features, or guaranteeing outcomes",
    ],
  },
  {
    id: "relief_ops",
    title: "Disaster Relief Coordination Platform",
    category: "Crisis",
    icon: AlertTriangle,
    problem:
      "When disasters strike, relief efforts often suffer from coordination gaps, duplication of effort, and resource mismanagement. Volunteers don't know where they're needed, relief camps run out of critical supplies, and donations are wasted because no one has visibility into what's already been sent. Information silos cost resources and even lives.",
    lookingFor:
      "A prototype that creates a centralized coordination system for volunteers, resources, and relief camps — turning chaos into clarity.",
    focusAreas: [
      "Volunteer registration and intelligent task allocation based on skills and location",
      "Relief camp locator showing active camps, capacity, and critical needs",
      "Resource inventory tracking (food, medical supplies, shelter materials, etc.)",
      "Donation transparency dashboard showing what's been contributed and where it went",
      "Simple alert system for critical shortages or opportunities",
      "Administrative monitoring dashboard for coordinators",
    ],
    constraints: [
      "This is not an official emergency response system; clearly indicate its prototype/demo nature",
      "Do not integrate with real emergency services without proper authorization",
      "Use simulated or open datasets for demonstration",
      "Focus on coordination, not emergency dispatch",
    ],
  },
  {
    id: "regional_lang",
    title: "Regional Language AI Assistant",
    category: "Accessibility",
    icon: MessageSquare,
    problem:
      "Many digital tools lack support for regional languages, effectively locking out millions of citizens from accessing critical information. A farmer can't check market prices in Assamese. A parent can't understand healthcare advice in their native language. Government schemes remain mysteries because the interface speaks only English or Hindi.",
    lookingFor:
      "A prototype that makes digital content and tools accessible in regional languages. Teams may explore different interaction models—such as a conversational assistant, browser extension, mobile overlay, or contextual popup—that allow users to understand information without constant app or tab switching.",
    focusAreas: [
      "Support for regional languages (e.g., Assamese ↔ English), with scope to expand further",
      "One primary interaction model (chatbot, browser extension, mobile popup, or overlay) fully implemented",
      "In-context translation or explanation of digital content",
      "Optional voice-based interaction (speech-to-text or text-to-speech) for accessibility",
      "Simple, conversational tone that feels natural to speakers",
      "Clear disclosure of AI limitations and uncertainties",
    ],
    constraints: [
      "Must clearly disclose AI limitations (especially around nuance, context, and accuracy)",
      "Avoid impersonating official government authorities",
      "Do not provide legal or medical advice through the assistant—always redirect to official sources",
    ],
  },
];
