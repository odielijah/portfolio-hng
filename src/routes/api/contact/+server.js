import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { name, email, message } = await request.json();

  // Basic validation
  if (!name || !email || !message) {
    return json({ error: 'All fields required' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email' }, { status: 400 });
  }

  if (message.length > 2000) {
    return json({ error: 'Message too long' }, { status: 400 });
  }

  // Log to console in development; in production wire up Resend/Nodemailer/Formspree etc.
  console.log('New contact message:', { name, email, message: message.slice(0, 100) });

  // TODO: integrate email service (e.g. Resend)
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: '...', to: 'your@email.com', subject: `Portfolio message from ${name}`, text: message });

  return json({ success: true });
}
