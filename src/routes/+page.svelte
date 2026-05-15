<script>
  import Hero from '$lib/components/Hero.svelte';
  import Marquee from '$lib/components/Marquee.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import About from '$lib/components/About.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
  <title>Odinaka Esther — Frontend Developer</title>
  <meta name="description" content="Frontend developer building fast, animated, and accessible digital experiences. Based in Lagos, Nigeria." />
</svelte:head>

<Hero />
<Marquee />
<Projects />
<About />
<Skills />
<Contact />
