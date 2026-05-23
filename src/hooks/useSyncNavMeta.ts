"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getRouteMetaFromPath } from "@/lib/getRouteMeta";
import { useNavMeta } from "@/store/useNavMeta";

export function useSyncNavMeta() {
  const pathname = usePathname();
  const setMeta = useNavMeta((s) => s.setMeta);

  useEffect(() => {
    const meta = getRouteMetaFromPath(pathname);
    setMeta(meta);
  }, [pathname, setMeta]);
}
