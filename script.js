const header = document.querySelector('#header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
};

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'false';
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileMenu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
});

mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const tabs = document.querySelectorAll('.menu-tabs button');
const panels = document.querySelectorAll('.menu-panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    tabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    panels.forEach((panel) => {
      const selected = panel.dataset.panel === filter;
      panel.hidden = !selected;
      panel.classList.toggle('active', selected);
    });
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

document.querySelector('#year').textContent = new Date().getFullYear();
