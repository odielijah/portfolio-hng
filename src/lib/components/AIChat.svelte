<script>
  import { onMount, tick } from 'svelte';

  let messages = [
    {
      role: 'assistant',
      content: "Hey! I'm Odi's AI portfolio assistant. Ask me anything — about her projects, skills, experience, or availability. I'm here to help. 👋",
    },
  ];
  let input = '';
  let loading = false;
  let chatEl;
  let inputEl;
  let open = false;

  const suggestions = [
    "What projects has Odi built?",
    "What's her tech stack?",
    "Is she available for hire?",
    "What's her experience level?",
  ];

  async function sendMessage(text) {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    input = '';
    messages = [...messages, { role: 'user', content: userText }];
    loading = true;

    await tick();
    scrollChat();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history: messages.slice(-6) }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      messages = [...messages, { role: 'assistant', content: data.reply }];
    } catch (e) {
      messages = [...messages, {
        role: 'assistant',
        content: "Hmm, I had a little hiccup there. Try asking again!",
      }];
    }

    loading = false;
    await tick();
    scrollChat();
  }

  function scrollChat() {
    if (chatEl) chatEl.scrollTop = chatEl.scrollHeight;
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  onMount(() => {
    setTimeout(() => {
      if (inputEl && open) inputEl.focus();
    }, 300);
  });

  $: if (open && inputEl) {
    setTimeout(() => inputEl?.focus(), 300);
  }
</script>

<!-- Floating toggle button -->
<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
  {#if open}
    <!-- Chat panel -->
    <div
      class="w-[340px] rounded-2xl glass border border-white/10 overflow-hidden shadow-2xl shadow-black/50 animate-fade-up"
      role="region"
      aria-label="AI Portfolio Assistant"
    >
      <!-- Header -->
      <div class="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-ink-800/50">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs">
            🤖
          </div>
          <div>
            <p class="font-display font-semibold text-white text-sm leading-none">Odi's Assistant</p>
            <p class="font-mono text-[10px] text-accent/60 mt-0.5">Powered by Claude</p>
          </div>
        </div>
        <button
          on:click={() => open = false}
          class="text-white/30 hover:text-white transition-colors text-sm"
          aria-label="Close chat"
        >✕</button>
      </div>

      <!-- Messages -->
      <div
        bind:this={chatEl}
        class="h-72 overflow-y-auto p-4 space-y-3 scroll-smooth"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {#each messages as msg}
          <div class="flex" class:justify-end={msg.role === 'user'}>
            <div
              class="max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed"
              class:bg-accent={msg.role === 'user'}
              class:text-ink-950={msg.role === 'user'}
              class:font-medium={msg.role === 'user'}
              class:bg-ink-700={msg.role === 'assistant'}
              class:text-white={msg.role === 'assistant'}
            >
              {msg.content}
            </div>
          </div>
        {/each}

        {#if loading}
          <div class="flex">
            <div class="bg-ink-700 px-3 py-2 rounded-xl">
              <span class="flex gap-1 items-center">
                <span class="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce" style="animation-delay:0ms"></span>
                <span class="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce" style="animation-delay:150ms"></span>
                <span class="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce" style="animation-delay:300ms"></span>
              </span>
            </div>
          </div>
        {/if}
      </div>

      <!-- Suggestions (only before user sends) -->
      {#if messages.length === 1}
        <div class="px-3 pb-2 flex flex-wrap gap-1.5">
          {#each suggestions as s}
            <button
              on:click={() => sendMessage(s)}
              class="text-[11px] font-mono px-2.5 py-1 rounded-full border border-accent/20 text-accent/60 hover:bg-accent/10 hover:text-accent transition-all duration-200"
            >
              {s}
            </button>
          {/each}
        </div>
      {/if}

      <!-- Input -->
      <div class="px-3 pb-3">
        <div class="flex items-center gap-2 bg-ink-800 rounded-xl border border-white/10 focus-within:border-accent/30 transition-colors">
          <input
            bind:this={inputEl}
            bind:value={input}
            on:keydown={handleKeydown}
            placeholder="Ask anything..."
            class="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none font-body"
            aria-label="Message input"
            disabled={loading}
          />
          <button
            on:click={() => sendMessage()}
            disabled={!input.trim() || loading}
            class="mr-2 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30"
            style="background: {input.trim() ? '#7FFFD4' : 'transparent'}; color: {input.trim() ? '#080910' : '#7FFFD4'};"
            aria-label="Send message"
          >
            →
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Fab -->
  <button
    on:click={() => open = !open}
    class="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/50"
    style="background: linear-gradient(135deg, #7FFFD4, #5CE8B8);"
    aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
    aria-expanded={open}
  >
    <span class="text-ink-950 text-lg">{open ? '✕' : '💬'}</span>
  </button>
</div>
