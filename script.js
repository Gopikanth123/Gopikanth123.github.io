/* ==========================================================================
   INTERACTIVE SCRIPTS — GOPIKANTH TIRUMANI
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- 1. Sticky Navigation & Active Section Spy ----
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  });

  const observerOptions = {
    rootMargin: '-25% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ---- 2. Mobile Navigation Toggle ----
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  let isMobileOpen = false;

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      isMobileOpen = !isMobileOpen;
      mobileNav.classList.toggle('open', isMobileOpen);
      document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav__link').forEach(link => {
      link.addEventListener('click', () => {
        isMobileOpen = false;
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- 3. Smooth Scrolling ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ---- 4. Animated Number Counters ----
  const counters = document.querySelectorAll('.stat-num [data-count]');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateValue(el, 0, target, 1200);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => countObserver.observe(el));

  function animateValue(el, start, end, duration) {
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // ---- 5. Project Filtering Pills ----
  const filterBtns = document.querySelectorAll('.pill-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.dataset.category || '';
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});

// ---- 6. Expand / Collapse Project Details & Architecture ----
function toggleDetails(btn) {
  const card = btn.closest('.project-card');
  if (!card) return;
  const body = card.querySelector('.proj-expanded-body');
  if (!body) return;

  const isOpen = body.classList.contains('open');

  if (isOpen) {
    body.classList.remove('open');
    btn.classList.remove('expanded');
    btn.querySelector('span').textContent = 'View Architecture & Details';
  } else {
    body.classList.add('open');
    btn.classList.add('expanded');
    btn.querySelector('span').textContent = 'Hide Architecture & Details';
  }
}
