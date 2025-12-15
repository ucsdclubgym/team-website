// nav bar toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !isOpen);
  navMenu.classList.toggle('nav-open');
});