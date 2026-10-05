"use client";

import { ChevronLeft, ChevronRight, Coins } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { EVENT_CONFIG } from "@/config/event";

const IntroNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "HOME", href: "/", key: "[1]" },
    { label: "CONTACT", href: "/contact", key: "[2]" },
    { label: "SPONSORS", href: "/sponsors", key: "[3]" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const currentIndex = navItems.findIndex((item) => isActive(item.href));
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < navItems.length - 1;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: 0.3,
      }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex w-[min(100vw-1.5rem,54rem)] items-center justify-center gap-2 md:gap-3">
        <div className="hidden items-center gap-2 border-2 border-[var(--ink)] bg-[rgba(255,248,223,0.78)] px-3 py-2 font-[family-name:var(--font-pixel)] text-[9px] text-[var(--ink)] shadow-[4px_4px_0_var(--ink)] backdrop-blur-sm lg:flex">
          <span>{EVENT_CONFIG.eventName} {EVENT_CONFIG.edition}</span>
          <span className="flex items-center gap-1"><Coins size={13} aria-hidden="true" /> ×128</span>
        </div>
        {/* Left Arrow Hint */}
        <motion.button
          onClick={() =>
            canScrollLeft && router.push(navItems[currentIndex - 1].href)
          }
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: canScrollLeft ? 1 : 0.2, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`
            hidden md:flex items-center justify-center
            w-7 h-7 md:w-8 md:h-8 rounded
            border-2 border-[var(--ink)] bg-[rgba(255,248,223,0.72)]
            ${canScrollLeft ? "cursor-pointer" : "cursor-not-allowed"}
          `}
        >
          <ChevronLeft
            className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${canScrollLeft ? "text-[var(--brick)]" : "text-[var(--ink)]/20"}`}
          />
        </motion.button>

        {/* Main container with game UI styling */}
        <div
          className="
          relative
          bg-[rgba(255,248,223,0.78)] backdrop-blur-sm
          border-2 border-[var(--ink)]
          px-0.5 py-0.5 md:px-1 md:py-1
          shadow-[4px_4px_0_var(--ink)]
        "
        >
          {/* Corner decorations */}
          <div className="absolute -top-0.5 -left-0.5 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 border-[var(--brick)]" />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 border-[var(--brick)]" />
          <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 md:w-3 md:h-3 border-b-2 border-l-2 border-[var(--brick)]" />
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 border-[var(--brick)]" />

          {/* Scanline effect */}
          <ul className="flex w-full items-center justify-center gap-0.5 md:gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div
                      className={`
                      relative
                      px-3 py-1.5 md:px-6 md:py-2.5
                      font-[family-name:var(--font-pixel)] text-[8px] md:text-[10px] font-bold
                      tracking-wider
                      transition-all duration-200
                      clip-path-[polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]
                      md:clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]
                      ${
                        isActive(item.href)
                          ? "bg-[var(--sun)] text-[var(--ink)]"
                          : "text-[var(--ink)]/65 group-hover:bg-[rgba(200,108,53,0.14)] group-hover:text-[var(--brick)]"
                      }
                    `}
                    >
                      {/* Active indicator */}
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 border-2 border-[var(--brick)] clip-path-[polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] md:clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Glow effect on hover */}
                      <div
                        className={`
                        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                        bg-[rgba(200,108,53,0.12)]
                        clip-path-[polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]
                        md:clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]
                      `}
                      />

                        <span className="relative flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap">
                        {item.label}
                        <span className="text-[8px] md:text-[10px] text-[var(--brick)]/70">
                          {item.key}
                        </span>
                      </span>

                      {/* Corner accent */}
                      <div
                        className={`
                        absolute top-0 right-0 w-1.5 h-1.5 md:w-2 md:h-2
                        border-t border-r
                        ${isActive(item.href) ? "border-[var(--brick)]" : "border-[var(--ink)]/25"}
                        transition-colors
                      `}
                      />
                    </div>
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom accent line */}
          <div className="absolute -bottom-1.5 md:-bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-px bg-[var(--ink)]" />
        </div>

        {/* Right Arrow Hint */}
        <motion.button
          onClick={() =>
            canScrollRight && router.push(navItems[currentIndex + 1].href)
          }
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: canScrollRight ? 1 : 0.2, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`
            hidden md:flex items-center justify-center
            w-7 h-7 md:w-8 md:h-8 rounded
            border-2 border-[var(--ink)] bg-[rgba(255,248,223,0.72)]
            ${canScrollRight ? "cursor-pointer" : "cursor-not-allowed"}
          `}
        >
          <ChevronRight
            className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${canScrollRight ? "text-[var(--brick)]" : "text-[var(--ink)]/20"}`}
          />
        </motion.button>
      </div>

      {/* HUD-style info - hidden on mobile */}
    </motion.nav>
  );
};

export default IntroNavbar;
