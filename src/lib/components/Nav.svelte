<script>
  import { onMount } from 'svelte';

  let scrolled = false;
  let mobileOpen = false;

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 60;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const links = [
    { label: 'Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  function closeMenu() { mobileOpen = false; }
</script>

<nav
  class={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-3' : 'py-4 sm:py-6'}`}
  aria-label="Main navigation"
>
  <div class="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="font-display font-bold text-lg tracking-tight group" aria-label="Home">
      <span class="text-white group-hover:text-accent transition-colors duration-300">odi</span><span class="text-accent">.</span>
    </a>

    <!-- Desktop links -->
    <ul class="hidden md:flex items-center gap-8" role="list">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="text-sm font-body text-white/60 hover:text-accent transition-colors duration-300 relative group"
          >
            {link.label}
            <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>
      {/each}
    </ul>

    <!-- CTA -->
    <div class="hidden md:flex items-center gap-4">
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm font-body px-4 py-2 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-all duration-300"
      >
        Resume ↗
      </a>
    </div>

    <!-- Mobile menu button -->
    <button
      class="md:hidden text-white/70 hover:text-white transition-colors p-2 -mr-2"
      on:click={() => mobileOpen = !mobileOpen}
      aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={mobileOpen}
    >
      <div class="w-5 flex flex-col gap-1.5 transition-all">
        <span class="block h-px bg-current transition-all" class:rotate-45={mobileOpen} class:translate-y-2={mobileOpen}></span>
        <span class="block h-px bg-current transition-all" class:opacity-0={mobileOpen}></span>
        <span class="block h-px bg-current transition-all" class:-rotate-45={mobileOpen} class:-translate-y-2={mobileOpen}></span>
      </div>
    </button>
  </div>

  <!-- Mobile menu -->
  {#if mobileOpen}
    <div class="md:hidden glass border-t border-white/5 px-5 py-6 flex max-h-[calc(100svh-4.5rem)] flex-col gap-5 overflow-y-auto">
      {#each links as link}
        <a
          href={link.href}
          class="text-white/70 hover:text-accent font-display text-lg font-semibold transition-colors"
          on:click={closeMenu}
        >
          {link.label}
        </a>
      {/each}
      <a href="/resume.pdf" target="_blank" class="text-accent font-display text-lg font-semibold" on:click={closeMenu}>
        Resume ↗
      </a>
    </div>
  {/if}
</nav>
