// components/StarMapSection.jsx — Interactive Live Star Map
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Notable stars with approximate sky positions (RA/Dec simplified to canvas coords)
const STARS = [
  { name: 'Sirius', x: 0.25, y: 0.55, mag: -1.46, color: '#CAD7FF', constellation: 'Canis Major' },
  { name: 'Canopus', x: 0.20, y: 0.75, mag: -0.74, color: '#AABFFF', constellation: 'Carina' },
  { name: 'Arcturus', x: 0.60, y: 0.25, mag: -0.05, color: '#FFD2A1', constellation: 'Boötes' },
  { name: 'Vega', x: 0.72, y: 0.18, mag: 0.03, color: '#CAD7FF', constellation: 'Lyra' },
  { name: 'Capella', x: 0.35, y: 0.15, mag: 0.08, color: '#FFF4EA', constellation: 'Auriga' },
  { name: 'Rigel', x: 0.28, y: 0.60, mag: 0.13, color: '#AABFFF', constellation: 'Orion' },
  { name: 'Procyon', x: 0.38, y: 0.52, mag: 0.34, color: '#F8F7FF', constellation: 'Canis Minor' },
  { name: 'Betelgeuse', x: 0.30, y: 0.48, mag: 0.42, color: '#FFAD8A', constellation: 'Orion' },
  { name: 'Altair', x: 0.68, y: 0.40, mag: 0.77, color: '#FFF4EA', constellation: 'Aquila' },
  { name: 'Aldebaran', x: 0.22, y: 0.42, mag: 0.85, color: '#FFAD8A', constellation: 'Taurus' },
  { name: 'Antares', x: 0.55, y: 0.70, mag: 1.05, color: '#FFAD8A', constellation: 'Scorpius' },
  { name: 'Spica', x: 0.58, y: 0.58, mag: 1.04, color: '#AABFFF', constellation: 'Virgo' },
  { name: 'Pollux', x: 0.42, y: 0.35, mag: 1.16, color: '#FFD2A1', constellation: 'Gemini' },
  { name: 'Deneb', x: 0.75, y: 0.22, mag: 1.25, color: '#CAD7FF', constellation: 'Cygnus' },
  { name: 'Regulus', x: 0.50, y: 0.38, mag: 1.35, color: '#AABFFF', constellation: 'Leo' },
  { name: 'Castor', x: 0.40, y: 0.32, mag: 1.58, color: '#F8F7FF', constellation: 'Gemini' },
  { name: 'Bellatrix', x: 0.27, y: 0.45, mag: 1.64, color: '#AABFFF', constellation: 'Orion' },
  { name: 'Fomalhaut', x: 0.70, y: 0.78, mag: 1.16, color: '#F8F7FF', constellation: 'Piscis Austrinus' },
  { name: 'Mimosa', x: 0.45, y: 0.85, mag: 1.25, color: '#AABFFF', constellation: 'Crux' },
  { name: 'Adhara', x: 0.32, y: 0.65, mag: 1.50, color: '#CAD7FF', constellation: 'Canis Major' },
]

// Background faint stars
const BG_STARS = Array.from({ length: 200 }).map((_, i) => ({
  x: Math.random(),
  y: Math.random(),
  size: Math.random() * 1.5 + 0.3,
  opacity: Math.random() * 0.6 + 0.1,
  twinkleSpeed: Math.random() * 3 + 2,
  twinkleDelay: Math.random() * 3,
}))

export default function StarMapSection({ t }) {
  const canvasRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animRef = useRef(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      frameRef.current++
      const f = frameRef.current

      // Sky background
      ctx.fillStyle = '#080815'
      ctx.fillRect(0, 0, W, H)

      // Milky Way band
      const mwGrad = ctx.createLinearGradient(0, H * 0.3, W, H * 0.7)
      mwGrad.addColorStop(0, 'transparent')
      mwGrad.addColorStop(0.3, 'rgba(120, 80, 200, 0.06)')
      mwGrad.addColorStop(0.5, 'rgba(150, 100, 220, 0.1)')
      mwGrad.addColorStop(0.7, 'rgba(120, 80, 200, 0.06)')
      mwGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = mwGrad
      ctx.fillRect(0, 0, W, H)

      // Background stars with twinkling
      BG_STARS.forEach(star => {
        const twinkle = Math.sin(f * 0.03 / star.twinkleSpeed + star.twinkleDelay) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(star.x * W, star.y * H, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.fill()
      })

      // Notable stars
      STARS.forEach(star => {
        const px = star.x * W
        const py = star.y * H
        const radius = Math.max(1.5, 4 - star.mag * 1.5)
        const twinkle = Math.sin(f * 0.02 + star.x * 10) * 0.2 + 0.9

        // Glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, radius * 4)
        glow.addColorStop(0, star.color + 'AA')
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(px, py, radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Star core
        ctx.beginPath()
        ctx.arc(px, py, radius * twinkle, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mx = (e.clientX - rect.left) / rect.width
    const my = (e.clientY - rect.top) / rect.height

    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })

    // Find nearest notable star within 30px
    const threshold = 0.04
    const near = STARS.find(s => Math.abs(s.x - mx) < threshold && Math.abs(s.y - my) < threshold)
    setHovered(near || null)
  }

  return (
    <section id="star-map" className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">🗺️</div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.sections.starMap}</h2>
          <p className="text-purple-400">Navigate the night sky — hover over stars to reveal their names</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Star map canvas */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative glass rounded-3xl overflow-hidden neon-border"
            >
              <div className="relative" onMouseMove={handleMouseMove} onMouseLeave={() => setHovered(null)}>
                <canvas
                  ref={canvasRef}
                  width={700}
                  height={500}
                  className="w-full cursor-crosshair"
                />

                {/* Tooltip */}
                {hovered && (
                  <div
                    className="absolute pointer-events-none glass rounded-xl px-3 py-2 text-sm z-20"
                    style={{ left: mousePos.x + 12, top: mousePos.y - 40, minWidth: '140px' }}
                  >
                    <div className="font-bold text-cosmic-rose">{hovered.name}</div>
                    <div className="text-purple-400 text-xs">{hovered.constellation}</div>
                    <div className="text-purple-500 text-xs">Magnitude: {hovered.mag}</div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-purple-900/30 flex items-center justify-between">
                <span className="text-xs text-purple-500 font-mono">
                  Showing {STARS.length} named stars · Move to explore
                </span>
                <div className="flex items-center gap-3 text-xs text-purple-400">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-white inline-block opacity-90" /> Bright</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-white inline-block opacity-50" /> Faint</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Star catalog */}
          <div className="space-y-3">
            <h3 className="text-cosmic-rose font-semibold text-sm mb-4">⭐ BRIGHT STAR CATALOG</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {[...STARS].sort((a, b) => a.mag - b.mag).slice(0, 12).map(star => (
                <motion.div
                  key={star.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass rounded-xl px-4 py-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: star.color, boxShadow: `0 0 4px ${star.color}` }}
                    />
                    <div>
                      <div className="text-sm font-semibold text-cosmic-stardust">{star.name}</div>
                      <div className="text-xs text-purple-500">{star.constellation}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-cosmic-rose font-mono">{star.mag > 0 ? '+' : ''}{star.mag}</div>
                    <div className="text-xs text-purple-600">mag</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Color legend */}
            <div className="glass-rose rounded-xl p-4 mt-4">
              <h4 className="text-xs text-purple-400 font-semibold mb-3">STAR COLOR = TEMPERATURE</h4>
              {[
                { color: '#9BB0FF', label: 'Blue — Hottest (>10,000K)' },
                { color: '#F8F7FF', label: 'White — Hot (7,500-10,000K)' },
                { color: '#FFF4EA', label: 'Yellow — Medium (5,200-7,500K)' },
                { color: '#FFD2A1', label: 'Orange — Cool (3,700-5,200K)' },
                { color: '#FFAD8A', label: 'Red — Coldest (2,400-3,700K)' },
              ].map(item => (
                <div key={item.color} className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: item.color }} />
                  <span className="text-xs text-purple-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
