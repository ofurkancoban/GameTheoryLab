/* AI tutor. Default: a free open-weight model (GPT-OSS 20B, Apache 2.0) served without a key by Pollinations.
 * Alternatives: Anthropic, OpenAI, Google Gemini or any OpenAI-compatible endpoint (OpenRouter, Ollama, LM Studio).
 * Keys stay in this browser and go only to the chosen provider.
 * Works when the app is opened as a local file; the published claude.ai page blocks outside connections. */
(function () {
  const FREE_URL = 'https://text.pollinations.ai/openai';
  /* The claude.ai viewer blocks outside connections; everywhere else (local file, GitHub Pages, any web server) they work. */
  const onClaude = () => typeof window.claude !== 'undefined' && !!window.claude && typeof window.claude.use === 'function';
  const PROVIDERS = {
    free: { name: 'Free open model: GPT-OSS 20B (no key, no cost)', keyLabel: 'No key needed', needsKey: false, models: ['openai-fast'], help: 'GPT-OSS 20B is an open-weight model (Apache 2.0 licence), served free of charge by Pollinations (pollinations.ai). No account and no key needed. The free tier answers about once every 30 seconds per internet connection; your question text is sent to Pollinations.' },
    anthropic: { name: 'Anthropic (Claude)', keyLabel: 'Anthropic API key', needsKey: true, models: ['claude-opus-5-5', 'claude-sonnet-5-5', 'claude-haiku-5-5'], help: 'Create a key at console.anthropic.com.' },
    openai: { name: 'OpenAI', keyLabel: 'OpenAI API key', needsKey: true, models: [], help: 'Create a key at platform.openai.com and enter a model ID from your account.' },
    gemini: { name: 'Google Gemini', keyLabel: 'Gemini API key', needsKey: true, models: [], help: 'Create a key in Google AI Studio and enter a Gemini model ID.' },
    compatible: { name: 'OpenAI-compatible (OpenRouter, Ollama, LM Studio, ...)', keyLabel: 'API key (leave empty for local servers)', needsKey: false, models: [], help: 'Enter the server\'s base URL ending in /v1, e.g. http://localhost:11434/v1 for Ollama or http://localhost:1234/v1 for LM Studio. Local servers must allow requests from a file page (for Ollama set OLLAMA_ORIGINS=*).' },
  };
  const FALLBACK_MODELS = ['claude-opus-5-5', 'claude-opus-5', 'claude-fable-5-1', 'claude-sonnet-5-5'];

  const DEFAULT = { provider: 'free', model: 'openai-fast', key: '', base: '' };
  const cfg = () => { const c = store.get('ai', null); return c && PROVIDERS[c.provider] ? c : DEFAULT; };
  const configured = () => { const c = cfg(); return !!(c && c.provider && c.model && (c.key || !PROVIDERS[c.provider].needsKey) && (c.provider !== 'compatible' || c.base)); };
  const wait = (ms, signal) => new Promise((ok, no) => { const t = setTimeout(ok, ms); if (signal) signal.addEventListener('abort', () => { clearTimeout(t); no(Object.assign(new Error('Stopped.'), { name: 'AbortError' })); }); });

  function err(message, code) { const e = new Error(message); e.code = code || 'error'; return e; }

  /* Fetch with an idle timeout: aborts if the server sends nothing for IDLE ms (reset on every chunk). */
  const IDLE = 60000;
  function guard(signal) {
    const ctl = new AbortController(); let timer = null, timedOut = false;
    const kick = () => { clearTimeout(timer); timer = setTimeout(() => { timedOut = true; ctl.abort(); }, IDLE); };
    if (signal) { if (signal.aborted) ctl.abort(); else signal.addEventListener('abort', () => ctl.abort()); }
    kick();
    return { signal: ctl.signal, kick, done: () => clearTimeout(timer), timedOut: () => timedOut };
  }
  /* Read a server-sent-events body; calls onJSON for every "data: {...}" line. */
  async function readSSE(res, g, onJSON) {
    const reader = res.body.getReader(), dec = new TextDecoder(); let buf = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      g.kick();
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
        if (!line.startsWith('data:')) continue;
        const d = line.slice(5).trim();
        if (d === '[DONE]') return;
        try { onJSON(JSON.parse(d)); } catch (e) { if (e && e.code) throw e; }
      }
    }
  }
  const errJSON = async res => { try { return await res.json(); } catch (e) { return {}; } };
  const timeoutErr = () => err('The AI did not answer within 60 seconds (the service is busy). Please ask again in a moment.', 'timeout');

  /* One answer, streamed. system: instructions; turns: [{role: 'user'|'assistant', content}] ending on a user turn.
   * onText(fullTextSoFar) is called while the answer arrives; the promise resolves with the whole answer. */
  async function chat(system, turns, signal, onText) {
    const c = cfg(); if (!configured()) throw err('No AI connected.', 'not_configured');
    const emit = t => { if (onText) onText(t); };
    let g = null;
    try {
      if (c.provider === 'free' || c.provider === 'openai' || c.provider === 'compatible') {
        const url = c.provider === 'free' ? FREE_URL : (c.provider === 'openai' ? 'https://api.openai.com/v1' : c.base.replace(/\/+$/, '')) + '/chat/completions';
        const headers = { 'content-type': 'application/json' }; if (c.key && c.provider !== 'free') headers.authorization = 'Bearer ' + c.key;
        const body = JSON.stringify({ model: c.model || 'openai-fast', stream: true, messages: [{ role: 'system', content: system }, ...turns] });
        for (let attempt = 0; attempt < 2; attempt++) {
          g = guard(signal);
          const res = await fetch(url, { method: 'POST', headers, body, signal: g.signal });
          if (!res.ok) {
            const data = await errJSON(res); g.done();
            const limited = res.status === 402 || res.status === 429;
            if (limited && c.provider === 'free' && attempt === 0) {
              /* Free tier: about one answer per 30 s. Wait once and retry instead of failing. */
              const m = /(\d+)\s*s/.exec((data.error && data.error.message) || '');
              await wait(Math.min(35, m ? +m[1] + 1 : 30) * 1000, signal);
              continue;
            }
            const msg = data.error && (data.error.message || data.error);
            throw err(limited && c.provider === 'free' ? 'The free model allows about one answer every 30 seconds. Please wait a moment and ask again.' : (msg || ('HTTP ' + res.status)), res.status === 401 ? 'auth' : limited ? 'rate' : 'http');
          }
          let text = '';
          if (/event-stream/.test(res.headers.get('content-type') || '')) {
            await readSSE(res, g, d => { const ch = d.choices && d.choices[0]; const piece = ch && ch.delta && ch.delta.content; if (piece) { text += piece; emit(text); } });
          } else {
            const data = await errJSON(res); const m = data.choices && data.choices[0] && data.choices[0].message;
            text = m ? String(m.content || '') : ''; emit(text);
          }
          g.done();
          text = text.trim();
          if (!text) throw err('The model returned no answer. Try again in a moment.', 'empty');
          return text;
        }
      }
      if (c.provider === 'anthropic') {
        const body = { model: c.model, max_tokens: 16000, system, messages: turns, stream: true };
        const headers = { 'content-type': 'application/json', 'x-api-key': c.key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' };
        if (FALLBACK_MODELS.includes(c.model)) { body.fallbacks = 'default'; headers['anthropic-beta'] = 'server-side-fallback-2026-07-01'; }
        g = guard(signal);
        const res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(body), signal: g.signal });
        if (!res.ok) { const data = await errJSON(res); g.done(); throw err((data.error && data.error.message) || ('HTTP ' + res.status), res.status === 401 ? 'auth' : res.status === 429 ? 'rate' : 'http'); }
        let text = '', refused = false;
        await readSSE(res, g, d => {
          if (d.type === 'content_block_delta' && d.delta && d.delta.type === 'text_delta') { text += d.delta.text; emit(text); }
          else if (d.type === 'message_delta' && d.delta && d.delta.stop_reason === 'refusal') refused = true;
          else if (d.type === 'error') throw err((d.error && d.error.message) || 'The answer failed.', 'http');
        });
        g.done();
        if (refused) throw err('The model declined to answer this question.', 'refused');
        return text.trim();
      }
      if (c.provider === 'gemini') {
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(c.model) + ':streamGenerateContent?alt=sse&key=' + encodeURIComponent(c.key);
        const body = { systemInstruction: { parts: [{ text: system }] }, contents: turns.map(t => ({ role: t.role === 'assistant' ? 'model' : 'user', parts: [{ text: t.content }] })) };
        g = guard(signal);
        const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: g.signal });
        if (!res.ok) { const data = await errJSON(res); g.done(); throw err((data.error && data.error.message) || ('HTTP ' + res.status), res.status === 400 || res.status === 403 ? 'auth' : res.status === 429 ? 'rate' : 'http'); }
        let text = '', reason = '';
        await readSSE(res, g, d => { const cand = d.candidates && d.candidates[0]; if (!cand) return; if (cand.finishReason) reason = cand.finishReason; const p = cand.content && cand.content.parts ? cand.content.parts.map(x => x.text || '').join('') : ''; if (p) { text += p; emit(text); } });
        g.done();
        text = text.trim();
        if (!text) throw err('The model returned no answer' + (reason ? ' (' + reason + ')' : '') + '.', 'empty');
        return text;
      }
      throw err('Unknown provider.', 'not_configured');
    } catch (e) {
      if (g) g.done();
      if (g && g.timedOut()) throw timeoutErr();
      if (e.name === 'AbortError') throw err('Stopped.', 'cancelled');
      if (e.code) throw e;
      throw err(!onClaude() ? 'Could not reach the provider. Check your internet connection, the base URL, and (for local servers) that requests from file pages are allowed.' : 'This page cannot connect to outside AI providers on claude.ai. Use the web version (ofurkancoban.github.io/GameTheoryLab) or open index.html from the app folder.', 'network');
    }
  }

  GT.ai = { PROVIDERS, cfg, configured, chat };

  GT.pages.ai = {
    title: 'AI tutor', render: () => {
      const c = cfg();
      const local = !onClaude();
      return '<p class="eyebrow">About and settings</p><h1>AI tutor</h1>' +
        '<p>The "Ask" boxes at the end of each lecture and the "Explain with AI" buttons in the drills use an AI tutor. <strong>By default it is a free, open-weight model</strong> (GPT-OSS 20B, Apache 2.0 licence) that needs no account and no key. You can switch to another provider below; API keys are stored only in this browser and sent only to the provider you pick.</p>' +
        (local ? '' : '<div class="box warn"><span class="lbl">In the published version on claude.ai</span><p>Pages on claude.ai are not allowed to connect to outside services, so the free model (and any other provider) cannot be reached from here. In this version the Ask boxes use Claude through your claude.ai account. To use the free open model, open the web version at ofurkancoban.github.io/GameTheoryLab or the app folder (index.html): it then works without any setup.</p></div>') +
        '<div class="drill">' +
        '<label for="ai-p">Provider</label><select id="ai-p">' + Object.keys(PROVIDERS).map(k => '<option value="' + k + '"' + (k === c.provider ? ' selected' : '') + '>' + PROVIDERS[k].name + '</option>').join('') + '</select>' +
        '<p class="small muted" id="ai-help"></p>' +
        '<div id="ai-base-row"><label for="ai-base">Base URL</label><input type="text" id="ai-base" value="' + esc(c.base || '') + '" placeholder="http://localhost:11434/v1" style="width:100%"></div>' +
        '<label for="ai-key" id="ai-key-l">API key</label><input type="password" id="ai-key" value="' + esc(c.key || '') + '" autocomplete="off" style="width:100%">' +
        '<label for="ai-m">Model ID</label><input type="text" id="ai-m" list="ai-models" value="' + esc(c.model || '') + '" placeholder="the model ID from your provider" style="width:100%"><datalist id="ai-models"></datalist>' +
        '<div class="row"><button class="btn sm" id="ai-save" type="button">Save</button><button class="btn sm ghost" id="ai-test" type="button">Save and test</button><button class="btn sm ghost" id="ai-clear" type="button">Remove key</button><span class="small" id="ai-msg"></span></div></div>' +
        '<p class="small muted">Tip: the free model is fine for quick questions. For long derivations or faster answers you can switch to a stronger provider (paid, with your own key) or run an open model locally with Ollama or LM Studio (free, choose "OpenAI-compatible").</p>';
    },
  };
  GT.bindAISettings = function (root) {
    const p = root.querySelector('#ai-p'), msg = root.querySelector('#ai-msg');
    const sync = () => {
      const P = PROVIDERS[p.value];
      root.querySelector('#ai-help').textContent = P.help;
      root.querySelector('#ai-key-l').textContent = P.keyLabel;
      root.querySelector('#ai-base-row').hidden = p.value !== 'compatible';
      const free = p.value === 'free'; root.querySelector('#ai-key').hidden = free; root.querySelector('#ai-key-l').hidden = free; root.querySelector('#ai-m').readOnly = free; if (free) root.querySelector('#ai-m').value = 'openai-fast';
      root.querySelector('#ai-models').innerHTML = P.models.map(m => '<option value="' + m + '">').join('');
      const m = root.querySelector('#ai-m'); if (P.models.length && !P.models.includes(m.value) && !m.value) m.value = P.models[0];
    };
    p.addEventListener('change', () => { root.querySelector('#ai-m').value = PROVIDERS[p.value].models[0] || ''; sync(); });
    sync();
    const save = () => {
      const v = { provider: p.value, key: root.querySelector('#ai-key').value.trim(), model: root.querySelector('#ai-m').value.trim(), base: root.querySelector('#ai-base').value.trim() };
      store.set('ai', v);
      if (!configured()) { msg.textContent = 'Saved, but incomplete: ' + (!v.model ? 'enter a model ID.' : PROVIDERS[v.provider].needsKey && !v.key ? 'enter an API key.' : 'enter the base URL.'); return false; }
      msg.textContent = 'Saved.'; return true;
    };
    root.querySelector('#ai-save').addEventListener('click', save);
    root.querySelector('#ai-test').addEventListener('click', async () => {
      if (!save()) return;
      msg.textContent = 'Testing...';
      try { const t = await chat('Reply with exactly: OK', [{ role: 'user', content: 'Connection test.' }], null, null); msg.textContent = 'Connected. The model replied: ' + t.slice(0, 60); }
      catch (e) { msg.textContent = 'Not connected: ' + e.message; }
    });
    root.querySelector('#ai-clear').addEventListener('click', () => { const c = cfg(); if (c) { c.key = ''; store.set('ai', c); } root.querySelector('#ai-key').value = ''; msg.textContent = 'Key removed from this browser.'; });
  };
})();
