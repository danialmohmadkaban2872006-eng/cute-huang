// components/LanguageGate.jsx — Language Selection Overlay
import { motion, AnimatePresence } from 'framer-motion'
import { LANGUAGES } from '../lib/i18n'

const starVariants = {
  animate: {
    opacity: [0.2, 1, 0.2],
    scale: [1, 1.2, 1],
    transition: { duration: 3, repeat: Infinity, repeatType: 'loop' }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 }
}

export default function LanguageGate({ onSelect }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, #1A0A2E 0%, #0B0B19 70%)' }}
      >
        {/* Animated stars background */}
        <div className="absolute inset-0 stars-bg opacity-60" />

        {/* Orbiting decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[300, 450, 600].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full border border-purple-900/30"
              style={{ width: size, height: size }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        {/* Central content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-6 max-w-2xl w-full"
        >
          {/* Logo / Title */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 mx-auto mb-6 relative"
            >
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/40" />
              <div className="absolute inset-2 rounded-full border border-rose-300/30" />
              <div className="absolute inset-0 flex items-center justify-center text-5xl">
                🌌
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
              Huang's Cosmic Engine
            </h1>
            <p className="text-purple-300/80 text-sm font-mono tracking-widest uppercase">
              Personal Astronomy AI System v1.0
            </p>
          </motion.div>

          {/* Language selection prompt */}
          <motion.p
            variants={itemVariants}
            className="text-cosmic-rose/90 text-lg mb-10 font-light"
          >
            ✦ Choose your language to enter the cosmos ✦
          </motion.p>

          {/* Language buttons */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {Object.values(LANGUAGES).map((lang) => (
              <motion.button
                key={lang.code}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 25px rgba(185, 128, 255, 0.5)',
                  borderColor: 'rgba(185, 128, 255, 0.8)',
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect(lang.code)}
                className="glass rounded-2xl p-5 cursor-pointer transition-all duration-300 group"
              >
                <div className="text-3xl mb-2">{lang.flag}</div>
                <div className="text-white font-semibold text-lg group-hover:text-cosmic-rose transition-colors">
                  {lang.nativeName}
                </div>
                <div className="text-purple-400 text-sm mt-1">{lang.name}</div>
                {(lang.dir === 'rtl') && (
                  <div className="mt-2">
                    <span className="text-xs text-rose-300/60 font-mono">RTL ←</span>
                  </div>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="mt-10 text-purple-500/50 text-xs font-mono"
          >
            Developed by Danial Kurdistani · Huang's Private Cosmic System
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
