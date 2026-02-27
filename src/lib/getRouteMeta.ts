import { RouteMeta } from "@/store/useNavMeta";

export function getRouteMetaFromPath(path: string): RouteMeta {
  const parts = path.split("/").filter(Boolean);

  if (parts.length === 0) {
    return { layer: "intro", section: "" };
  }

  if (parts[0] === "tracks") {
    return {
      layer: "tracks",
      track: parts[1] as RouteMeta["track"],
      section: (parts[2] as RouteMeta["section"]) || "",
    };
  }

  return {
    layer: "intro",
    section: parts[0] as RouteMeta["section"],
  };
}
