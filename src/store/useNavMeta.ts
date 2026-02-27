import { create } from "zustand";
import { getSectionIndex } from "@/lib/getSectionIndex";

export type Layer = "intro" | "tracks";
export type Track = "codestellation" | "decode";
export type IntroSection = "" | "contact" | "sponsors";
export type TrackSection = "" | "ps" | "rules" | "prizes" | "faq";

export type SectionByLayer = {
  intro: IntroSection;
  tracks: TrackSection;
};

export type RouteMeta = {
  layer: Layer;
  track?: Track;
  section?: IntroSection | TrackSection;
};

type NavDirection = "forward" | "back" | "lateral";

interface NavMetaState {
  currentMeta: RouteMeta | null;
  previousMeta: RouteMeta | null;
  direction: NavDirection;
  setMeta: (meta: RouteMeta) => void;
}

export const useNavMeta = create<NavMetaState>((set, get) => ({
  currentMeta: null,
  previousMeta: null,
  direction: "forward",

  setMeta: (meta) => {
    const prev = get().currentMeta;
    let direction: NavDirection = "forward";

    if (prev) {
      // Same track, different section
      if (prev.track === meta.track && prev.section !== meta.section) {
        direction =
          getSectionIndex(meta) > getSectionIndex(prev) ? "forward" : "back";
      }
      // Different layer
      else if (prev.layer !== meta.layer) {
        direction = meta.layer === "tracks" ? "forward" : "back";
      }
      // Different track
      else if (prev.track !== meta.track) {
        direction = "lateral";
      }
    }

    set({
      previousMeta: prev,
      currentMeta: meta,
      direction,
    });
  },
}));
