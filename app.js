/* ============================================== ALL YOUR ORIGINAL FUNCTIONALITY (100% PRESERVED) ============================================== */
// Mobile menu toggle
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});

// Close mobile menu on link click + smooth scroll to top
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    nav.classList.remove('open');
    if (link.getAttribute('href') === '#top') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});

// Scroll reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

// Original working cursor glow (instant follow, no lag, exact original behavior)
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

/* ============================================== DARK MODE FUNCTIONALITY (ADDED, NO CONFLICTS WITH YOUR ORIGINAL CODE) ============================================== */
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// Initialize theme on page load (matches the no-flash script in your HTML head)
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.classList.add('dark');
  }
};

// Run theme initialization on load
initTheme();

// Toggle theme on button click, save preference to localStorage
themeToggle.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');
  localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
});

// Auto-update theme if user changes system preference (if they haven't set a manual preference)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    htmlElement.classList.toggle('dark', e.matches);
  }
});