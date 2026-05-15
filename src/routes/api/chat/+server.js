import { json } from '@sveltejs/kit';

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

export async function POST({ request, fetch }) {
  const { message, history } = await request.json();

  if (!message || message.length > 500) {
    return json({ reply: "Please send a valid message." }, { status: 400 });
  }

  const messages = [
    ...history
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .slice(-6)
      .map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: message },
  ];

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    const reply = data.content?.[0]?.text ?? "I'm not sure about that one!";
    return json({ reply });
  } catch (e) {
    return json({ reply: "Sorry, I ran into an issue. Please try again!" }, { status: 500 });
  }
}
