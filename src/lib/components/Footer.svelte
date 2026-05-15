<script>
  const year = new Date().getFullYear();
</script>

<footer class="border-t border-white/5 py-8 px-6">
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    <p class="font-mono text-xs text-white/20">
      © {year} Odinaka Esther Elijah — Built with SvelteKit
    </p>
    <div class="flex gap-6">
      {#each [
        { label: 'GitHub', href: 'https://github.com/odinaka' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/odinaka' },
        { label: 'Email', href: 'mailto:odinaka@example.com' },
      ] as link}
        <a
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          class="font-mono text-xs text-white/20 hover:text-accent transition-colors duration-300"
          aria-label={link.label}
        >
          {link.label}
        </a>
      {/each}
    </div>
  </div>
</footer>
