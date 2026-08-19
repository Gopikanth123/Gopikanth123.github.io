/* ============================================
   INTERACTIVE JAVASCRIPT — PORTFOLIO
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Navigation Scroll Effect ----
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ---- Active Nav Link Highlight ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observerOptions = {
    rootMargin: '-20% 0px -60% 0px',
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

  // ---- Mobile Nav Toggle ----
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  let mobileNavOpen = false;

  navToggle.addEventListener('click', () => {
    mobileNavOpen = !mobileNavOpen;
    mobileNav.classList.toggle('open', mobileNavOpen);
    navToggle.classList.toggle('open', mobileNavOpen);
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNavOpen = false;
      mobileNav.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Scroll Reveal ----
  const revealElements = document.querySelectorAll(
    '.glass-card, .section__header, .service-card, .project-card, .skill-category, .timeline__item, .credential-card, .contact-link'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Stat Counter Animation ----
  const statValues = document.querySelectorAll('.hero__stat-value[data-count]');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        animateCount(el, 0, target, 1500);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => countObserver.observe(el));

  function animateCount(el, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(start + (end - start) * eased);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ---- Project Filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
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
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---- Smooth Scroll for Nav Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Skill Tags Stagger Animation ----
  const skillCategories = document.querySelectorAll('.skill-category');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('.skill-category__tags span');
        tags.forEach((tag, i) => {
          tag.style.opacity = '0';
          tag.style.transform = 'translateY(10px) scale(0.9)';
          setTimeout(() => {
            tag.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0) scale(1)';
          }, i * 40);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillCategories.forEach(cat => skillObserver.observe(cat));

  // ---- Parallax glow on mouse move ----
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.querySelectorAll('.bg-glow').forEach((glow, i) => {
      const speed = (i + 1) * 15;
      glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // ---- Typing cursor on hero badge ----
  const badge = document.querySelector('.hero__badge');
  if (badge) {
    badge.style.cursor = 'default';
  }
});

// ---- Project Expand/Collapse ----
function toggleProject(btn) {
  const details = btn.nextElementSibling;
  const isOpen = details.classList.contains('open');

  // Close all other open details
  document.querySelectorAll('.project-card__details.open').forEach(d => {
    d.classList.remove('open');
    d.previousElementSibling.classList.remove('expanded');
    d.previousElementSibling.querySelector('span').textContent = 'View Details';
  });

  if (!isOpen) {
    details.classList.add('open');
    btn.classList.add('expanded');
    btn.querySelector('span').textContent = 'Hide Details';
  }
}
