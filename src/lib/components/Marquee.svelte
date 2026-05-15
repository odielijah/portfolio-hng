<script>
  import { techMarquee } from '$lib/data.js';
  const doubled = [...techMarquee, ...techMarquee];
</script>

<div class="relative overflow-hidden py-6 border-y border-white/5" aria-hidden="true">
  <!-- Fade edges -->
  <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ink-950 to-transparent z-10 pointer-events-none"></div>
  <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ink-950 to-transparent z-10 pointer-events-none"></div>

  <div class="flex animate-marquee" style="width: max-content;">
    {#each doubled as tech}
      <span class="mx-6 font-mono text-xs text-white/20 tracking-widest uppercase whitespace-nowrap">
        {tech}
      </span>
    {/each}
  </div>
</div>
