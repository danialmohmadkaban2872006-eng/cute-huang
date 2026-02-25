// components/ConstellationsSection.jsx — Interactive Star Constellations
import { useState } from 'react'
import { motion } from 'framer-motion'

const CONSTELLATIONS = [
  {
    name: 'Orion',
    emoji: '🎯',
    stars: [[100,50],[150,100],[200,50],[130,150],[170,150],[120,220],[180,220]],
    lines: [[0,1],[1,2],[1,3],[3,4],[3,5],[4,6]],
    myth: 'The mighty hunter of Greek mythology. Placed in the sky by Zeus after being accidentally killed by Artemis.',
    bestSeen: 'December - February',
    brightest: 'Rigel (β Ori)',
    magnitude: 0.13,
  },
  {
    name: 'Ursa Major',
    emoji: '🐻',
    stars: [[50,80],[100,70],[150,80],[200,90],[240,80],[280,70],[260,130],[230,170]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]],
    myth: 'The Great Bear. Zeus transformed the nymph Callisto into a bear to protect her from Hera\'s jealousy.',
    bestSeen: 'March - June',
    brightest: 'Alioth (ε UMa)',
    magnitude: 1.77,
  },
  {
    name: 'Scorpius',
    emoji: '🦂',
    stars: [[160,30],[140,70],[120,110],[100,140],[80,170],[60,200],[80,230],[120,250],[170,240],[200,220],[230,240]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10]],
    myth: 'The scorpion that killed Orion. Zeus placed them on opposite sides of the sky so they never meet.',
    bestSeen: 'June - August',
    brightest: 'Antares (α Sco)',
    magnitude: 1.05,
  },
  {
    name: 'Cassiopeia',
    emoji: '👑',
    stars: [[40,150],[100,80],[160,120],[220,60],[280,120]],
    lines: [[0,1],[1,2],[2,3],[3,4]],
    myth: 'The vain queen of Ethiopia, chained to spin around the North Pole as punishment for her arrogance.',
    bestSeen: 'October - January',
    brightest: 'Schedar (α Cas)',
    magnitude: 2.24,
  },
  {
    name: 'Leo',
    emoji: '🦁',
    stars: [[80,80],[120,50],[170,60],[200,100],[180,150],[130,170],[90,180],[70,130]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0]],
    myth: 'The Nemean Lion, slain by Hercules as the first of his twelve labors. Honored in the sky by Zeus.',
    bestSeen: 'March - May',
    brightest: 'Regulus (α Leo)',
    magnitude: 1.35,
  },
]

export default function ConstellationsSection({ t }) {
  const [selected, setSelected] = useState(CONSTELLATIONS[0])

  const viewBox = "0 0 320 280"

  return (
    <section id="constellations" className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">⭐</div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.sections.constellations}</h2>
          <p className="text-purple-400">Ancient stories written in starlight</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Constellation list */}
          <div className="space-y-3">
            {CONSTELLATIONS.map(c => (
              <motion.button
                key={c.name}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => setSelected(c)}
                className={`w-full text-left px-5 py-4 rounded-2xl transition-all flex items-center gap-3 ${
                  selected.name === c.name
                    ? 'glass neon-border text-cosmic-rose'
                    : 'glass opacity-70 text-purple-300 hover:opacity-100'
                }`}
              >
                <span className="text-2xl">{c.emoji}</span>
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs opacity-60">{c.bestSeen}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Star map visualization */}
          <motion.div
            key={selected.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-3xl p-4 flex items-center justify-center"
            style={{ background: 'radial-gradient(ellipse, #0D0620 0%, #0B0B19 100%)' }}
          >
            <div className="w-full">
              <div className="text-center mb-3">
                <span className="text-3xl">{selected.emoji}</span>
                <h3 className="text-xl font-bold text-cosmic-rose mt-1">{selected.name}</h3>
              </div>

              <svg viewBox={viewBox} className="w-full" style={{ maxHeight: '280px' }}>
                {/* Constellation lines */}
                {selected.lines.map(([a, b], i) => {
                  const s1 = selected.stars[a]
                  const s2 = selected.stars[b]
                  return (
                    <motion.line
                      key={i}
                      x1={s1[0]} y1={s1[1]} x2={s2[0]} y2={s2[1]}
                      className="constellation-line"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                  )
                })}
                {/* Stars */}
                {selected.stars.map(([x, y], i) => (
                  <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}>
                    <circle cx={x} cy={y} r={8} fill="rgba(185, 128, 255, 0.1)" />
                    <motion.circle
                      cx={x} cy={y} r={3}
                      fill={i === 0 ? '#E7C1B1' : '#F5F0FF'}
                      filter="url(#starGlow)"
                      animate={{ r: [3, 4, 3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  </motion.g>
                ))}
                <defs>
                  <filter id="starGlow">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            key={selected.name + 'info'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-rose rounded-3xl p-6 space-y-4"
          >
            <div>
              <h3 className="text-xl font-bold text-cosmic-rose mb-1">{selected.name}</h3>
              <p className="text-xs text-purple-400 font-mono">CONSTELLATION</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-purple-400">Best Seen</span>
                <span className="text-cosmic-stardust">{selected.bestSeen}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-400">Brightest Star</span>
                <span className="text-cosmic-stardust">{selected.brightest}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-400">Magnitude</span>
                <span className="text-cosmic-stardust">{selected.magnitude}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-400">Stars</span>
                <span className="text-cosmic-stardust">{selected.stars.length}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-900/30">
              <p className="text-xs text-purple-400 mb-2 font-semibold">MYTHOLOGY</p>
              <p className="text-sm text-purple-200 leading-relaxed">{selected.myth}</p>
            </div>

            <div className="pt-3">
              <div className="flex gap-1">
                {selected.stars.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-cosmic-rose/60" />
                ))}
              </div>
              <p className="text-xs text-purple-500 mt-1">{selected.stars.length} main stars</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
