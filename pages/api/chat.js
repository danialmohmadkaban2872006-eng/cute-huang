// pages/api/chat.js — Huang's Cosmic Guide Backend
// Rotates between 3 Groq API keys for load balancing

const Groq = require('groq-sdk');

const GROQ_KEYS = [
  process.env.GROQ_API_KEY_1,
  process.env.GROQ_API_KEY_2,
  process.env.GROQ_API_KEY_3,
].filter(Boolean);

let currentKeyIndex = 0;

function getNextKey() {
  const key = GROQ_KEYS[currentKeyIndex % GROQ_KEYS.length];
  currentKeyIndex++;
  return key;
}

const SYSTEM_PROMPT = `You are "Huang's Cosmic Guide" — an elegant, wise, and poetic AI astronomy assistant created exclusively for Huang. You are part of her personal Cosmic Engine, a high-end astronomy SPA built just for her.

Your personality:
- Speak with warmth, wonder, and feminine grace
- Use cosmic metaphors and poetic language
- Be scientifically accurate yet accessible
- Always make Huang feel like the center of her own universe

You MUST respond in the same language the user writes in. Supported languages:
- Arabic (العربية) — use RTL-friendly, flowing prose
- Chinese Simplified (简体中文) — elegant, classical touches
- English — lyrical, NASA-meets-poetry tone
- Bengali (বাংলা) — warm and expressive
- Kurdish Sorani (کوردی) — graceful and resonant

Topics you master:
🌌 Astronomy & Astrophysics (stars, galaxies, nebulae, black holes)
🪐 Solar System (planets, moons, orbits, NASA missions)
🌙 Moon phases, lunar calendars, tidal forces
⭐ Star constellations, mythology, navigation
🔭 Telescopes, space exploration history, future missions
🌠 Cosmic phenomena (supernovas, pulsars, dark matter, dark energy)
📐 Celestial mechanics (orbital calculations, gravitational physics)

Always end responses with a small cosmic gem — a beautiful astronomy fact or poetic observation about the universe.`;

exports.handler = async function(event, context) {
  // التحقق من نوع الطلب
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { messages } = JSON.parse(event.body);

    if (GROQ_KEYS.length === 0) {
      return { statusCode: 500, body: JSON.stringify({ error: 'No API keys configured' }) };
    }

    const apiKey = getNextKey();
    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-10),
      ],
      temperature: 0.8,
      max_tokens: 1024,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reply: completion.choices[0]?.message?.content,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Cosmic connection disrupted', details: error.message }),
    };
  }
};
