document.addEventListener('DOMContentLoaded', () => {
  spawnFireflies(document.getElementById('hero-fireflies'), 74);
  spawnFireflies(document.getElementById('contact-fireflies'), 20);
  initRevealOnScroll();
});

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
