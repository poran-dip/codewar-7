'use client'
import { motion } from 'motion/react'
import { Mail, Phone, MapPin, Radio } from 'lucide-react'

export default function ContactPage() {
  const items = [
    { 
      title: 'EMAIL', 
      content: 'codewar@aec.edu.in',
      icon: Mail,
      color: 'cyan'
    },
    { 
      title: 'COORDINATORS', 
      content: '+91 XXXXX XXXXX',
      icon: Phone,
      color: 'purple'
    },
    { 
      title: 'LOCATION', 
      content: 'AEC, Guwahati',
      icon: MapPin,
      color: 'cyan'
    },
  ]

  return (
    <main className="h-screen text-white px-4">
      <div className="h-[105vh]">
        <div className="h-screen flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
            className="w-full max-w-4xl"
          >
            {/* Header Section */}
            <div className="relative mb-8">
              <div className="absolute inset-0 blur-3xl bg-cyan-500/10" />
              
              <div className="relative bg-black/40 backdrop-blur-md border-2 border-cyan-500/50 px-8 py-4 clip-path-[polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <h1 className="text-3xl md:text-4xl font-black font-mono tracking-tight text-cyan-300">
                      CONTACT
                    </h1>
                  </div>
                  
                  <div className="text-[10px] font-mono text-cyan-500/50 tracking-widest">
                    COM_LINK_ACTIVE
                  </div>
                </div>

                {/* Scanline effect */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
              </div>

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-linear-to-r from-transparent via-cyan-500/60 to-transparent" />
            </div>

            {/* Contact Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.4 + (i * 0.1), 
                    type: 'spring', 
                    stiffness: 100 
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`
                    relative group cursor-default
                    bg-black/40 backdrop-blur-md
                    border-2 transition-all duration-300
                    clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]
                    ${item.color === 'cyan' 
                      ? 'border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]' 
                      : 'border-purple-500/30 hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]'
                    }
                  `}
                >
                  {/* Corner decorations */}
                  <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors ${item.color === 'cyan' ? 'border-cyan-500/50 group-hover:border-cyan-400' : 'border-purple-500/50 group-hover:border-purple-400'}`} />
                  <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors ${item.color === 'cyan' ? 'border-cyan-500/50 group-hover:border-cyan-400' : 'border-purple-500/50 group-hover:border-purple-400'}`} />
                  <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors ${item.color === 'cyan' ? 'border-cyan-500/50 group-hover:border-cyan-400' : 'border-purple-500/50 group-hover:border-purple-400'}`} />
                  <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors ${item.color === 'cyan' ? 'border-cyan-500/50 group-hover:border-cyan-400' : 'border-purple-500/50 group-hover:border-purple-400'}`} />

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] ${item.color === 'cyan' ? 'bg-linear-to-br from-cyan-900/20 to-blue-900/20' : 'bg-linear-to-br from-purple-900/20 to-indigo-900/20'}`} />
                  
                  {/* Scanline effect */}
                  <div className={`absolute inset-0 bg-linear-to-b from-transparent to-transparent pointer-events-none ${item.color === 'cyan' ? 'via-cyan-500/5' : 'via-purple-500/5'}`} />

                  <div className="relative p-6 text-center">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-lg ${item.color === 'cyan' ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-purple-500/10 border border-purple-500/30'}`}>
                        <item.icon className={`w-6 h-6 ${item.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`} />
                      </div>
                    </div>

                    {/* Label */}
                    <div className={`inline-block mb-3 px-3 py-1 text-[10px] font-mono tracking-widest ${item.color === 'cyan' ? 'bg-cyan-500/10 border border-cyan-400/20 text-cyan-400/70' : 'bg-purple-500/10 border border-purple-400/20 text-purple-400/70'}`}>
                      {item.title}
                    </div>

                    {/* Content */}
                    <p className={`text-sm md:text-base font-mono font-medium ${item.color === 'cyan' ? 'text-cyan-200' : 'text-purple-200'}`}>
                      {item.content}
                    </p>

                    {/* Status indicator */}
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${item.color === 'cyan' ? 'bg-cyan-400' : 'bg-purple-400'}`} />
                      <span className={`text-[10px] font-mono ${item.color === 'cyan' ? 'text-cyan-500/50' : 'text-purple-500/50'}`}>
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
            >
              <div className="inline-block bg-black/60 backdrop-blur-sm border border-cyan-500/20 px-4 py-2 font-mono text-xs text-cyan-400/50">
                <span className="text-cyan-500/70">TIP:</span> Contact coordinators for mission briefing
              </div>
            </motion.div>

            {/* System label */}
            <div className="mt-4 text-center text-[10px] font-mono text-cyan-500/30 tracking-widest">
              COMM_SYSTEM_v2.0
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
