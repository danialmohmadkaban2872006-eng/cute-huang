// components/Navigation.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navigation({ t, currentLang, onChangeLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'chat', label: t.sections.chat, icon: '🤖' },
    { id: 'solar-system', label: t.sections.solarSystem, icon: '🪐' },
    { id: 'constellations', label: t.sections.constellations, icon: '⭐' },
    { id: 'black-hole', label: t.sections.blackHole, icon: '🌑' },
    { id: 'moon-phases', label: t.sections.moonPhases, icon: '🌙' },
    { id: 'celestial-engine', label: t.sections.celestialEngine, icon: '⚙️' },
    { id: 'nebulae', label: t.sections.nebulae, icon: '🌌' },
    { id: 'cosmic-timeline', label: t.sections.cosmicTimeline, icon: '⏳' },
    { id: 'space-exploration', label: t.sections.spaceExploration, icon: '🚀' },
    { id: 'star-map', label: t.sections.starMap, icon: '🗺️' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'glass border-b border-purple-900/30 py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-2xl">🌌</span>
          <div>
            <div className="gradient-text font-bold text-sm leading-none">Huang's</div>
            <div className="text-purple-400 text-xs font-mono">Cosmic Engine</div>
          </div>
        </motion.div>

        {/* Desktop nav - show 5 key items */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.slice(0, 5).map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-2 rounded-lg text-purple-300/70 hover:text-cosmic-rose text-xs font-medium transition-colors flex items-center gap-1"
            >
              <span>{item.icon}</span>
              <span className="hidden xl:block">{item.label}</span>
            </motion.a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onChangeLang}
            className="glass px-3 py-2 rounded-lg text-xs text-purple-300 hover:text-cosmic-rose transition-colors flex items-center gap-2"
          >
            🌍 <span className="hidden sm:block">{currentLang.toUpperCase()}</span>
          </motion.button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-purple-300 p-2"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass border-t border-purple-900/30 mt-2"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-purple-300/80 hover:text-cosmic-rose text-sm transition-colors"
              >
                <span>{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
