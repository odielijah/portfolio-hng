<script>
  import { onMount } from 'svelte';

  let sectionEl;
  let form = { name: '', email: '', message: '' };
  let status = ''; // 'sending' | 'sent' | 'error'

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    sectionEl.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) return;
    status = 'sending';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      status = res.ok ? 'sent' : 'error';
      if (res.ok) form = { name: '', email: '', message: '' };
    } catch {
      status = 'error';
    }
  }

  function sanitize(str) {
    return str.replace(/[<>"'&]/g, '');
  }

  $: form.name = sanitize(form.name);
  $: form.message = sanitize(form.message);
</script>

<section id="contact" bind:this={sectionEl} class="py-28 max-w-6xl mx-auto px-6" aria-label="Contact">
  <div class="grid md:grid-cols-2 gap-16 items-start">
    <!-- Left copy -->
    <div class="section-reveal">
      <p class="font-mono text-xs text-accent/60 tracking-widest uppercase mb-4">Get in Touch</p>
      <h2 class="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
        Let's build<br />something<br /><span class="text-gradient">great.</span>
      </h2>
      <p class="text-white/50 text-sm leading-relaxed mb-8">
        Open to frontend engineering roles, freelance projects, and interesting collaborations. Based in Lagos — available remotely too.
      </p>

      <!-- Contact links -->
      <div class="space-y-4">
        {#each [
          { icon: '✉️', label: 'Email', value: 'odinaka@example.com', href: 'mailto:odinaka@example.com' },
          { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/odinaka', href: 'https://linkedin.com/in/odinaka' },
          { icon: '🐙', label: 'GitHub', value: 'github.com/odinaka', href: 'https://github.com/odinaka' },
        ] as contact}
          <a
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : undefined}
            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            class="flex items-center gap-4 group"
          >
            <span class="text-xl" aria-hidden="true">{contact.icon}</span>
            <div>
              <p class="font-mono text-[10px] text-white/30 tracking-wider uppercase">{contact.label}</p>
              <p class="font-body text-sm text-white/60 group-hover:text-accent transition-colors duration-300">{contact.value}</p>
            </div>
          </a>
        {/each}
      </div>
    </div>

    <!-- Form -->
    <div class="section-reveal" style="transition-delay: 200ms">
      {#if status === 'sent'}
        <div class="h-full flex flex-col items-center justify-center text-center py-16 gap-4 rounded-2xl border border-accent/20 bg-accent/5">
          <span class="text-4xl">🎉</span>
          <p class="font-display text-xl font-bold text-white">Message sent!</p>
          <p class="text-white/50 text-sm">I'll get back to you soon.</p>
          <button on:click={() => status = ''} class="font-mono text-xs text-accent/60 hover:text-accent transition-colors">Send another →</button>
        </div>
      {:else}
        <form
          on:submit|preventDefault={handleSubmit}
          class="space-y-4"
          novalidate
        >
          <div>
            <label for="contact-name" class="block font-mono text-[10px] text-white/40 tracking-widest uppercase mb-2">Name</label>
            <input
              id="contact-name"
              bind:value={form.name}
              type="text"
              required
              autocomplete="name"
              placeholder="Your name"
              class="w-full bg-ink-800/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 font-body outline-none focus:border-accent/40 transition-colors duration-300"
            />
          </div>

          <div>
            <label for="contact-email" class="block font-mono text-[10px] text-white/40 tracking-widest uppercase mb-2">Email</label>
            <input
              id="contact-email"
              bind:value={form.email}
              type="email"
              required
              autocomplete="email"
              placeholder="your@email.com"
              class="w-full bg-ink-800/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 font-body outline-none focus:border-accent/40 transition-colors duration-300"
            />
          </div>

          <div>
            <label for="contact-message" class="block font-mono text-[10px] text-white/40 tracking-widest uppercase mb-2">Message</label>
            <textarea
              id="contact-message"
              bind:value={form.message}
              rows="5"
              required
              placeholder="Tell me about your project or opportunity..."
              class="w-full bg-ink-800/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 font-body outline-none focus:border-accent/40 transition-colors duration-300 resize-none"
            ></textarea>
          </div>

          {#if status === 'error'}
            <p class="text-red-400 text-xs font-mono" role="alert">Something went wrong. Try emailing me directly.</p>
          {/if}

          <button
            type="submit"
            disabled={status === 'sending' || !form.name || !form.email || !form.message}
            class="w-full py-3.5 rounded-xl font-display font-bold text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style="background: linear-gradient(135deg, #7FFFD4, #5CE8B8); color: #080910;"
          >
            {status === 'sending' ? 'Sending...' : 'Send message →'}
          </button>
        </form>
      {/if}
    </div>
  </div>
</section>
