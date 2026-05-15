<script>
  import { onMount } from 'svelte';

  let dot = { x: 0, y: 0 };
  let ring = { x: 0, y: 0 };
  let dotEl, ringEl;
  let isHovering = false;

  onMount(() => {
    const moveDot = (e) => {
      dot.x = e.clientX;
      dot.y = e.clientY;
      if (dotEl) {
        dotEl.style.left = `${e.clientX - 3}px`;
        dotEl.style.top = `${e.clientY - 3}px`;
      }
    };

    let rafId;
    const moveRing = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (ringEl) {
          ringEl.style.left = `${e.clientX - 16}px`;
          ringEl.style.top = `${e.clientY - 16}px`;
        }
      });
    };

    const onEnter = () => {
      isHovering = true;
      if (ringEl) {
        ringEl.style.width = '48px';
        ringEl.style.height = '48px';
        ringEl.style.borderColor = 'rgba(127,255,212,0.8)';
        ringEl.style.marginLeft = '-8px';
        ringEl.style.marginTop = '-8px';
      }
    };

    const onLeave = () => {
      isHovering = false;
      if (ringEl) {
        ringEl.style.width = '32px';
        ringEl.style.height = '32px';
        ringEl.style.borderColor = 'rgba(127,255,212,0.5)';
        ringEl.style.marginLeft = '0';
        ringEl.style.marginTop = '0';
      }
    };

    document.addEventListener('mousemove', moveDot);
    document.addEventListener('mousemove', moveRing);

    const interactables = document.querySelectorAll('a, button, [data-cursor]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', moveDot);
      document.removeEventListener('mousemove', moveRing);
      observer.disconnect();
    };
  });
</script>

<div bind:this={dotEl} class="cursor-dot" aria-hidden="true"></div>
<div bind:this={ringEl} class="cursor-ring" aria-hidden="true"></div>
