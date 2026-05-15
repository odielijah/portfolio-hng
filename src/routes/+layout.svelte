<script>
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Cursor from '$lib/components/Cursor.svelte';
  import AIChat from '$lib/components/AIChat.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte';

  let isMobile = false;
  onMount(() => {
    isMobile = window.matchMedia('(pointer: coarse)').matches;
  });
</script>

<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-ink-950 focus:rounded-lg focus:font-bold">
  Skip to main content
</a>

{#if !isMobile}
  <Cursor />
{/if}

<Nav />

<main id="main" tabindex="-1">
  <slot />
</main>

<Footer />
<AIChat />
