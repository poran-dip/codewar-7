"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useNavMeta } from "@/store/useNavMeta";
import { getRouteMetaFromPath } from "@/lib/getRouteMeta";

export function useSyncNavMeta() {
  const pathname = usePathname();
  const setMeta = useNavMeta((s) => s.setMeta);

  useEffect(() => {
    const meta = getRouteMetaFromPath(pathname);
    setMeta(meta);
  }, [pathname, setMeta]);
}
