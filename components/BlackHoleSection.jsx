// components/BlackHoleSection.jsx — Black Hole Visualizer
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function BlackHoleSection({ t }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const [info, setInfo] = useState('event-horizon')

  const infoCards = {
    'event-horizon': {
      title: 'Event Horizon',
      icon: '⚫',
      text: 'The point of no return. Once crossed, nothing — not even light — can escape the black hole\'s gravity. The radius is called the Schwarzschild radius.',
      formula: 'r_s = 2GM/c²',
    },
    'accretion': {
      title: 'Accretion Disk',
      icon: '🌀',
      text: 'Superheated gas and matter spiral into the black hole, forming a glowing disk. Temperatures can reach millions of degrees, emitting X-rays.',
      formula: 'T ≈ (3GM·Ṁ/8πσr³)^(1/4)',
    },
    'singularity': {
      title: 'Singularity',
      icon: '∞',
      text: 'The theoretical center of a black hole where density becomes infinite and spacetime curvature is extreme. The laws of physics break down here.',
      formula: 'ρ → ∞, V → 0',
    },
    'jets': {
      title: 'Relativistic Jets',
      icon: '⚡',
      text: 'Some black holes launch jets of plasma at near-light speed perpendicular to the accretion disk. These can stretch across millions of light-years.',
      formula: 'v ≈ 0.999c',
    },
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let angle = 0
    let frame = 0

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const cx = W / 2
      const cy = H / 2

      ctx.fillStyle = 'rgba(11, 11, 25, 0.15)'
      ctx.fillRect(0, 0, W, H)

      // Accretion disk rings
      const diskColors = [
        { r: 120, color: 'rgba(255, 100, 0, 0.6)', width: 12 },
        { r: 140, color: 'rgba(255, 150, 0, 0.4)', width: 8 },
        { r: 160, color: 'rgba(255, 200, 100, 0.3)', width: 6 },
        { r: 180, color: 'rgba(200, 150, 255, 0.2)', width: 4 },
        { r: 200, color: 'rgba(150, 100, 255, 0.15)', width: 3 },
      ]

      diskColors.forEach(disk => {
        const gradient = ctx.createLinearGradient(cx - disk.r, cy, cx + disk.r, cy)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(0.3, disk.color)
        gradient.addColorStop(0.5, disk.color.replace(/[\d.]+\)$/, '0.8)'))
        gradient.addColorStop(0.7, disk.color)
        gradient.addColorStop(1, 'transparent')

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(angle * 0.3)
        ctx.scale(1, 0.25)
        ctx.beginPath()
        ctx.arc(0, 0, disk.r, 0, Math.PI * 2)
        ctx.strokeStyle = gradient
        ctx.lineWidth = disk.width
        ctx.stroke()
        ctx.restore()
      })

      // Lensing light arcs
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        const x = cx + Math.cos(a + angle * 0.1) * 95
        const y = cy + Math.sin(a + angle * 0.1) * 95 * 0.3
        const brightness = (Math.sin(a * 3 + frame * 0.05) + 1) * 0.5
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(185, 128, 255, ${brightness * 0.8})`
        ctx.fill()
      }

      // Black hole core — event horizon
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 85)
      coreGrad.addColorStop(0, '#000000')
      coreGrad.addColorStop(0.7, '#0A0020')
      coreGrad.addColorStop(0.85, '#1A0050')
      coreGrad.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(cx, cy, 85, 0, Math.PI * 2)
      ctx.fillStyle = coreGrad
      ctx.fill()

      // Photon sphere glow
      ctx.beginPath()
      ctx.arc(cx, cy, 90, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(185, 128, 255, ${0.3 + Math.sin(frame * 0.05) * 0.15})`
      ctx.lineWidth = 2
      ctx.stroke()

      // Inner glow ring
      ctx.beginPath()
      ctx.arc(cx, cy, 75, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(100, 50, 255, ${0.2 + Math.sin(frame * 0.04) * 0.1})`
      ctx.lineWidth = 1
      ctx.stroke()

      // Stars background
      if (frame % 60 === 0) {
        for (let i = 0; i < 3; i++) {
          const x = Math.random() * W
          const y = Math.random() * H
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255,255,255,0.6)'
          ctx.fill()
        }
      }

      angle += 0.008
      frame++
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const selected = infoCards[info]

  return (
    <section id="black-hole" className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">🌑</div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.sections.blackHole}</h2>
          <p className="text-purple-400">Where gravity bends the fabric of spacetime itself</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Canvas visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl overflow-hidden"
          >
            <canvas
              ref={canvasRef}
              width={480}
              height={480}
              className="w-full"
              style={{ background: '#0B0B19' }}
            />
            <div className="p-4 border-t border-purple-900/30">
              <p className="text-xs text-purple-500 text-center font-mono">
                Relativistic simulation · NOT TO SCALE · Schwarzschild Black Hole
              </p>
            </div>
          </motion.div>

          {/* Info cards */}
          <div className="space-y-4">
            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(infoCards).map(key => (
                <button
                  key={key}
                  onClick={() => setInfo(key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    info === key
                      ? 'neon-border glass text-cosmic-rose'
                      : 'glass opacity-60 text-purple-400 hover:opacity-100'
                  }`}
                >
                  {infoCards[key].icon} {infoCards[key].title}
                </button>
              ))}
            </div>

            {/* Selected card */}
            <motion.div
              key={info}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-rose rounded-3xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{selected.icon}</span>
                <h3 className="text-xl font-bold text-cosmic-rose">{selected.title}</h3>
              </div>
              <p className="text-purple-200 leading-relaxed mb-4">{selected.text}</p>
              <div className="bg-purple-950/60 rounded-xl px-4 py-3">
                <p className="text-xs text-purple-400 mb-1 font-mono">FORMULA</p>
                <p className="font-mono text-cosmic-neon text-sm">{selected.formula}</p>
              </div>
            </motion.div>

            {/* Fun facts */}
            <div className="glass rounded-2xl p-5">
              <h4 className="text-cosmic-rose font-semibold mb-3">🌌 Cosmic Facts</h4>
              <ul className="space-y-2 text-sm text-purple-200">
                <li>• Sagittarius A* — our galaxy's central black hole — weighs 4 million solar masses</li>
                <li>• Time dilation near a black hole: 1 hour = 7 Earth years at Gargantua (Interstellar)</li>
                <li>• TON 618 is the largest known black hole: 66 billion solar masses</li>
                <li>• First black hole image captured: M87* in 2019 by Event Horizon Telescope</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
