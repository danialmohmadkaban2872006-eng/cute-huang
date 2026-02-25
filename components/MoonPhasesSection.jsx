// components/MoonPhasesSection.jsx — Interactive Moon Phases
import { useState } from 'react'
import { motion } from 'framer-motion'

const PHASES = [
  { name: 'New Moon', angle: 0, emoji: '🌑', illumination: 0, description: 'The Moon is between Earth and Sun. The illuminated side faces away from us. New beginnings.' },
  { name: 'Waxing Crescent', angle: 45, emoji: '🌒', illumination: 12, description: 'A sliver of light appears on the right. The Moon is growing. Set intentions.' },
  { name: 'First Quarter', angle: 90, emoji: '🌓', illumination: 50, description: 'The right half illuminated. A decision point. Push forward through challenges.' },
  { name: 'Waxing Gibbous', angle: 135, emoji: '🌔', illumination: 75, description: 'More than half lit, growing toward full. Refine your goals and persist.' },
  { name: 'Full Moon', angle: 180, emoji: '🌕', illumination: 100, description: 'The Moon is fully illuminated — opposite Earth from the Sun. Peak energy and clarity.' },
  { name: 'Waning Gibbous', angle: 225, emoji: '🌖', illumination: 75, description: 'Light begins to retreat from the right. Time to share gratitude and wisdom.' },
  { name: 'Last Quarter', angle: 270, emoji: '🌗', illumination: 50, description: 'Left half illuminated. Release what no longer serves you. Let go.' },
  { name: 'Waning Crescent', angle: 315, emoji: '🌘', illumination: 12, description: 'A slim crescent fading. Rest, reflect, and prepare for the new cycle.' },
]

function MoonVisual({ phase }) {
  const illum = phase.illumination
  const isWaning = phase.angle > 180

  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Glow */}
      {illum > 0 && (
        <div
          className="absolute inset-0 rounded-full moon-glow"
          style={{ opacity: illum / 200 }}
        />
      )}
      {/* Moon body */}
      <div className="w-48 h-48 rounded-full overflow-hidden relative" style={{ background: '#111' }}>
        {/* Dark side */}
        <div className="absolute inset-0 rounded-full" style={{ background: '#1a1a2e' }} />
        {/* Illuminated portion */}
        {illum > 0 && (
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #F5F0FF 0%, #D4C5A9 40%, #B8A88A 80%)',
              clipPath: illum === 100
                ? 'none'
                : isWaning
                  ? `ellipse(${illum}% 50% at ${100 - illum / 2}% 50%)`
                  : `ellipse(${illum}% 50% at ${illum / 2 + 50}% 50%)`,
            }}
          />
        )}
        {/* Craters */}
        {illum > 0 && [
          { x: '35%', y: '30%', r: 8 },
          { x: '60%', y: '55%', r: 12 },
          { x: '45%', y: '65%', r: 6 },
          { x: '70%', y: '35%', r: 9 },
        ].map((crater, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: crater.x,
              top: crater.y,
              width: crater.r * 2,
              height: crater.r * 2,
              background: 'rgba(0,0,0,0.15)',
              border: '1px solid rgba(0,0,0,0.1)',
              transform: 'translate(-50%,-50%)',
            }}
          />
        ))}
      </div>
      {/* Phase label */}
      <div className="mt-4 text-center">
        <span className="text-5xl">{phase.emoji}</span>
      </div>
    </div>
  )
}

export default function MoonPhasesSection({ t }) {
  const [selected, setSelected] = useState(PHASES[4])

  // Simulate current moon phase (rough approximation)
  const dayOfMonth = new Date().getDate()
  const approxPhaseIndex = Math.floor((dayOfMonth / 30) * 8) % 8

  return (
    <section id="moon-phases" className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">🌙</div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.sections.moonPhases}</h2>
          <p className="text-purple-400">The eternal dance of light and shadow</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Phase display */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 text-center"
          >
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <MoonVisual phase={selected} />
              <h3 className="text-2xl font-bold text-cosmic-rose mt-6 mb-2">{selected.name}</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex-1 bg-purple-900/30 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #E7C1B1, #F5F0FF)' }}
                    animate={{ width: `${selected.illumination}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-sm text-purple-400 font-mono w-12">{selected.illumination}%</span>
              </div>
              <p className="text-purple-200 text-sm leading-relaxed">{selected.description}</p>
            </motion.div>
          </motion.div>

          {/* Phase selector */}
          <div>
            <p className="text-purple-400 text-sm mb-4 font-mono">
              ✦ ESTIMATED CURRENT PHASE: {PHASES[approxPhaseIndex].name}
            </p>
            <div className="grid grid-cols-4 gap-3">
              {PHASES.map((phase, i) => (
                <motion.button
                  key={phase.name}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected(phase)}
                  className={`glass rounded-2xl p-3 text-center transition-all ${
                    selected.name === phase.name ? 'neon-border' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="text-2xl mb-1">{phase.emoji}</div>
                  <div className="text-xs text-purple-300 leading-tight">{phase.name.split(' ').map(w => w[0]).join('')}</div>
                  {i === approxPhaseIndex && (
                    <div className="text-xs text-cosmic-rose mt-1">today</div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Moon facts */}
            <div className="mt-6 glass-rose rounded-2xl p-5 space-y-3">
              <h4 className="text-cosmic-rose font-semibold">🌙 Lunar Facts</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="glass rounded-xl p-3">
                  <div className="text-purple-400 text-xs">Distance</div>
                  <div className="text-cosmic-stardust font-semibold">384,400 km</div>
                </div>
                <div className="glass rounded-xl p-3">
                  <div className="text-purple-400 text-xs">Orbital Period</div>
                  <div className="text-cosmic-stardust font-semibold">27.3 days</div>
                </div>
                <div className="glass rounded-xl p-3">
                  <div className="text-purple-400 text-xs">Synodic Month</div>
                  <div className="text-cosmic-stardust font-semibold">29.5 days</div>
                </div>
                <div className="glass rounded-xl p-3">
                  <div className="text-purple-400 text-xs">Surface Temp</div>
                  <div className="text-cosmic-stardust font-semibold">-173° to 127°C</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
