import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const SYSTEM_PROMPT = `You are a helpful portfolio assistant for Odinaka Esther Elijah (also known as Odi or Esther), a frontend developer based in Lagos, Nigeria.

Key facts about Odi:
- Frontend Developer Intern at Hadiel Health Technologies (health tech startup in Lekki Phase 1, Lagos)
- Also participating in HNG Frontend Wizards internship
- Stack: React, TypeScript, Next.js, Tailwind CSS, Svelte, Framer Motion, Vite, React Native, GSAP
- Notable projects: Hadiel admin dashboard (Next.js 16 + TypeScript), Kino movie app (React + Framer Motion), Invoice Manager (React + TypeScript), MyHealth Medications Screen (React Native)
- Also runs Shades of Everything Nice (SoEN) – a registered accessories/eyewear brand
- Open to frontend engineering roles and freelance projects
- Contact: via the contact form or email

Answer questions about her skills, projects, experience, and availability. Be warm, concise, and helpful. Keep replies under 100 words. Do not make up specific details not listed here.`;

function toGeminiContents(history, message) {
  const contents = [
    ...(history ?? [])
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .slice(-6),
    { role: 'user', content: message },
  ];

  return contents.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
}

function getReply(data) {
  return (
    data?.reply ??
    data?.text ??
    data?.response ??
    data?.message ??
    data?.candidates?.[0]?.content?.parts?.map(part => part.text).filter(Boolean).join('\n') ??
    "I'm not sure about that one!"
  );
}

export async function POST({ request, fetch }) {
  const { message, history } = await request.json();

  if (!message || message.length > 500) {
    return json({ reply: "Please send a valid message." }, { status: 400 });
  }

  if (!env.GEMINI_PROXY_URL) {
    return json(
      { reply: "The chat assistant is not configured yet. Please add your Gemini proxy URL." },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(env.GEMINI_PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: (history ?? []).slice(-6),
        system: SYSTEM_PROMPT,
        contents: toGeminiContents(history, message),
        generationConfig: {
          maxOutputTokens: 256,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) throw new Error(`Gemini proxy error: ${response.status}`);
    const data = await response.json();
    return json({ reply: getReply(data) });
  } catch (e) {
    console.error(e);
    return json({ reply: "Sorry, I ran into an issue. Please try again!" }, { status: 502 });
  }
}
