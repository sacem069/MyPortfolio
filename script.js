// ─── HIGHLIGHT REVEAL ────────────────────────────────────────────────────────
function initHighlights() {
  const elements = document.querySelectorAll('.highlight-reveal');
  if (!elements.length) return;

  // Inject .highlight-bg span into each element
  elements.forEach(function (el) {
    if (!el.querySelector('.highlight-bg')) {
      const bg = document.createElement('span');
      bg.className = 'highlight-bg';
      el.appendChild(bg);
    }
  });

  function trigger(el) {
    el.classList.add('is-highlighted');
  }

  // Separate in-viewport elements from below-the-fold ones
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        trigger(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // 1000ms delay for elements already in view; observe the rest
  setTimeout(function () {
    elements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        trigger(el);
      } else {
        observer.observe(el);
      }
    });
  }, 1500);
}

initHighlights();

// Fit case study title to full screen width
(function () {
  function fitTitle() {
    var title = document.querySelector('.cs-hero__title');
    if (!title) return;
    var targetW = window.innerWidth - 16; // 16px left padding
    var size = 8;
    title.style.fontSize = size + 'px';
    while (title.scrollWidth < targetW && size < 300) {
      size += 0.5;
      title.style.fontSize = size + 'px';
    }
    title.style.fontSize = (size - 0.5) + 'px';
  }
  document.fonts.ready.then(fitTitle);
  window.addEventListener('resize', fitTitle);
})();

// Hide nav on scroll down, show on scroll up (case study pages only)
(function () {
  if (!document.querySelector('.case-study')) return;
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const current = window.scrollY;
    if (current > lastScroll && current > 80) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }
    lastScroll = current;
  }, { passive: true });
})();

// White nav background when scrolled past hero
(function () {
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero');
  if (!nav || !hero) return;

  function updateNav() {
    if (window.scrollY >= hero.offsetHeight - 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('nav__link--active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('nav__link--active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// Scroll-reveal for interview chat bubbles
(function () {
  const bubbles = document.querySelectorAll('[data-bubble]');
  if (!bubbles.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.bubbleDelay || 0;
          setTimeout(() => el.classList.add('is-visible'), Number(delay));
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.2 }
  );

  bubbles.forEach((bubble, i) => {
    bubble.dataset.bubbleDelay = i * 300;
    observer.observe(bubble);
  });
})();
