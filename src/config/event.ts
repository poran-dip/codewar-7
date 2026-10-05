export const EVENT_CONFIG = {
  eventName: "CODEWAR",
  edition: "8.0",
  registrationUrl: "#registration",
  website: "codewar.aec.ac.in",
  contacts: ["+91 9435553309", "+91 8486479010"],
  sponsors: {
    poweredBy: "GeeksforGeeks",
    coPoweredBy: "XT Academy",
  },
  prizePool: "₹30,000 CASH",
  prizeExtras: ["courses", "goodies"],
  events: {
    codestellation: {
      track: "TRACK 01",
      world: "WORLD 01",
      name: "CODESTELLATION",
      tagline: "Navigate the Stars of Code",
      type: "Hackathon",
      date: "25–26 February 2026",
      details: ["Online coding round", "Offline final presentations", "Assam Engineering College campus"],
      href: "/tracks/codestellation",
      accent: "sun",
    },
    decode: {
      track: "TRACK 02",
      world: "WORLD 02",
      name: "DECODE STACK",
      tagline: "Unravel the Digital Mystery",
      type: "Competitive Programming Contest",
      date: "25 February 2026",
      details: ["6:00 PM – 9:00 PM IST", "Online", "GeeksforGeeks"],
      href: "/tracks/decode",
      accent: "sky",
    },
  },
} as const;

export type EventTrack = keyof typeof EVENT_CONFIG.events;