(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  const saved = localStorage.getItem('theme');
  const preferred = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  root.setAttribute('data-theme', preferred);

  toggle.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Lightbox — project images only
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img class="lightbox-img" src="" alt="">';
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector('.lightbox-img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    overlay.classList.add('active');
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    lightboxImg.src = '';
  }

  document.querySelectorAll('#projects .card-image').forEach(function (frame) {
    const img = frame.querySelector('img');
    if (!img) return;
    frame.classList.add('zoomable');
    frame.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();
