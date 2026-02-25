// components/ChatSection.jsx — AI Cosmic Guide Chat UI
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatSection({ t, language }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: t.greeting + '\n\n' + '✨ I am your Cosmic Guide — ask me anything about stars, planets, black holes, the universe, or any celestial wonder that moves your soul.',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input.trim(), timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const apiMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, language }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.reply,
          timestamp: new Date(),
        }])
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '⚠️ ' + (data.error || 'The cosmic signal was lost. Please try again.'),
          timestamp: new Date(),
          isError: true,
        }])
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Connection to the cosmos lost. Please check your connection and try again.',
        timestamp: new Date(),
        isError: true,
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickPrompts = [
    '🌌 What is a black hole?',
    '🌙 Explain moon phases',
    '⭐ Tell me about Orion',
    '🪐 Facts about Saturn',
    '🚀 Latest space missions',
  ]

  return (
    <section id="chat" className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">🤖</div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{t.chatTitle}</h2>
          <p className="text-purple-400">{t.chatSubtitle}</p>
        </motion.div>

        {/* Chat container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl overflow-hidden neon-border"
          style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}
        >
          {/* Chat header */}
          <div className="flex items-center gap-3 p-5 border-b border-purple-900/30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="text-2xl"
            >
              🌌
            </motion.div>
            <div>
              <div className="font-semibold text-cosmic-stardust">{t.chatTitle}</div>
              <div className="text-xs text-purple-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse" />
                Online · Cosmic Mode Active
              </div>
            </div>
            <div className="ml-auto text-xs text-purple-500 font-mono">
              llama3-70b · groq
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ maxHeight: '400px' }}>
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                    msg.role === 'user'
                      ? 'chat-bubble-user text-cosmic-stardust'
                      : msg.isError
                      ? 'bg-red-900/30 border border-red-500/30 text-red-300'
                      : 'chat-bubble-ai text-cosmic-stardust'
                  }`}>
                    {msg.role === 'assistant' && !msg.isError && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">✨</span>
                        <span className="text-xs text-cosmic-rose font-semibold">Cosmic Guide</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    <div className="text-right mt-2">
                      <span className="text-xs text-purple-500/50">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="chat-bubble-ai rounded-2xl px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">✨</span>
                    <span className="text-xs text-cosmic-rose font-semibold">{t.thinking}</span>
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-5 py-2 border-t border-purple-900/20 flex gap-2 overflow-x-auto">
            {quickPrompts.map((prompt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setInput(prompt.slice(2)); inputRef.current?.focus() }}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-purple-800/50 text-purple-400 hover:text-cosmic-rose hover:border-cosmic-rose/50 transition-colors"
              >
                {prompt}
              </motion.button>
            ))}
          </div>

          {/* Input area */}
          <div className="p-5 border-t border-purple-900/30">
            <div className="flex gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={t.chatPlaceholder}
                rows={1}
                className="flex-1 bg-purple-950/40 border border-purple-800/40 rounded-xl px-4 py-3 text-sm text-cosmic-stardust placeholder-purple-500/50 focus:outline-none focus:border-purple-500/70 resize-none"
                style={{ minHeight: '48px', maxHeight: '120px' }}
                onInput={e => {
                  e.target.style.height = 'auto'
                  e.target.style.height = e.target.scrollHeight + 'px'
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(185, 128, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-6 py-3 rounded-xl font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                style={{ background: 'linear-gradient(135deg, #6B21A8, #2D1B69)' }}
              >
                {loading ? '⏳' : t.send}
              </motion.button>
            </div>
            <p className="text-xs text-purple-600/50 mt-2 text-center">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
