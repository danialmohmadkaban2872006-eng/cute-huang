// components/Footer.jsx — Glowing neon footer
import { motion } from 'framer-motion'

export default function Footer({ t }) {
  return (
    <footer className="relative py-16 px-4 border-t border-purple-900/30 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(107, 33, 168, 0.15) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Logo */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-5xl mb-4"
        >
          🌌
        </motion.div>

        <h3 className="text-2xl font-bold gradient-text mb-2">Huang's Cosmic Engine</h3>
        <p className="text-purple-500 text-sm mb-8 font-mono">Your Personal Astronomy AI System</p>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { href: '#chat', label: '🤖 AI Guide' },
            { href: '#solar-system', label: '🪐 Solar System' },
            { href: '#constellations', label: '⭐ Stars' },
            { href: '#black-hole', label: '🌑 Black Hole' },
            { href: '#moon-phases', label: '🌙 Moon' },
            { href: '#celestial-engine', label: '⚙️ Engine' },
            { href: '#nebulae', label: '🌌 Nebulae' },
            { href: '#cosmic-timeline', label: '⏳ Timeline' },
            { href: '#space-exploration', label: '🚀 Missions' },
            { href: '#star-map', label: '🗺️ Star Map' },
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-purple-400 hover:text-cosmic-rose text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-800/50 to-transparent mb-8" />

        {/* Signature — neon glow */}
        <motion.p
          className="footer-glow text-lg font-semibold tracking-wide"
          style={{ color: '#B980FF' }}
        >
          {t.footer}
        </motion.p>

        <p className="mt-3 text-purple-600 text-xs font-mono">
          Built with Next.js · Groq AI · Framer Motion · {new Date().getFullYear()}
        </p>

        <p className="mt-2 text-purple-700 text-xs">
          "Per aspera ad astra" — Through hardships to the stars ✦
        </p>
      </div>
    </footer>
  )
}
