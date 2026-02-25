// pages/index.js — Huang's Cosmic Engine Main Page
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'

import LanguageGate from '../components/LanguageGate'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import ChatSection from '../components/ChatSection'
import SolarSystemSection from '../components/SolarSystemSection'
import ConstellationsSection from '../components/ConstellationsSection'
import BlackHoleSection from '../components/BlackHoleSection'
import MoonPhasesSection from '../components/MoonPhasesSection'
import CelestialEngineSection from '../components/CelestialEngineSection'
import NebulaSection from '../components/NebulaSection'
import CosmicTimelineSection from '../components/CosmicTimelineSection'
import SpaceExplorationSection from '../components/SpaceExplorationSection'
import StarMapSection from '../components/StarMapSection'
import Footer from '../components/Footer'

import { LANGUAGES, STORAGE_KEY, setStoredLanguage, getStoredLanguage } from '../lib/i18n'

export default function Home() {
  const [language, setLanguage] = useState(null) // null = show gate
  const [showGate, setShowGate] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = getStoredLanguage()
    if (stored && LANGUAGES[stored]) {
      setLanguage(stored)
      setShowGate(false)
    }
  }, [])

  const handleLanguageSelect = (code) => {
    setStoredLanguage(code)
    setLanguage(code)

    // Apply RTL
    const rtlLangs = ['ar', 'ku']
    document.documentElement.dir = rtlLangs.includes(code) ? 'rtl' : 'ltr'
    document.documentElement.lang = code

    // Animate gate away
    setTimeout(() => setShowGate(false), 500)
  }

  const handleChangeLang = () => {
    setShowGate(true)
  }

  if (!mounted) return null

  const t = language ? LANGUAGES[language] : LANGUAGES['en']
  const isRTL = ['ar', 'ku'].includes(language)

  return (
    <>
      <Head>
        <title>Huang's Cosmic Engine — Personal Astronomy AI</title>
        <meta name="description" content="Huang's personal cosmic engine — an astronomy AI system with solar system, star maps, black hole visualizer, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌌</text></svg>" />
      </Head>

      {/* Language Gate Overlay */}
      <AnimatePresence>
        {showGate && (
          <LanguageGate onSelect={handleLanguageSelect} />
        )}
      </AnimatePresence>

      {/* Main App — only render after language selected */}
      <AnimatePresence>
        {!showGate && language && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            dir={isRTL ? 'rtl' : 'ltr'}
            className="min-h-screen"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, #1A0A2E 0%, #0B0B19 50%)' }}
          >
            {/* Navigation */}
            <Navigation
              t={t}
              currentLang={language}
              onChangeLang={handleChangeLang}
            />

            {/* Section 0: Hero */}
            <HeroSection t={t} />

            {/* Section divider */}
            <SectionDivider />

            {/* Section 1: AI Chat */}
            <ChatSection t={t} language={language} />

            <SectionDivider />

            {/* Section 2: Solar System */}
            <SolarSystemSection t={t} />

            <SectionDivider />

            {/* Section 3: Constellations */}
            <ConstellationsSection t={t} />

            <SectionDivider />

            {/* Section 4: Black Hole */}
            <BlackHoleSection t={t} />

            <SectionDivider />

            {/* Section 5: Moon Phases */}
            <MoonPhasesSection t={t} />

            <SectionDivider />

            {/* Section 6: Celestial Engine (Code) */}
            <CelestialEngineSection t={t} />

            <SectionDivider />

            {/* Section 7: Nebulae */}
            <NebulaSection t={t} />

            <SectionDivider />

            {/* Section 8: Cosmic Timeline */}
            <CosmicTimelineSection t={t} />

            <SectionDivider />

            {/* Section 9: Space Exploration */}
            <SpaceExplorationSection t={t} />

            <SectionDivider />

            {/* Section 10: Star Map */}
            <StarMapSection t={t} />

            {/* Footer */}
            <Footer t={t} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="h-px bg-gradient-to-r from-transparent via-purple-900/40 to-transparent" />
    </div>
  )
}
