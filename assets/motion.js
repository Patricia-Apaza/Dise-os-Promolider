/* =====================================================================
   PROMOLIDER — Movimiento compartido (ver assets/motion.css)
   Requiere en <head>:
     <script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro');setTimeout(()=>document.documentElement.classList.remove('intro','intro-play'),5000)}</script>
   ===================================================================== */
(() => {
  const html = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Entrada del hero: espera a la tipografía ---------- */
  if (html.classList.contains('intro')){
    let started = false;
    const play = () => {
      if (html.classList.contains('intro-play') || !html.classList.contains('intro')) return;   // ya corrió o venció el seguro de 5 s
      html.classList.add('intro-play');
      setTimeout(() => html.classList.remove('intro','intro-play'), 3400);   // no deja animaciones colgando
    };
    const start = () => {
      if (started) return; started = true;
      requestAnimationFrame(() => requestAnimationFrame(play));
      setTimeout(play, 120);   // por si el navegador pausa requestAnimationFrame
    };
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(start);
    setTimeout(start, 700);
  }

  /* ---------- Video de portada ----------
     <section data-video-host> … <canvas class="hero-fallback"> <video class="hero-video" data-hero …><source src="…mp4"></video>
     Si el archivo no existe, se elimina el <video> y queda la animación en código.
     Si existe y se reproduce, la animación de respaldo se detiene (data-off="1"). */
  document.querySelectorAll('video[data-hero]').forEach(v => {
    const host = v.closest('[data-video-host]') || v.parentElement;
    v.muted = true;
    const play = () => { if (v.paused){ const p = v.play(); if (p && p.catch) p.catch(() => {}); } };
    v.addEventListener('playing', () => {
      host.classList.add('has-video');
      setTimeout(() => host.querySelectorAll('.hero-fallback').forEach(f => f.dataset.off = '1'), 1300);
    }, {once:true});
    const srcs = v.querySelectorAll('source'), last = srcs[srcs.length - 1];   // si hay varias fuentes, solo falla cuando falla la última
    if (last) last.addEventListener('error', () => v.remove());
    if (reduced){ v.removeAttribute('autoplay'); return; }
    play(); v.addEventListener('canplay', play);
    document.addEventListener('visibilitychange', () => { if (!document.hidden && v.isConnected) play(); });
    ['pointerdown','touchstart','scroll'].forEach(ev => addEventListener(ev, play, {once:true, passive:true}));
  });

  /* ---------- Títulos de sección con máscara ---------- */
  if (reduced) return;
  const heads = [...document.querySelectorAll('main h2')].filter(h => !h.closest('.hero') && !h.querySelector('.ln') && !h.dataset.noMask);
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting){ e.target.classList.add('m-on'); io.unobserve(e.target); }
  }), {threshold:.25, rootMargin:'0px 0px -40px 0px'});
  heads.forEach(h => {
    const wrap = document.createElement('span'); wrap.className = 'm-wrap';
    const inner = document.createElement('span'); inner.className = 'm-in';
    while (h.firstChild) inner.appendChild(h.firstChild);
    wrap.appendChild(inner); h.appendChild(wrap);
    io.observe(h);
  });
})();
