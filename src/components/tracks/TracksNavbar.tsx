'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Trophy, HelpCircle, ScrollText, ChevronLeft, ChevronRight, X, FileCode } from 'lucide-react'

export default function TracksNavbar() {
  const pathname = usePathname()
  const router = useRouter()

  const track = pathname.startsWith('/tracks/')
    ? pathname.split('/')[2]
    : undefined

  const isCodestellation = track === 'codestellation'
  const accentColor = isCodestellation ? 'purple' : 'cyan'

  const codestellationNavItems = [
    { label: 'INFO', href: `/tracks/codestellation`, key: '[1]', icon: Home },
    { label: 'PS', href: `/tracks/codestellation/ps`, key: '[2]', icon: FileCode },
    { label: 'RULES', href: `/tracks/codestellation/rules`, key: '[3]', icon: ScrollText },
    { label: 'PRIZES', href: `/tracks/codestellation/prizes`, key: '[4]', icon: Trophy },
    { label: 'FAQ', href: `/tracks/codestellation/faq`, key: '[5]', icon: HelpCircle },
  ]

  const decodeNavItems = [
    { label: 'INFO', href: `/tracks/decode`, key: '[1]', icon: Home },
    { label: 'RULES', href: `/tracks/decode/rules`, key: '[2]', icon: ScrollText },
    { label: 'PRIZES', href: `/tracks/decode/prizes`, key: '[3]', icon: Trophy },
    { label: 'FAQ', href: `/tracks/decode/faq`, key: '[4]', icon: HelpCircle },
  ]

  const navItems = isCodestellation ? codestellationNavItems : decodeNavItems

  const isActive = (href: string) => {
    if (href === `/tracks/${track}`) return pathname === href
    return pathname === href || pathname.startsWith(href + '/')
  }

  const currentIndex = navItems.findIndex(item => isActive(item.href))
  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex < navItems.length - 1

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 120, 
        damping: 20,
        delay: 0.3 
      }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 md:gap-3">
        {/* Left Arrow Hint */}
        <motion.button
          onClick={() => canScrollLeft && router.push(navItems[currentIndex - 1].href)}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: canScrollLeft ? 1 : 0.2, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`
            hidden md:flex items-center justify-center
            w-7 h-7 md:w-8 md:h-8 rounded
            bg-black/60 backdrop-blur-sm
            border transition-colors
            ${canScrollLeft 
              ? `border-${accentColor}-500/30 cursor-pointer` 
              : 'border-gray-600/20 cursor-not-allowed'}
          `}
        >
          <ChevronLeft className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${
            canScrollLeft 
              ? accentColor === 'purple' ? 'text-purple-400' : 'text-cyan-400'
              : 'text-gray-600/30'
          }`} />
        </motion.button>

        {/* Main container */}
        <div className={`
          relative
          bg-black/40 backdrop-blur-md
          border-2 transition-colors duration-500
          rounded-lg
          px-0.5 py-0.5 md:px-1 md:py-1
          ${accentColor === 'purple' 
            ? 'border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
            : 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
          }
        `}>
          {/* Corner decorations */}
          <div className={`absolute -top-0.5 -left-0.5 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 transition-colors ${accentColor === 'purple' ? 'border-purple-400' : 'border-cyan-400'}`} />
          <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 transition-colors ${accentColor === 'purple' ? 'border-purple-400' : 'border-cyan-400'}`} />
          <div className={`absolute -bottom-0.5 -left-0.5 w-2 h-2 md:w-3 md:h-3 border-b-2 border-l-2 transition-colors ${accentColor === 'purple' ? 'border-purple-400' : 'border-cyan-400'}`} />
          <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 transition-colors ${accentColor === 'purple' ? 'border-purple-400' : 'border-cyan-400'}`} />

          {/* Scanline effect */}
          <div className={`absolute inset-0 bg-linear-to-b from-transparent to-transparent pointer-events-none ${accentColor === 'purple' ? 'via-purple-500/5' : 'via-cyan-500/5'}`} />

          <ul className="flex items-center gap-0.5 md:gap-1">
            <div className="md:hidden">
              <Link href="/">
                <div
                  className={`
                    relative flex items-center justify-center
                    px-1 py-1.5
                    ${'bg-gray-900/50 text-gray-400 group-hover:text-' + accentColor + '-400 group-hover:bg-' + accentColor + '-500/10'}
                  `}
                >
                  <div 
                    className={`
                      absolute top-0 right-0 w-1.5 h-1.5 md:w-2 md:h-2 border-t border-r
                      ${accentColor === 'purple' ? 'border-purple-600/30' : 'border-cyan-600/30'}
                    `} 
                  />
                  <X className="w-4 h-4" />
                </div>
              </Link>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group"
                    >
                      <div className={`
                        relative
                        px-2.5 py-1.5 md:px-6 md:py-2.5
                        font-mono text-[10px] md:text-sm font-bold
                        tracking-wider
                        transition-all duration-200
                        clip-path-[polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]
                        md:clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]
                        ${isActive(item.href)
                          ? accentColor === 'purple'
                            ? 'bg-linear-to-br from-purple-500/30 to-indigo-600/30 text-purple-300 shadow-[inset_0_0_20px_rgba(168,85,247,0.4)]'
                            : 'bg-linear-to-br from-cyan-500/30 to-blue-600/30 text-cyan-300 shadow-[inset_0_0_20px_rgba(6,182,212,0.4)]'
                          : 'bg-gray-900/50 text-gray-400 group-hover:text-' + accentColor + '-400 group-hover:bg-' + accentColor + '-500/10'
                        }
                      `}>
                        {/* Active indicator */}
                        {isActive(item.href) && (
                          <motion.div
                            layoutId="activeTrackTab"
                            className={`absolute inset-0 border clip-path-[polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] md:clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] ${accentColor === 'purple' ? 'border-purple-400/50' : 'border-cyan-400/50'}`}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        
                        {/* Glow effect on hover */}
                        <div className={`
                          absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                          bg-linear-to-br to-transparent
                          clip-path-[polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]
                          md:clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]
                          ${accentColor === 'purple' ? 'from-purple-500/10' : 'from-cyan-500/10'}
                        `} />

                        <span className="relative flex items-center gap-1.5 md:gap-2">
                          <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          {item.label}
                          <span className={`hidden md:block text-[8px] md:text-[10px] ${accentColor === 'purple' ? 'text-purple-500/60' : 'text-cyan-500/60'}`}>{item.key}</span>
                        </span>

                        {/* Corner accent */}
                        <div className={`
                          absolute top-0 right-0 w-1.5 h-1.5 md:w-2 md:h-2
                          border-t border-r
                          transition-colors
                          ${isActive(item.href) 
                            ? accentColor === 'purple' ? 'border-purple-400' : 'border-cyan-400'
                            : accentColor === 'purple' ? 'border-purple-600/30' : 'border-cyan-600/30'
                          }
                        `} />
                      </div>
                    </motion.div>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Bottom accent line */}
          <div className={`absolute -bottom-1.5 md:-bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent to-transparent ${accentColor === 'purple' ? 'via-purple-500/50' : 'via-cyan-500/50'}`} />
        </div>

        {/* Right Arrow Hint */}
        <motion.button
          onClick={() => canScrollRight && router.push(navItems[currentIndex + 1].href)}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: canScrollRight ? 1 : 0.2, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`
            hidden md:flex items-center justify-center
            w-7 h-7 md:w-8 md:h-8 rounded
            bg-black/60 backdrop-blur-sm
            border transition-colors
            ${canScrollRight 
              ? `border-${accentColor}-500/30 cursor-pointer` 
              : 'border-gray-600/20 cursor-not-allowed'}
          `}
        >
          <ChevronRight className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${
            canScrollRight 
              ? accentColor === 'purple' ? 'text-purple-400' : 'text-cyan-400'
              : 'text-gray-600/30'
          }`} />
        </motion.button>
      </div>

      {/* HUD-style info - hidden on mobile */}
      <div className={`hidden md:block absolute -bottom-5 left-0 text-[10px] font-mono tracking-widest ${accentColor === 'purple' ? 'text-purple-500/40' : 'text-cyan-500/40'}`}>
        TRACK_NAV_SYS
      </div>
    </motion.nav>
  )
}
