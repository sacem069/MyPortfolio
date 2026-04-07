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
