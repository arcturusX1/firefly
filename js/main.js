document.addEventListener('DOMContentLoaded', () => {
  spawnFireflies(document.getElementById('hero-fireflies'), 74);
  spawnFireflies(document.getElementById('contact-fireflies'), 20);
  initRevealOnScroll();
  initNavToggle();
  initHeaderScroll();
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

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const hero = document.getElementById('home');
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  if (!header || !hero) return;

  const setScrolled = scrolled => {
    header.classList.toggle('is-scrolled', scrolled);
    if (scrolled && nav && toggle) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  };

  if (!('IntersectionObserver' in window)) {
    const check = () => setScrolled(window.scrollY > hero.offsetHeight - 96);
    window.addEventListener('scroll', check);
    check();
    return;
  }

  const observer = new IntersectionObserver(([entry]) => {
    setScrolled(!entry.isIntersecting);
  }, { rootMargin: '-96px 0px 0px 0px' });

  observer.observe(hero);
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
