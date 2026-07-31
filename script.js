// Live status bar clock — Android system-bar style, updates every minute
function updateStatusTime() {
  const el = document.getElementById('statusTime');
  if (!el) return;
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  el.textContent = `${h}:${m} ${ampm}`;
}
updateStatusTime();
setInterval(updateStatusTime, 15000);

// Nav background state on scroll
const nav = document.getElementById('nav');
function handleNavScroll() {
  if (window.scrollY > 12) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
handleNavScroll();
window.addEventListener('scroll', handleNavScroll, { passive: true });

// Scroll-reveal for project cards
const revealTargets = document.querySelectorAll('.project, .exp-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach((el) => revealObserver.observe(el));

// Fallback: if IntersectionObserver isn't available, just show everything
if (!('IntersectionObserver' in window)) {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// Minimal lightbox for the screenshot gallery
const galleryImages = document.querySelectorAll('.gallery-strip img');
if (galleryImages.length) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = '<img class="lightbox__img" alt="">';
  document.body.appendChild(overlay);
  const lightboxImg = overlay.querySelector('.lightbox__img');

  galleryImages.forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      overlay.classList.add('is-open');
    });
  });

  overlay.addEventListener('click', () => overlay.classList.remove('is-open'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.classList.remove('is-open');
  });
}
