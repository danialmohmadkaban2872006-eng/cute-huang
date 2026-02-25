// components/CosmicTimelineSection.jsx — History of the Universe
import { motion } from 'framer-motion'

const EVENTS = [
  { time: 'T = 0', ago: '13.8 Billion Years Ago', name: 'The Big Bang', icon: '💥', desc: 'The universe begins as an infinitely hot, dense singularity. All space, time, matter, and energy explode into existence. The laws of physics are born.' },
  { time: 'T + 380,000 yrs', ago: '', name: 'Cosmic Microwave Background', icon: '🌡️', desc: 'The universe cools enough for electrons and protons to combine into hydrogen atoms. The universe becomes transparent. This glow still fills the cosmos today.' },
  { time: 'T + 200M yrs', ago: '', name: 'First Stars (Cosmic Dawn)', icon: '⭐', desc: 'The first generation of massive stars ignites, ending the cosmic "Dark Ages." These Population III stars forged the first heavy elements.' },
  { time: 'T + 1B yrs', ago: '', name: 'First Galaxies Form', icon: '🌌', desc: 'Gravity pulls gas clouds together, and the first galaxies begin to form. Ancient quasars blaze at galactic centers, powered by supermassive black holes.' },
  { time: 'T + 9.2B yrs', ago: '4.6 Billion Years Ago', name: 'Solar System Forms', icon: '☀️', desc: 'A cloud of gas and dust collapses. The Sun ignites. Rocky planets — including Earth — coalesce from the remaining disk of material.' },
  { time: 'T + 9.6B yrs', ago: '4.1 Billion Years Ago', name: 'Life Begins on Earth', icon: '🧬', desc: 'The first self-replicating molecules appear in Earth\'s primordial oceans. Life finds a way in the cosmic sea.' },
  { time: 'T + 13.6B yrs', ago: '200,000 Years Ago', name: 'Homo Sapiens Emerge', icon: '🧠', desc: 'The first anatomically modern humans appear in Africa. Creatures of stardust who would learn to look back at the stars and wonder.' },
  { time: 'T + 13.8B yrs', ago: '1969 CE', name: 'Humans Reach the Moon', icon: '🚀', desc: 'Apollo 11 lands on the Moon. Humanity takes its first steps on another world. The cosmos watches as stardust returns to the stars.' },
  { time: 'T + 13.8B yrs', ago: 'Today', name: 'You Are Here', icon: '💫', desc: 'Huang explores the cosmos from her personal cosmic engine. Each atom in her body was forged in a dying star. She is the universe discovering itself.', highlight: true },
]

export default function CosmicTimelineSection({ t }) {
  return (
    <section id="cosmic-timeline" className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-5xl mb-4">⏳</div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.sections.cosmicTimeline}</h2>
          <p className="text-purple-400">13.8 billion years of cosmic history — compressed into a single scroll</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cosmic-rose via-purple-600 to-transparent" />

          <div className="space-y-12">
            {EVENTS.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className={`flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-14 md:pl-0`}>
                  <div
                    className={`rounded-2xl p-5 ${
                      event.highlight
                        ? 'neon-border glass'
                        : 'glass opacity-90 hover:opacity-100'
                    } transition-all`}
                  >
                    <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="font-mono text-xs text-cosmic-rose">{event.time}</span>
                      {event.ago && <span className="text-purple-500 text-xs">· {event.ago}</span>}
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${event.highlight ? 'gradient-text' : 'text-cosmic-stardust'}`}>
                      {event.icon} {event.name}
                    </h3>
                    <p className="text-purple-200 text-sm leading-relaxed">{event.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="shrink-0 relative z-10 md:flex md:justify-center hidden md:block" style={{ width: '2rem' }}>
                  <motion.div
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    className={`w-5 h-5 rounded-full border-2 ${
                      event.highlight
                        ? 'border-cosmic-rose bg-cosmic-rose neon-border'
                        : 'border-purple-500 bg-cosmic-bg'
                    }`}
                  />
                </div>

                {/* Empty side on desktop */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20 glass-rose rounded-3xl p-8"
        >
          <p className="text-2xl text-cosmic-rose font-light italic mb-4">
            "We are a way for the cosmos to know itself."
          </p>
          <p className="text-purple-400 text-sm">— Carl Sagan</p>
        </motion.div>
      </div>
    </section>
  )
}
