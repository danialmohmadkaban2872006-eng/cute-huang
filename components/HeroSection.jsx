// components/HeroSection.jsx — Animated hero with greeting
import { motion } from 'framer-motion'

const planets = [
  { size: 12, orbitRadius: 120, duration: 8, color: '#E7C1B1', label: 'Mercury' },
  { size: 18, orbitRadius: 180, duration: 14, color: '#B980FF', label: 'Venus' },
  { size: 22, orbitRadius: 250, duration: 22, color: '#4FC3F7', label: 'Earth' },
  { size: 16, orbitRadius: 320, duration: 32, color: '#FF7043', label: 'Mars' },
]

export default function HeroSection({ t }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Starfield */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.1,
            }}
            animate={{ opacity: [null, 0.1, 0.9] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Nebula background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #6B21A8 0%, #1A0A2E 60%, transparent 100%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Solar system animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Sun */}
        <motion.div
          className="absolute rounded-full z-10"
          style={{ width: 60, height: 60, background: 'radial-gradient(circle, #FFD700, #FFA500)', boxShadow: '0 0 40px #FFD700, 0 0 80px rgba(255, 215, 0, 0.3)' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Orbit rings */}
        {planets.map((planet, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: planet.orbitRadius * 2,
              height: planet.orbitRadius * 2,
              borderColor: 'rgba(185, 128, 255, 0.1)',
            }}
          />
        ))}

        {/* Planets */}
        {planets.map((planet, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ width: planet.orbitRadius * 2, height: planet.orbitRadius * 2 }}
            animate={{ rotate: 360 }}
            transition={{ duration: planet.duration, repeat: Infinity, ease: 'linear' }}
          >
            <div
              className="absolute rounded-full"
              style={{
                width: planet.size,
                height: planet.size,
                background: planet.color,
                top: '50%',
                left: 0,
                transform: `translateY(-50%)`,
                boxShadow: `0 0 10px ${planet.color}`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Hero text */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.p
            className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            ✦ HUANG'S PRIVATE COSMIC SYSTEM ✦
          </motion.p>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="gradient-text neon-text">{t.greeting}</span>
          </motion.h1>

          <motion.p
            className="text-cosmic-rose/80 text-lg md:text-xl font-light mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#chat"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(185, 128, 255, 0.6)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-2xl font-semibold text-white transition-all cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #6B21A8, #2D1B69)' }}
            >
              🌌 Enter the Cosmos
            </motion.a>
            <motion.a
              href="#solar-system"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="glass-rose px-8 py-4 rounded-2xl font-semibold text-cosmic-rose transition-all cursor-pointer"
            >
              🪐 Explore Solar System
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2 text-purple-500/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-mono tracking-widest">SCROLL TO EXPLORE</span>
          <span className="text-lg">↓</span>
        </motion.div>
      </div>
    </section>
  )
}
