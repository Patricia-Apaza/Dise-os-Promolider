/* Selector flotante para navegar entre propuestas de diseño.
   Solo sirve para revisión interna: eliminar el <script> antes de publicar. */
(() => {
  const P = [
    {file:'propuesta-1-cinematica.html', name:'Cinemática', ref:'Ferrari'},
    {file:'propuesta-2-ingenieria.html', name:'Ingeniería', ref:'NVIDIA'},
    {file:'propuesta-3-galeria.html',    name:'Galería',    ref:'Apple'},
    {file:'propuesta-4-producto.html',   name:'Producto',   ref:'Linear'},
    {file:'propuesta-5-orbita.html',     name:'Órbita',     ref:'motionsites · Nebula Hero'},
  ];
  const here = decodeURIComponent(location.pathname.split('/').pop());
  const i = P.findIndex(p => p.file === here);
  if (i < 0 || window.self !== window.top) return;   // no mostrar dentro de las vistas previas de la galería
  const prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
  const el = document.createElement('div');
  el.setAttribute('role', 'navigation');
  el.setAttribute('aria-label', 'Propuestas de diseño');
  el.innerHTML = `
    <a href="${prev.file}" title="Anterior: ${prev.name}" aria-label="Propuesta anterior">‹</a>
    <a href="index.html" class="sw-mid" title="Ver todas las propuestas"><b>${i + 1}/${P.length}</b> ${P[i].name} <span>· ref. ${P[i].ref}</span></a>
    <a href="${next.file}" title="Siguiente: ${next.name}" aria-label="Propuesta siguiente">›</a>`;
  const css = document.createElement('style');
  css.textContent = `
    #pl-switcher{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:2px;
      padding:4px;border-radius:999px;background:rgba(12,12,12,.88);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,.14);box-shadow:0 8px 30px rgba(0,0,0,.35);font:500 12px/1 'Poppins',system-ui,sans-serif;color:#fff;
      white-space:nowrap;max-width:calc(100vw - 32px)}
    #pl-switcher a{color:#fff;text-decoration:none;padding:9px 14px;border-radius:999px;transition:background .2s}
    #pl-switcher a:hover{background:rgba(255,255,255,.1)}
    #pl-switcher a:not(.sw-mid){font-size:18px;padding:5px 12px 7px}
    #pl-switcher b{color:#1AE600;font-weight:600;margin-right:4px}
    #pl-switcher span{color:#8a8a8a}
    @media (max-width:480px){#pl-switcher span{display:none}}`;
  el.id = 'pl-switcher';
  document.head.appendChild(css);
  document.body.appendChild(el);
})();
