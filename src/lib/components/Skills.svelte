<script>
  import { skills } from '$lib/data.js';
  import { onMount } from 'svelte';

  let sectionEl;
  let animated = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          animated = true;
        }
      }),
      { threshold: 0.2 }
    );
    sectionEl.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
</script>

<section id="skills" bind:this={sectionEl} class="py-20 md:py-28 bg-ink-900/30 border-y border-white/5" aria-label="Skills">
  <div class="max-w-6xl mx-auto px-5 sm:px-6">
    <div class="section-reveal mb-10 md:mb-16">
      <p class="font-mono text-xs text-accent/60 tracking-widest uppercase mb-4">Expertise</p>
      <h2 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
        Skills &<br /><span class="text-gradient">tools.</span>
      </h2>
    </div>

    <div class="section-reveal grid md:grid-cols-2 gap-x-16 gap-y-6" style="transition-delay: 150ms">
      {#each skills as skill, i}
        <div class="group">
          <div class="flex justify-between items-baseline mb-2">
            <span class="font-mono text-sm text-white/70 group-hover:text-accent transition-colors duration-300">
              {skill.name}
            </span>
            <span class="font-mono text-xs text-white/30">{skill.level}%</span>
          </div>
          <div class="h-1 bg-ink-600/70 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-1000 ease-out"
              style="
                background: linear-gradient(90deg, #7FFFD4, #5CE8B8);
                width: {animated ? skill.level : 0}%;
                transition-delay: {i * 60}ms;
              "
              role="meter"
              aria-valuenow={skill.level}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="{skill.name} proficiency: {skill.level}%"
            ></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
