// Smooth scrolling for nav links
document.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.closest('.nav__link')) {
      navLinks.classList.remove('open');
    }
  });
}

// Theme toggle with localStorage
const themeToggle = document.querySelector('.theme-toggle');
const themeToggleIcon = themeToggle ? themeToggle.querySelector('i') : null;
const prefersLight = window.matchMedia('(prefers-color-scheme: light)');

function setTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light');
  } else {
    document.body.classList.remove('light');
  }
  localStorage.setItem('theme', mode);
  if (themeToggleIcon) {
    themeToggleIcon.className = mode === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else if (prefersLight.matches) {
  setTheme('light');
} else {
  setTheme('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
  });
}

// Animate skills bars when section visible
const skillsSection = document.querySelector('#skills .section__inner');
if (skillsSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillsSection.classList.add('skills--visible');
          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  observer.observe(skillsSection);
}

// Highlight active nav link on scroll
const sections = document.querySelectorAll('main section[id]');
const navLinkEls = document.querySelectorAll('.nav__link');

const onScroll = () => {
  const scrollPos = window.scrollY + 90;
  let currentId = '';

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      currentId = section.id;
    }
  });

  navLinkEls.forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href === `#${currentId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', onScroll);
onScroll();

// Contact form handler (front-end only demo)
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  form.reset();
  alert('Thank you! Your message has been recorded on this demo site.');
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

