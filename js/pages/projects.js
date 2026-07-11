/* ============================================================
   js/pages/projects.js — Projects Page Filter
   Load this ONLY on projects.html (already done in <script> tag).
   ============================================================ */


/* ============================================================
   PROJECT FILTER
   Filters project cards by category (data-category attribute).
   
   HTML requirements:
   - Filter buttons: <button class="filter-btn" data-filter="all">All</button>
   - Project cards:  <article class="project-card" data-category="residential">
   
   Categories used:
   - "all"          → shows everything
   - "residential"  → data-category="residential"
   - "commercial"   → data-category="commercial"
   - "renovation"   → data-category="renovation"
   
   To add a new category:
   1. Add a new filter button with data-filter="your-category"
   2. Add data-category="your-category" to the relevant project cards
   ============================================================ */
(function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const emptyState = document.querySelector('.projects-empty');

  if (!filterBtns.length || !projectCards.length) return;

  function filterProjects(category) {
    let visibleCount = 0;

    projectCards.forEach(card => {
      const cardCategory = card.dataset.category;
      const shouldShow = (category === 'all') || (cardCategory === category);

      if (shouldShow) {
        card.classList.remove('is-hidden');
        card.classList.add('is-showing');
        visibleCount++;

        // Remove animation class after it completes (so it can re-trigger on next filter)
        setTimeout(() => card.classList.remove('is-showing'), 350);
      } else {
        card.classList.add('is-hidden');
        card.classList.remove('is-showing');
      }
    });

    // Show/hide empty state
    if (emptyState) {
      emptyState.classList.toggle('is-visible', visibleCount === 0);
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      // Filter
      filterProjects(btn.dataset.filter);
    });
  });

  // Start with "All" active
  const defaultBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (defaultBtn) {
    defaultBtn.classList.add('is-active');
  }
})();
