<script>
  import { onMount } from 'svelte';
  let sectionEl;

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
</script>

<section id="about" bind:this={sectionEl} class="py-20 md:py-28 max-w-6xl mx-auto px-5 sm:px-6" aria-label="About">
  <div class="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
    <!-- Text -->
    <div class="section-reveal">
      <p class="font-mono text-xs text-accent/60 tracking-widest uppercase mb-4">About Me</p>
      <h2 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
        Developer<br />by trade,<br /><span class="text-gradient">builder</span> by nature.
      </h2>
      <div class="space-y-4 text-white/55 leading-relaxed text-sm md:text-base">
        <p>
          I'm <strong class="text-white font-medium">Odinaka Esther Elijah</strong> — a frontend developer based in Lagos, Nigeria. I build interfaces that feel alive: fast, animated, and crafted with care.
        </p>
        <p>
          Currently interning at <strong class="text-accent font-medium">Hadiel Health Technologies</strong> where I'm building a Next.js admin dashboard, and concurrently sharpening my skills through the HNG Frontend Wizards program.
        </p>
        <p>
          When I'm not writing code, I'm running <em class="text-white/70 not-italic">Shades of Everything Nice</em> — my own accessories brand — because I believe the same design thinking that makes good UI makes good products.
        </p>
      </div>
    </div>

    <!-- Facts grid -->
    <div class="section-reveal grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" style="transition-delay: 200ms">
      {#each [
        { label: 'Current role', value: 'Frontend Intern', sub: 'Hadiel Health Tech' },
        { label: 'Location', value: 'Lagos, NG', sub: 'Lekki Phase 1' },
        { label: 'Stack', value: 'React + TS', sub: 'Next.js · Svelte' },
        { label: 'Also doing', value: 'SoEN Brand', sub: 'Accessories & eyewear' },
      ] as fact}
        <div class="p-5 rounded-xl bg-ink-800/40 border border-white/5 hover:border-accent/20 transition-colors duration-300">
          <p class="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-2">{fact.label}</p>
          <p class="font-display font-bold text-white text-base">{fact.value}</p>
          <p class="font-body text-xs text-white/40 mt-0.5">{fact.sub}</p>
        </div>
      {/each}

      <!-- Fun callout spanning full width -->
      <div class="sm:col-span-2 p-5 rounded-xl border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors duration-300">
        <p class="font-mono text-[10px] text-accent/60 tracking-widest uppercase mb-1">Currently Learning</p>
        <p class="font-display font-semibold text-white text-sm">SvelteKit · Spanish · Business Dev</p>
      </div>
    </div>
  </div>
</section>
