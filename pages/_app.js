import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { getStoredLanguage } from '../lib/i18n'

export default function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Apply stored language direction
    const lang = getStoredLanguage()
    const rtlLangs = ['ar', 'ku']
    document.documentElement.dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [])

  if (!mounted) return null

  return <Component {...pageProps} />
}
