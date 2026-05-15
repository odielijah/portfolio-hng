<script>
  import { projects } from '$lib/data.js';
  import { onMount } from 'svelte';

  let activeFilter = 'All';
  let filters = ['All', 'Web App', 'Mobile', 'Business'];
  let selectedProject = null;
  let sectionEl;

  $: filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

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

  function openModal(project) { selectedProject = project; }
  function closeModal() { selectedProject = null; }

  function handleKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<section id="projects" bind:this={sectionEl} class="py-28 max-w-6xl mx-auto px-6" aria-label="Projects">
  <!-- Header -->
  <div class="section-reveal mb-16">
    <p class="font-mono text-xs text-accent/60 tracking-widest uppercase mb-4">Selected Work</p>
    <h2 class="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
      Things I've<br /><span class="text-gradient">built.</span>
    </h2>
  </div>

  <!-- Filter tabs -->
  <div class="section-reveal mb-12 flex flex-wrap gap-2" role="tablist" aria-label="Project filters">
    {#each filters as f}
      <button
        role="tab"
        aria-selected={activeFilter === f}
        class="px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300"
        class:bg-accent={activeFilter === f}
        class:text-ink-950={activeFilter === f}
        class:text-white={activeFilter !== f}
        class:font-bold={activeFilter === f}
        class:border-accent={activeFilter === f}
        class:border={activeFilter !== f}
        class:border-white={activeFilter !== f}
        class:border-opacity-10={activeFilter !== f}
        class:hover:border-accent={activeFilter !== f}
        class:hover:text-accent={activeFilter !== f}
        on:click={() => activeFilter = f}
      >
        {f}
      </button>
    {/each}
  </div>

  <!-- Project grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    {#each filtered as project, i}
      <button
        type="button"
        class="section-reveal group relative w-full rounded-2xl glow-border p-6 text-left cursor-pointer transition-all duration-500 hover:-translate-y-1 bg-ink-900/50 overflow-hidden"
        style="transition-delay: {i * 80}ms"
        on:click={() => openModal(project)}
        aria-label="Open {project.title} details"
        data-cursor
      >
        <!-- Colored accent corner -->
        <div
          class="absolute top-0 right-0 w-24 h-24 opacity-10 blur-2xl rounded-full transition-opacity duration-500 group-hover:opacity-25"
          style="background: {project.color};"
          aria-hidden="true"
        ></div>

        <div class="relative z-10">
          <!-- Emoji + category -->
          <div class="flex items-start justify-between mb-4">
            <span class="text-3xl" aria-hidden="true">{project.emoji}</span>
            <span class="font-mono text-[10px] text-white/30 tracking-widest uppercase mt-1">{project.category} · {project.year}</span>
          </div>

          <!-- Title -->
          <h3 class="font-display font-bold text-xl text-white mb-2 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>

          <!-- Description -->
          <p class="text-sm text-white/50 leading-relaxed mb-5">
            {project.description}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            {#each project.tags as tag}
              <span
                class="px-2 py-0.5 rounded font-mono text-[10px] tracking-wider border"
                style="border-color: {project.color}33; color: {project.color}99; background: {project.color}0a"
              >
                {tag}
              </span>
            {/each}
          </div>

          <!-- Hover cue -->
          <p class="mt-4 text-[11px] text-white/20 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to expand →
          </p>
        </div>
      </button>
    {/each}
  </div>
</section>

<!-- Modal -->
{#if selectedProject}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-6"
    role="dialog"
    aria-modal="true"
    aria-label={selectedProject.title}
  >
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
      on:click={closeModal}
      role="presentation"
    ></div>

    <!-- Panel -->
    <div class="relative z-10 w-full max-w-lg rounded-2xl glass border border-white/10 p-8 animate-fade-up">
      <button
        on:click={closeModal}
        class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors"
        aria-label="Close modal"
      >
        ✕
      </button>

      <span class="text-4xl mb-4 block" aria-hidden="true">{selectedProject.emoji}</span>
      <span class="font-mono text-[10px] text-accent/60 tracking-widest uppercase">{selectedProject.category} · {selectedProject.year}</span>
      <h2 class="font-display text-2xl font-bold text-white mt-2 mb-3">{selectedProject.title}</h2>
      <p class="text-white/60 text-sm leading-relaxed mb-6">{selectedProject.description}</p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-8">
        {#each selectedProject.tags as tag}
          <span
            class="px-3 py-1 rounded-full font-mono text-xs"
            style="border: 1px solid {selectedProject.color}44; color: {selectedProject.color}; background: {selectedProject.color}15"
          >
            {tag}
          </span>
        {/each}
      </div>

      <!-- Links -->
      <div class="flex gap-3">
        {#if selectedProject.github}
          <a
            href={selectedProject.github}
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 py-2.5 text-center rounded-full border border-white/20 text-white/70 text-sm font-mono hover:border-accent/50 hover:text-accent transition-all duration-300"
          >
            GitHub ↗
          </a>
        {/if}
        {#if selectedProject.live}
          <a
            href={selectedProject.live}
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 py-2.5 text-center rounded-full font-mono text-sm font-bold transition-all duration-300"
            style="background: {selectedProject.color}; color: #080910;"
          >
            Live Demo ↗
          </a>
        {/if}
      </div>
    </div>
  </div>
{/if}
