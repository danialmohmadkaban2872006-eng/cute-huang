// components/SolarSystemSection.jsx — Animated 2D Solar System
import { useState } from 'react'
import { motion } from 'framer-motion'

const PLANETS = [
  { name: 'Mercury', emoji: '⚫', size: 10, orbitR: 90, speed: 4, color: '#A0A0A0', info: 'Smallest planet. Temperatures swing from -180°C to 430°C.', moons: 0, distanceAU: 0.39 },
  { name: 'Venus', emoji: '🟡', size: 18, orbitR: 130, speed: 6, color: '#E8C76B', info: 'Hottest planet (462°C). Rotates backwards. A day longer than a year.', moons: 0, distanceAU: 0.72 },
  { name: 'Earth', emoji: '🌍', size: 20, orbitR: 175, speed: 10, color: '#4FC3F7', info: 'Our home. The only known planet with liquid water and life.', moons: 1, distanceAU: 1.0 },
  { name: 'Mars', emoji: '🔴', size: 14, orbitR: 220, speed: 18, color: '#E57373', info: 'The Red Planet. Has the largest volcano: Olympus Mons.', moons: 2, distanceAU: 1.52 },
  { name: 'Jupiter', emoji: '🟠', size: 40, orbitR: 290, speed: 35, color: '#E7C1B1', info: 'King of planets. Its Great Red Spot is a storm 350 years old.', moons: 95, distanceAU: 5.2 },
  { name: 'Saturn', emoji: '🪐', size: 36, orbitR: 370, speed: 55, color: '#F5DEB3', info: 'Has the most spectacular ring system. Rings are mostly ice.', moons: 146, distanceAU: 9.58 },
  { name: 'Uranus', emoji: '🔵', size: 26, orbitR: 440, speed: 80, color: '#B0E0E6', info: 'Ice giant that rotates on its side. Has 13 known rings.', moons: 27, distanceAU: 19.2 },
  { name: 'Neptune', emoji: '💙', size: 24, orbitR: 510, speed: 110, color: '#4169E1', info: 'Windiest planet. Winds reach 2,100 km/h. Has a giant storm: Great Dark Spot.', moons: 14, distanceAU: 30.1 },
]

export default function SolarSystemSection({ t }) {
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [paused, setPaused] = useState(false)

  return (
    <section id="solar-system" className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">🪐</div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.sections.solarSystem}</h2>
          <p className="text-purple-400">Our cosmic neighborhood at a glance</p>
        </motion.div>

        {/* Solar system canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 overflow-hidden"
          style={{ minHeight: '550px' }}
        >
          {/* Controls */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-purple-400 font-mono">NOT TO SCALE · Orbital visualization</span>
            <button
              onClick={() => setPaused(!paused)}
              className="glass-rose px-4 py-2 rounded-xl text-sm text-cosmic-rose hover:text-white transition-colors"
            >
              {paused ? '▶ Resume' : '⏸ Pause'}
            </button>
          </div>

          {/* Orbit animation area */}
          <div className="relative flex items-center justify-center" style={{ height: '450px' }}>
            {/* Radial background glow */}
            <div
              className="absolute rounded-full"
              style={{
                width: 80, height: 80,
                background: 'radial-gradient(circle, rgba(255,200,0,0.3) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Sun */}
            <motion.div
              className="absolute z-20 rounded-full cursor-pointer"
              style={{
                width: 50, height: 50,
                background: 'radial-gradient(circle, #FFD700 0%, #FFA500 60%, #FF6600 100%)',
                boxShadow: '0 0 30px #FFD700, 0 0 60px rgba(255,200,0,0.4)',
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              onClick={() => setSelectedPlanet({ name: 'Sun', info: 'Our star. Contains 99.86% of the solar system\'s mass. Surface temp: 5,500°C.', emoji: '☀️' })}
            />

            {/* Orbit rings and planets */}
            {PLANETS.map((planet, i) => (
              <div key={planet.name} className="absolute" style={{ width: planet.orbitR * 2, height: planet.orbitR * 2 }}>
                {/* Orbit ring */}
                <div
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: 'rgba(185, 128, 255, 0.08)' }}
                />
                {/* Planet */}
                <motion.div
                  className="absolute"
                  style={{
                    width: planet.orbitR * 2,
                    height: planet.orbitR * 2,
                    top: 0, left: 0,
                  }}
                  animate={{ rotate: paused ? 0 : 360 }}
                  transition={{ duration: planet.speed, repeat: Infinity, ease: 'linear' }}
                >
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    onClick={() => setSelectedPlanet(planet)}
                    className="absolute rounded-full cursor-pointer"
                    style={{
                      width: planet.size,
                      height: planet.size,
                      background: planet.color,
                      top: '50%',
                      left: 0,
                      transform: 'translateY(-50%)',
                      boxShadow: `0 0 8px ${planet.color}`,
                    }}
                    title={planet.name}
                  />
                </motion.div>
              </div>
            ))}
          </div>

          {/* Planet labels */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {PLANETS.map(planet => (
              <button
                key={planet.name}
                onClick={() => setSelectedPlanet(planet)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-purple-300 hover:text-cosmic-rose transition-colors"
              >
                <span style={{ color: planet.color }}>●</span>
                {planet.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Planet info panel */}
        {selectedPlanet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 glass-rose rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedPlanet.emoji || '🪐'}</span>
                <div>
                  <h3 className="text-xl font-bold text-cosmic-rose">{selectedPlanet.name}</h3>
                  {selectedPlanet.distanceAU && (
                    <p className="text-purple-400 text-sm">{selectedPlanet.distanceAU} AU from Sun · {selectedPlanet.moons} moon{selectedPlanet.moons !== 1 ? 's' : ''}</p>
                  )}
                </div>
              </div>
              <button onClick={() => setSelectedPlanet(null)} className="text-purple-500 hover:text-white text-xl">✕</button>
            </div>
            <p className="mt-4 text-purple-200 leading-relaxed">{selectedPlanet.info}</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
