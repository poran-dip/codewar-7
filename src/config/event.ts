export const EVENT_CONFIG = {
  eventName: "CODEWAR",
  edition: "8.0",
  registrationUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeWIs6fMFzMb8QnGXLCX-wdK6Rgc42ltjI0P0lhgpWOhtSC5A/viewform",
  website: "codewar.aec.ac.in",
  contacts: ["+91 8811864964", "+91 8486479010"],
  sponsors: {
    poweredBy: "Unstop",
    coPoweredBy: "Quick Bites",
  },
  prizePool: "₹18,000 CASH",
  prizeExtras: ["certificates", "goodies"],
  events: {
    codestellation: {
      track: "TRACK 01",
      world: "WORLD 01",
      name: "CODESTELLATION",
      tagline: "A 24-HOUR ONLINE SOFTWARE DEVELOPMENT HACKATHON",
      type: "24-Hour Online Hackathon",
      date: "24 Hours — 10 Sept 2026",
      details: ["Online Hackathon", "Team/Solo-based Software Development", "Real-world Problem Statements"],
      href: "/tracks/codestellation",
      accent: "sun",
    },
    decode: {
      track: "TRACK 02",
      world: "WORLD 02",
      name: "DECODE_STACK",
      tagline: "A BRAINSTORMING COMPETITIVE CODING CONTEST",
      type: "Competitive Programming Contest",
      date: "10 Sept 2026",
      details: ["10:00 AM – 1:00 PM IST", "Offline", "Codeforces Contest"],
      href: "/tracks/decode",
      accent: "sky",
    },
  },
} as const;

export type EventTrack = keyof typeof EVENT_CONFIG.events;