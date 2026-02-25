// components/NebulaSection.jsx — Animated Nebulae Gallery
import { useState } from 'react'
import { motion } from 'framer-motion'

const NEBULAE = [
  {
    name: 'Orion Nebula',
    id: 'orion',
    type: 'Emission Nebula',
    distance: '1,344 light-years',
    size: '24 light-years',
    constellation: 'Orion',
    description: 'A stellar nursery visible to the naked eye. Thousands of young stars form in its cosmic cradle.',
    colors: ['#FF6B2B', '#FF4466', '#8833FF', '#2244AA'],
    gradient: 'radial-gradient(ellipse at 30% 40%, #FF6B2B66 0%, #88000033 40%, #220055 80%, #0B0B19 100%)',
  },
  {
    name: 'Crab Nebula',
    id: 'crab',
    type: 'Supernova Remnant',
    distance: '6,523 light-years',
    size: '11 light-years',
    constellation: 'Taurus',
    description: 'Remnant of a supernova observed by Chinese astronomers in 1054 AD. A pulsar spins at its heart.',
    colors: ['#4FC3F7', '#FFD700', '#FF6633', '#BB44FF'],
    gradient: 'radial-gradient(ellipse at 50% 50%, #4FC3F766 0%, #FFD70033 35%, #FF663322 65%, #0B0B19 100%)',
  },
  {
    name: 'Pillars of Creation',
    id: 'pillars',
    type: 'Emission Nebula',
    distance: '6,500 light-years',
    size: '4-5 light-years (each pillar)',
    constellation: 'Serpens',
    description: 'Iconic columns of gas and dust in Eagle Nebula. Active stellar formation zones, imaged by Hubble in 1995.',
    colors: ['#44BB88', '#228866', '#884422', '#CC6633'],
    gradient: 'radial-gradient(ellipse at 50% 70%, #44BB8866 0%, #22886633 40%, #884422 80%, #0B0B19 100%)',
  },
  {
    name: 'Helix Nebula',
    id: 'helix',
    type: 'Planetary Nebula',
    distance: '650 light-years',
    size: '2.5 light-years',
    constellation: 'Aquarius',
    description: 'The "Eye of God." A dying star\'s outer layers expelled into space, glowing with eerie beauty.',
    colors: ['#E7C1B1', '#FF8866', '#4488FF', '#2233AA'],
    gradient: 'radial-gradient(ellipse at 50% 50%, #FF886644 0%, transparent 30%, #4488FF33 60%, transparent 80%, #0B0B19 100%)',
  },
  {
    name: 'Carina Nebula',
    id: 'carina',
    type: 'Emission Nebula',
    distance: '7,500 light-years',
    size: '300 light-years',
    constellation: 'Carina',
    description: 'One of the largest and brightest nebulae. Home to the massive and unstable star Eta Carinae.',
    colors: ['#FF3366', '#FF6633', '#FFAA33', '#9933FF'],
    gradient: 'radial-gradient(ellipse at 40% 60%, #FF336644 0%, #FF663333 30%, #FFAA3322 60%, #0B0B19 100%)',
  },
  {
    name: 'Ring Nebula',
    id: 'ring',
    type: 'Planetary Nebula',
    distance: '2,283 light-years',
    size: '1 light-year',
    constellation: 'Lyra',
    description: 'A shell of ionized gas ejected by a dying red giant star, now one of the most studied nebulae.',
    colors: ['#44FFAA', '#22BBFF', '#BB44FF', '#FF44BB'],
    gradient: 'radial-gradient(ellipse at 50% 50%, #0B0B19 0%, #44FFAA33 40%, #22BBFF44 60%, #BB44FF33 80%, #0B0B19 100%)',
  },
]

function NebulaCard({ nebula, isSelected, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer rounded-2xl overflow-hidden transition-all ${
        isSelected ? 'ring-2 ring-cosmic-rose' : ''
      }`}
    >
      {/* Simulated nebula visual */}
      <div
        className="h-36 relative overflow-hidden"
        style={{ background: nebula.gradient }}
      >
        {/* Animated particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: nebula.colors[i % nebula.colors.length],
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}

        {/* Type badge */}
        <div className="absolute top-2 left-2 glass px-2 py-1 rounded-lg">
          <span className="text-xs text-purple-300">{nebula.type}</span>
        </div>
      </div>

      <div className="glass p-4">
        <h3 className="font-bold text-cosmic-stardust text-sm">{nebula.name}</h3>
        <p className="text-purple-400 text-xs mt-1">{nebula.distance}</p>
      </div>
    </motion.div>
  )
}

export default function NebulaSection({ t }) {
  const [selected, setSelected] = useState(NEBULAE[0])

  return (
    <section id="nebulae" className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">🌌</div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.sections.nebulae}</h2>
          <p className="text-purple-400">The universe's most breathtaking nurseries and graveyards</p>
        </motion.div>

        {/* Featured nebula */}
        <motion.div
          key={selected.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-3xl mb-8 overflow-hidden"
        >
          <div
            className="h-64 relative flex items-end"
            style={{ background: selected.gradient }}
          >
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 1,
                  height: Math.random() * 4 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: selected.colors[i % selected.colors.length],
                  filter: 'blur(1px)',
                }}
                animate={{ opacity: [0.1, 0.8, 0.1] }}
                transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 4 }}
              />
            ))}
            <div className="relative z-10 p-8 w-full" style={{ background: 'linear-gradient(transparent, rgba(11,11,25,0.9))' }}>
              <h3 className="text-3xl font-bold text-white mb-1">{selected.name}</h3>
              <div className="flex gap-4 text-sm text-purple-300">
                <span>📍 {selected.constellation}</span>
                <span>📏 {selected.size}</span>
                <span>🔭 {selected.distance}</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-purple-200 leading-relaxed">{selected.description}</p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {NEBULAE.map(nebula => (
            <NebulaCard
              key={nebula.id}
              nebula={nebula}
              isSelected={selected.id === nebula.id}
              onClick={() => setSelected(nebula)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
