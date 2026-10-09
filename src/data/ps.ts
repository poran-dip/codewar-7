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
    title: "AI-Based Integrated Rural Healthcare & Early Disease Detection Platform",
    category: "Healthcare + Rural Development + AI",
    icon: Stethoscope,
    problem:
      "Rural and remote communities in the North Eastern Region continue to face barriers to timely and quality healthcare because of difficult terrain, limited healthcare infrastructure, shortage of specialists, inadequate diagnostic facilities, long travel distances, and uneven access to medical services. Many people do not receive regular screening and may reach healthcare facilities only after symptoms become severe. Healthcare workers in remote locations may also have limited access to complete patient information and specialist support.",
    lookingFor:
      "A prototype that addresses the gap between rural populations and timely access to appropriate healthcare services, supports early identification of potential health conditions using relevant patient and health information, and improves continuity and movement of care across primary, secondary, and higher-level healthcare services.",
    focusAreas: [
      "Early identification of potential health conditions using relevant patient and health information",
      "Support for limited specialists, diagnostic facilities, infrastructure, connectivity, and healthcare resources in remote areas",
      "Appropriate movement of patients between primary, secondary, and higher-level healthcare services",
      "Structured patient health information supporting continuity of care",
      "Usability for communities with varying levels of digital literacy and healthcare awareness",
      "Adaptability from community-level use to district or regional healthcare requirements",
    ],
    constraints: [
      "Must support healthcare workers without replacing professional clinical judgment",
      "Must account for limited infrastructure and connectivity in rural and remote areas",
    ],
  },
  {
    id: "edtech",
    title: "Multilingual AI Health Companion for Rural and Remote NER",
    category: "Healthcare + Multilingual AI + Accessibility",
    icon: BookOpen,
    problem:
      "The North Eastern Region has significant linguistic and cultural diversity, and many people in rural and remote communities are more comfortable communicating in local or regional languages. Healthcare information can be difficult to understand when language, medical terminology, limited health literacy, geographical isolation, and lack of nearby healthcare professionals create communication barriers. These challenges can prevent people from understanding health concerns and seeking appropriate care at the right time.",
    lookingFor:
      "A prototype that reduces healthcare communication barriers across the NER by making health-related information understandable and accessible in relevant local or regional languages for users with different levels of health literacy.",
    focusAreas: [
      "Support for local or regional languages across the NER",
      "Understandable healthcare information for users with different levels of health literacy",
      "Communication of symptoms, health concerns, preventive information, and healthcare requirements",
      "Support for rural and remote users with limited access to doctors and reliable health information",
      "Consideration of language, culture, terminology, age, and digital literacy",
      "Accessibility across diverse communities and usage conditions in NER",
    ],
    constraints: [
      "Must communicate health information responsibly without creating false confidence",
      "Must not replace professional consultation",
      "Must account for diverse languages, cultures, terminology, ages, and digital literacy levels",
    ],
  },
  {
    id: "fintech",
    title: "NER Agriculture, Climate & Supply-Chain Intelligence Platform",
    category: "Agriculture + Climate + AI",
    icon: Store,
    problem:
      "Agriculture and allied activities are important sources of livelihood across the North Eastern Region. However, farmers face challenges related to changing weather patterns, rainfall variability, crop diseases, pests, fragmented markets, limited agricultural information, post-harvest losses, storage constraints, and transportation difficulties. The region's difficult terrain and dispersed rural settlements can further complicate the movement of agricultural products from producers to markets.",
    lookingFor:
      "A prototype that addresses the combined challenges of agricultural productivity, climate variability, post-harvest management, and market connectivity while remaining adaptable to different states, crops, climatic conditions, and local farming practices across NER.",
    focusAreas: [
      "Impact of weather and climate conditions on agricultural activities",
      "Factors affecting crop productivity, quality, and agricultural outcomes",
      "Crop disease, pest, soil, and environmental conditions where relevant",
      "Diverse crops and agricultural practices across different parts of NER",
      "Post-harvest handling, storage, transportation, and movement of agricultural products",
      "Terrain, road connectivity, and remoteness affecting agricultural supply chains",
      "Connections between farmers, markets, buyers, storage facilities, and other stakeholders",
      "Historical and current agricultural conditions for better planning",
    ],
    constraints: [
      "Must remain adaptable to different states, crops, climatic conditions, and local farming practices",
      "Should address productivity, climate, post-harvest, and market-connectivity challenges together",
    ],
  },
  {
    id: "civictech",
    title: "NER Sustainable Tourism, Eco-Risk & Cultural Heritage Intelligence Platform",
    category: "Tourism + Environment + Cultural Heritage + AI",
    icon: Building2,
    problem:
      "The North Eastern Region has significant tourism potential due to its natural landscapes, biodiversity, indigenous cultures, historical sites, festivals, and unique local communities. However, tourism development is affected by limited infrastructure, difficult accessibility, seasonal conditions, fragmented destination information, environmental sensitivity, and the need to protect local cultural heritage. Unplanned tourism activity can also place pressure on ecologically and culturally sensitive locations.",
    lookingFor:
      "A prototype that supports sustainable tourism planning by organizing destination and cultural information, considering accessibility and seasonal conditions, identifying environmental and ecological risks, and helping protect local communities, indigenous cultural practices, and heritage sites.",
    focusAreas: [
      "Established and lesser-known tourism and cultural destinations",
      "Accessibility, transportation, seasonal conditions, infrastructure, and connectivity",
      "Environmental and ecological risks associated with tourism activity",
      "Visitor pressure and carrying capacity of environmentally or culturally sensitive locations",
      "Local communities, indigenous cultural practices, heritage sites, and regional context",
      "Seasonal events, festivals, weather, and changing regional conditions",
      "Useful information for tourists, local communities, tourism authorities, and planners",
      "Sustainable tourism planning rather than destination discovery alone",
    ],
    constraints: [
      "Must account for environmental and cultural heritage protection",
      "Must remain adaptable across different states, ecosystems, destinations, and cultural contexts in NER",
      "Should focus on sustainable tourism planning rather than only destination discovery",
    ],
  },
  {
    id: "opportunities",
    title: "Travel Trap Detector: AI-Powered Tourist Scam & Fair Price Detection System",
    category: "Tourism + AI + Consumer Safety",
    icon: Briefcase,
    problem:
      "Travellers often get overcharged or exploited by local taxis, autos, drivers, guides, restaurants, and other tourist-facing services because they are unfamiliar with local prices. There is no unified system that can compare a quoted price with reliable local pricing, previous traveller experiences, and reported tourist traps, making it difficult for travellers to identify unfair deals before paying.",
    lookingFor:
      "A prototype that helps travellers determine whether a quoted price or tourist-facing service is fair, overpriced, or suspicious by combining AI-based fare analysis, local price benchmarks, tourist-trap intelligence, community reports, risk scoring, fair-price suggestions, and location-based insights.",
    focusAreas: [
      "AI Fare Analyzer using location, distance, service type, and quoted fare",
      "Local Price Benchmarking using historical prices submitted by travellers",
      "Location-based Tourist Trap Database for scams, overcharging, hidden charges, and common tourist traps",
      "Community Reports for fares, complaints, reviews, and supporting evidence",
      "Simple Fair / Suspicious / High Risk result based on pricing and community intelligence",
      "Fair Price Suggestion with an estimated reasonable price range",
      "Location Intelligence for nearby services and areas with unusual pricing patterns or frequent complaints",
      "AI Explanation showing why a fare or situation is considered suspicious",
    ],
    constraints: [
      "Risk assessments should be based on pricing information and available community intelligence",
      "The system should explain the reasoning behind a suspicious result instead of providing only a score",
    ],
  },
];
