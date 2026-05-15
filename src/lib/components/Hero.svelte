<script>
  import { onMount } from 'svelte';

  let visible = false;
  let typedText = '';
  let canvasEl;
  const phrases = ['frontend developer.', 'ui engineer.', 'experience builder.', 'creative coder.'];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  onMount(() => {
    // Entrance animation
    setTimeout(() => visible = true, 100);

    // Typewriter
    function type() {
      const current = phrases[phraseIndex];
      if (!deleting) {
        typedText = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, 2000);
          return;
        }
      } else {
        typedText = current.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 50 : 90);
    }
    setTimeout(type, 1200);

    // Canvas particle grid
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    let w = canvasEl.width = window.innerWidth;
    let h = canvasEl.height = window.innerHeight;

    const particles = [];
    const count = Math.min(80, Math.floor(w * h / 12000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let raf;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(127,255,212,${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(127,255,212,${(1 - dist / 120) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    const resize = () => {
      w = canvasEl.width = window.innerWidth;
      h = canvasEl.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  });
</script>

<section id="hero" class="relative min-h-screen flex flex-col justify-center overflow-hidden" aria-label="Hero section">
  <!-- Canvas background -->
  <canvas
    bind:this={canvasEl}
    class="absolute inset-0 pointer-events-none"
    aria-hidden="true"
  ></canvas>

  <!-- Radial gradient glow -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]"></div>
    <div class="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-warm/5 blur-[80px]"></div>
  </div>

  <!-- Grid overlay -->
  <div
    class="absolute inset-0 opacity-[0.02]"
    style="background-image: linear-gradient(rgba(127,255,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(127,255,212,1) 1px, transparent 1px); background-size: 60px 60px;"
    aria-hidden="true"
  ></div>

  <div class="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
    <div
      class="transition-all duration-1000"
      class:opacity-0={!visible}
      class:translate-y-8={!visible}
      class:opacity-100={visible}
      class:translate-y-0={visible}
    >
      <!-- Status badge -->
      <div class="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full glass text-xs font-mono text-accent/80 border border-accent/20">
        <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow"></span>
        Available for opportunities
      </div>

      <!-- Main heading -->
      <h1 class="font-display font-extrabold leading-[1.05] tracking-tight">
        <span class="block text-5xl md:text-7xl lg:text-[88px] text-white mb-2">
          Odinaka<br />
          <span class="text-gradient">Esther.</span>
        </span>
      </h1>

      <!-- Typewriter subtitle -->
      <p class="mt-6 font-display text-2xl md:text-3xl text-white/50 font-medium min-h-[2.5rem]">
        I'm a <span class="text-white">{typedText}</span><span class="inline-block w-0.5 h-7 bg-accent align-middle ml-0.5 animate-blink"></span>
      </p>

      <!-- Description -->
      <p class="mt-6 max-w-xl text-white/50 font-body text-base md:text-lg leading-relaxed"
         style="transition-delay: 200ms"
         class:opacity-0={!visible}
         class:opacity-100={visible}
      >
        Frontend developer building <em class="text-white/70 not-italic">fast, animated, and accessible</em> digital experiences. Currently interning at Hadiel Health Technologies in Lagos.
      </p>

      <!-- CTAs -->
      <div class="mt-10 flex flex-wrap gap-4" style="transition-delay: 400ms">
        <a
          href="#projects"
          class="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-ink-950 font-display font-bold text-sm hover:bg-accent-dim transition-all duration-300 hover:scale-105"
        >
          View my work
          <span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>
        <a
          href="#contact"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 font-display font-medium text-sm hover:border-accent/50 hover:text-accent transition-all duration-300"
        >
          Get in touch
        </a>
      </div>

      <!-- Social links -->
      <div class="mt-12 flex items-center gap-6" style="transition-delay: 600ms">
        <a href="https://github.com/odinaka" target="_blank" rel="noopener noreferrer" class="text-white/30 hover:text-accent transition-colors duration-300 font-mono text-xs tracking-wider" aria-label="GitHub">
          GitHub ↗
        </a>
        <span class="w-px h-4 bg-white/10" aria-hidden="true"></span>
        <a href="https://linkedin.com/in/odinaka" target="_blank" rel="noopener noreferrer" class="text-white/30 hover:text-accent transition-colors duration-300 font-mono text-xs tracking-wider" aria-label="LinkedIn">
          LinkedIn ↗
        </a>
        <span class="w-px h-4 bg-white/10" aria-hidden="true"></span>
        <a href="mailto:odinaka@example.com" class="text-white/30 hover:text-accent transition-colors duration-300 font-mono text-xs tracking-wider" aria-label="Email">
          Email ↗
        </a>
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20" aria-hidden="true">
    <span class="font-mono text-[10px] tracking-widest">SCROLL</span>
    <div class="w-px h-12 bg-gradient-to-b from-white/20 to-transparent animate-pulse-slow"></div>
  </div>
</section>
