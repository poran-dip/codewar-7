'use client'
import { motion } from 'motion/react'
import { Mail, Phone, MapPin, Radio, Instagram, Linkedin, Facebook } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const items = [
    { 
      title: 'EMAIL', 
      content: 'aeccodewar@gmail.com',
      icon: Mail,
      color: 'cyan',
      href: 'mailto:aeccodewar@gmail.com'
    },
    { 
      title: 'COORDINATORS', 
      content: '+91 94355 53309',
      icon: Phone,
      color: 'purple',
      href: 'tel:+919435553309'
    },
    { 
      title: 'LOCATION', 
      content: 'AEC, Guwahati',
      icon: MapPin,
      color: 'cyan',
      href: 'https://maps.app.goo.gl/f5BzYNGCuVAi51st6'
    },
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/codewar_aec2026/',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/company/aec-coding-club',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://www.facebook.com/aeccodingclub/',
      color: 'from-blue-600 to-blue-400'
    }
  ]

  return (
    <main className="h-screen text-white px-4">
      <div className="h-[105vh]">
        <div className="h-screen flex items-center justify-center pt-20 md:pt-32 pb-16">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
            className="w-full max-w-4xl"
          >
            {/* Compact Header */}
            <div className="relative mb-3 md:mb-6">
              <div className="relative bg-black/40 backdrop-blur-md border-2 border-cyan-500/50 px-3 py-2 md:px-6 md:py-3 clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] md:clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
                <div className="absolute top-0 left-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-r-2 border-cyan-400" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Radio className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 animate-pulse" />
                    <h1 className="text-xl md:text-3xl font-black font-mono tracking-tight text-cyan-300">
                      CONTACT
                    </h1>
                  </div>
                  <div className="text-[8px] md:text-[10px] font-mono text-cyan-500/50 tracking-widest">
                    COM_LINK_ACTIVE
                  </div>
                </div>
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
              {items.map((item, i) => (
                <Link 
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.4 + (i * 0.1), 
                      type: 'spring', 
                      stiffness: 100 
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`
                      relative group cursor-pointer
                      bg-black/40 backdrop-blur-md
                      border-2 transition-all duration-300
                      clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]
                      ${item.color === 'cyan' 
                        ? 'border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]' 
                        : 'border-purple-500/30 hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]'
                      }
                    `}
                  >
                    {/* Corner decorations */}
                    <div className={`absolute top-0 left-0 w-2 h-2 md:w-4 md:h-4 border-t-2 border-l-2 transition-colors ${item.color === 'cyan' ? 'border-cyan-500/50 group-hover:border-cyan-400' : 'border-purple-500/50 group-hover:border-purple-400'}`} />
                    <div className={`absolute top-0 right-0 w-2 h-2 md:w-4 md:h-4 border-t-2 border-r-2 transition-colors ${item.color === 'cyan' ? 'border-cyan-500/50 group-hover:border-cyan-400' : 'border-purple-500/50 group-hover:border-purple-400'}`} />
                    <div className={`absolute bottom-0 left-0 w-2 h-2 md:w-4 md:h-4 border-b-2 border-l-2 transition-colors ${item.color === 'cyan' ? 'border-cyan-500/50 group-hover:border-cyan-400' : 'border-purple-500/50 group-hover:border-purple-400'}`} />
                    <div className={`absolute bottom-0 right-0 w-2 h-2 md:w-4 md:h-4 border-b-2 border-r-2 transition-colors ${item.color === 'cyan' ? 'border-cyan-500/50 group-hover:border-cyan-400' : 'border-purple-500/50 group-hover:border-purple-400'}`} />

                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] ${item.color === 'cyan' ? 'bg-linear-to-br from-cyan-900/20 to-blue-900/20' : 'bg-linear-to-br from-purple-900/20 to-indigo-900/20'}`} />
                    
                    {/* Scanline effect */}
                    <div className={`absolute inset-0 bg-linear-to-b from-transparent to-transparent pointer-events-none ${item.color === 'cyan' ? 'via-cyan-500/5' : 'via-purple-500/5'}`} />

                    <div className="relative p-3 md:p-5 grid grid-cols-[auto_1fr] grid-rows-2 gap-x-2.5 gap-y-0.5 md:gap-y-1 items-center md:block md:text-center">
                      {/* Icon */}
                      <div className="row-span-2 flex items-center justify-center md:mb-3 md:row-auto">
                        <div className={`p-1.5 md:p-2.5 rounded-lg ${item.color === 'cyan' ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-purple-500/10 border border-purple-500/30'}`}>
                          <item.icon className={`w-4 h-4 md:w-6 md:h-6 ${item.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`} />
                        </div>
                      </div>

                      {/* Label */}
                      <div className={`inline-block md:mb-2 px-1.5 py-0.5 md:px-3 md:py-1 text-[8px] md:text-[10px] font-mono tracking-widest text-left md:text-center ${item.color === 'cyan' ? 'bg-cyan-500/10 border border-cyan-400/20 text-cyan-400/70' : 'bg-purple-500/10 border border-purple-400/20 text-purple-400/70'}`}>
                        {item.title}
                      </div>

                      {/* Content */}
                      <p className={`text-[11px] md:text-sm font-mono font-medium text-left md:text-center leading-tight ${item.color === 'cyan' ? 'text-cyan-200' : 'text-purple-200'} wrap-break-word break-all`}>
                        {item.content}
                      </p>

                      {/* Status indicator */}
                      <div className="hidden mt-3 md:flex items-center justify-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${item.color === 'cyan' ? 'bg-cyan-400' : 'bg-purple-400'}`} />
                        <span className={`text-[9px] md:text-[10px] font-mono ${item.color === 'cyan' ? 'text-cyan-500/50' : 'text-purple-500/50'}`}>
                          ACTIVE
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-4 md:mt-8"
            >
              <div className="text-center mb-2 md:mb-4">
                <p className="text-[9px] md:text-xs font-mono text-cyan-400/60 tracking-widest md:tracking-[0.2em] uppercase">
                  FOLLOW THE SIGNAL
                </p>
              </div>

              <div className="flex justify-center items-center gap-2.5 md:gap-4">
                {/* Club Logo - First position */}
                <Link 
                  href="https://coding.aec.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.8, 
                      type: 'spring', 
                      stiffness: 150 
                    }}
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="relative bg-black/60 backdrop-blur-sm border-2 border-cyan-500/30 p-2.5 md:p-3.5 rounded-lg transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-1.5 h-1.5 md:w-2 md:h-2 border-t-2 border-l-2 border-cyan-400/60 transition-colors group-hover:border-cyan-400" />
                      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 md:w-2 md:h-2 border-b-2 border-r-2 border-cyan-400/60 transition-colors group-hover:border-cyan-400" />
                      
                      {/* Gradient background on hover */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-br from-cyan-500/20 to-blue-500/20" />
                      
                      {/* Logo with filter effects */}
                      <img 
                        src="/branding/coding_club.svg" 
                        alt="AEC Coding Club"
                        className="w-4 h-4 md:w-6 md:h-6 relative z-10 object-contain transition-all brightness-90 group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] grayscale-30 group-hover:grayscale-0"
                      />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-black/90 backdrop-blur-sm border border-cyan-500/30 px-2 py-1 rounded text-[9px] font-mono text-cyan-300 whitespace-nowrap">
                        AEC Coding Club
                      </div>
                    </div>
                  </motion.div>
                </Link>

                {socialLinks.map((social, i) => (
                  <Link 
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.8 + ((i + 1) * 0.1), // +1 to account for club logo
                        type: 'spring', 
                        stiffness: 150 
                      }}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group"
                    >
                      <div className="relative bg-black/60 backdrop-blur-sm border-2 border-cyan-500/30 p-2.5 md:p-3.5 rounded-lg transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-1.5 h-1.5 md:w-2 md:h-2 border-t-2 border-l-2 border-cyan-400/60 transition-colors group-hover:border-cyan-400" />
                        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 md:w-2 md:h-2 border-b-2 border-r-2 border-cyan-400/60 transition-colors group-hover:border-cyan-400" />
                        
                        {/* Gradient background on hover */}
                        <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-br ${social.color}/20`} />
                        
                        <social.icon className="w-4 h-4 md:w-6 md:h-6 text-cyan-400 relative z-10 transition-all group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      </div>

                      {/* Tooltip */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-black/90 backdrop-blur-sm border border-cyan-500/30 px-2 py-1 rounded text-[9px] font-mono text-cyan-300 whitespace-nowrap">
                          {social.name}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 md:mt-8 text-center"
            >
              <div className="inline-block bg-black/60 backdrop-blur-sm border border-cyan-500/20 px-2.5 py-1 md:px-4 md:py-2 font-mono text-[9px] md:text-xs text-cyan-400/50">
                <span className="text-cyan-500/70">NEED HELP?</span> Reach out anytime
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* System label */}
      <div className="hidden md:block absolute bottom-4 left-4 text-[10px] font-mono text-cyan-500/30 tracking-widest">
        COMM_SYSTEM_v2.0
      </div>
    </main>
  )
}
