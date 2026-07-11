/* ============================================================
   main.js — Global JavaScript
   Runs on every page.
   Handles: nav scroll behaviour, mobile menu, scroll reveal.
   ============================================================ */

/* ============================================================
   ASSETS BASE URL
   Update this to your actual GitHub username once the
   minterra-assets repo is set up and GitHub Pages is enabled.

   All image src attributes in the HTML files use:
   https://YOUR-GITHUB-USERNAME.github.io/minterra-assets/...
   
   Do a Find & Replace of "YOUR-GITHUB-USERNAME" across all 
   HTML files once you have your GitHub username.
   ============================================================ */
// const ASSETS_BASE = 'https://YOUR-GITHUB-USERNAME.github.io/minterra-assets';


/* ============================================================
   1. NAV — SCROLL BEHAVIOUR
   Switches nav from transparent to solid white after 80px scroll.
   Only applies on pages where nav starts transparent (home).
   ============================================================ */
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const SCROLL_THRESHOLD = 80;

  function updateNav() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('nav--scrolled');
      nav.classList.remove('nav--transparent');
    } else {
      // Only go transparent if the nav started transparent (home page)
      if (nav.dataset.transparent === 'true') {
        nav.classList.remove('nav--scrolled');
        nav.classList.add('nav--transparent');
      }
    }
  }

  // Mark hero pages so we know to restore transparency on scroll up
  if (nav.classList.contains('nav--transparent')) {
    nav.dataset.transparent = 'true';
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // Run once on load
})();


/* ============================================================
   2. MOBILE MENU TOGGLE
   Opens/closes full-screen overlay nav on mobile.
   ============================================================ */
(function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Prevent scroll behind overlay
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu on mobile link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ============================================================
   3. ACTIVE NAV LINK
   Marks the current page link in the nav as active.
   ============================================================ */
(function initActiveLink() {
  const currentPath = window.location.pathname;

  document.querySelectorAll('.nav__links a, .nav__mobile-menu a').forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname;

    // Match exact path or index/root
    const isHome = (currentPath === '/' || currentPath.endsWith('/index.html'));
    const linkIsHome = (linkPath === '/' || linkPath.endsWith('/index.html'));

    if (
      (isHome && linkIsHome) ||
      (!isHome && !linkIsHome && currentPath.includes(linkPath.split('/').pop().replace('.html', '')))
    ) {
      link.classList.add('active');
    }
  });
})();


/* ============================================================
   4. SCROLL REVEAL
   Elements with class .reveal fade up when they enter viewport.
   Elements with class .reveal-item inside a .reveal-group
   animate with a staggered delay.
   ============================================================ */
(function initScrollReveal() {
  // Do nothing if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .reveal-item').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px', // Trigger slightly before element enters view
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Animate once, then stop watching
      }
    });
  }, observerOptions);

  // Observe individual reveal elements
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Observe all reveal-items
  document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
})();


/* ============================================================
   5. HERO BACKGROUND IMAGE
   If an element has data-bg="url", applies it as background-image.
   This keeps the HTML cleaner than inline style attributes.
   
   Usage in HTML:
   <section class="hero" data-bg="https://...image.jpg"></section>
   ============================================================ */
(function initDataBg() {
  document.querySelectorAll('[data-bg]').forEach(el => {
    const url = el.dataset.bg;
    if (url) {
      el.style.backgroundImage = `url('${url}')`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.backgroundRepeat = 'no-repeat';
    }
  });
})();


/* ============================================================
   6. SMOOTH ANCHOR SCROLL
   Smooth scroll for any internal # links.
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();
