document.addEventListener('DOMContentLoaded', () => {
  spawnFireflies(document.getElementById('hero-fireflies'), 74);
  spawnFireflies(document.getElementById('contact-fireflies'), 20);
  initRevealOnScroll();
  initNavToggle();
});

function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', e => {
    if (e.target.closest('a')) closeNav();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeNav();
  });
}

function initRevealOnScroll() {
  const els = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!els.length) return;

  els.forEach((el, i) => {
    el.classList.add('is-hidden');
    el.style.transitionDelay = (i % 5) * 70 + 'ms';
  });

  const show = el => el.classList.remove('is-hidden');

  if (!('IntersectionObserver' in window)) {
    els.forEach(show);
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        show(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  els.forEach(el => io.observe(el));

  // Safety net in case an element never intersects (e.g. hidden ancestor).
  setTimeout(() => els.forEach(show), 2500);
}
