// components/SpaceExplorationSection.jsx — Space Missions History
import { useState } from 'react'
import { motion } from 'framer-motion'

const MISSIONS = [
  { year: 1957, name: 'Sputnik 1', agency: 'USSR', type: 'Satellite', status: 'Complete', icon: '🛰️', desc: 'First artificial satellite. Shocked the world and started the Space Race.', achievement: 'First human-made object in orbit' },
  { year: 1961, name: 'Vostok 1', agency: 'USSR', type: 'Human Spaceflight', status: 'Complete', icon: '👨‍🚀', desc: 'Yuri Gagarin becomes the first human in space, orbiting Earth once.', achievement: 'First human in space' },
  { year: 1969, name: 'Apollo 11', agency: 'NASA', type: 'Lunar', status: 'Complete', icon: '🌕', desc: 'Neil Armstrong and Buzz Aldrin land on the Moon. "One giant leap for mankind."', achievement: 'First Moon landing' },
  { year: 1977, name: 'Voyager 1 & 2', agency: 'NASA', type: 'Deep Space', status: 'Active', icon: '🚀', desc: 'Twin probes exploring the outer solar system. Voyager 1 is the farthest human-made object.', achievement: 'First craft in interstellar space' },
  { year: 1990, name: 'Hubble Space Telescope', agency: 'NASA/ESA', type: 'Observatory', status: 'Active', icon: '🔭', desc: 'Revolutionized astronomy with stunning deep-field images revealing billions of galaxies.', achievement: 'Deepest views of the universe' },
  { year: 2004, name: 'Mars Rovers (Spirit/Opportunity)', agency: 'NASA', type: 'Mars', status: 'Complete', icon: '🔴', desc: 'Spirit and Opportunity roam Mars. Opportunity travels a marathon (42km) before going silent.', achievement: 'Longest Mars surface mission' },
  { year: 2021, name: 'James Webb Space Telescope', agency: 'NASA/ESA/CSA', type: 'Observatory', status: 'Active', icon: '🌌', desc: 'Most powerful telescope ever built. Peers back 13.6 billion years to the first galaxies.', achievement: 'Earliest universe images ever captured' },
  { year: 2021, name: 'Perseverance & Ingenuity', agency: 'NASA', type: 'Mars', status: 'Active', icon: '🚁', desc: 'Perseverance searches for ancient life on Mars. Ingenuity makes first powered flight on another planet.', achievement: 'First flight on another planet' },
  { year: 2025, name: 'Artemis Program', agency: 'NASA', type: 'Lunar', status: 'Ongoing', icon: '👩‍🚀', desc: 'Return humans to the Moon — including the first woman and first person of color on the lunar surface.', achievement: 'Return to the Moon' },
]

const TYPE_COLORS = {
  'Satellite': '#B980FF',
  'Human Spaceflight': '#E7C1B1',
  'Lunar': '#FFD700',
  'Deep Space': '#4FC3F7',
  'Observatory': '#44BB88',
  'Mars': '#FF7043',
  'Ongoing': '#A5D6A7',
}

const STATUS_STYLES = {
  'Active': 'text-green-400 bg-green-400/10 border-green-400/30',
  'Complete': 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  'Ongoing': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
}

export default function SpaceExplorationSection({ t }) {
  const [filter, setFilter] = useState('All')

  const types = ['All', 'Lunar', 'Mars', 'Observatory', 'Deep Space', 'Human Spaceflight']
  const filtered = filter === 'All' ? MISSIONS : MISSIONS.filter(m => m.type === filter)

  return (
    <section id="space-exploration" className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.sections.spaceExploration}</h2>
          <p className="text-purple-400">Humanity's greatest journeys into the unknown</p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === type
                  ? 'glass neon-border text-cosmic-rose'
                  : 'glass opacity-60 text-purple-400 hover:opacity-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Mission grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((mission, i) => (
            <motion.div
              key={mission.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass rounded-2xl p-5 cursor-default"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{mission.icon}</span>
                  <div>
                    <div className="font-bold text-cosmic-stardust text-sm">{mission.name}</div>
                    <div className="text-purple-400 text-xs">{mission.agency} · {mission.year}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_STYLES[mission.status]}`}>
                  {mission.status}
                </span>
              </div>

              <p className="text-purple-200 text-sm leading-relaxed mb-3">{mission.desc}</p>

              <div className="rounded-xl px-3 py-2" style={{ background: `${TYPE_COLORS[mission.type] || '#B980FF'}15`, borderLeft: `3px solid ${TYPE_COLORS[mission.type] || '#B980FF'}` }}>
                <p className="text-xs" style={{ color: TYPE_COLORS[mission.type] || '#B980FF' }}>
                  🏆 {mission.achievement}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
