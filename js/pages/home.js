/* ============================================================
   js/pages/home.js — Home Page Interactions
   Load this ONLY on index.html (already done in the <script> tag).
   ============================================================ */


/* ============================================================
   TICKER PAUSE ON HOVER
   Pauses the scrolling marquee when the user hovers over it.
   ============================================================ */
(function initTickerPause() {
  const ticker = document.querySelector('.ticker');
  if (!ticker) return;

  const track = ticker.querySelector('.ticker__track');
  if (!track) return;

  ticker.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });

  ticker.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
})();
