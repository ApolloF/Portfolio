/* ===== Portfolio JS — Florian Greeven ===== */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initScrollReveal();
  initSkillBars();
  initNavigation();
  initCustomCursor();
  initMobileMenu();
  initImageLightbox();
});

/* ===== Typing Effect ===== */
function initTypingEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Creative Technologist',
    'System Administrator',
    '3D Print Enthusiast',
    'Maker & Builder'
  ];

  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function tick() {
    const current = phrases[phraseIdx];
    if (!isDeleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        setTimeout(() => { isDeleting = true; tick(); }, 2200);
        return;
      }
      setTimeout(tick, 70 + Math.random() * 40);
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 35);
    }
  }
  setTimeout(tick, 800);
}

/* ===== Scroll Reveal ===== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ===== Skill Bars ===== */
function initSkillBars() {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const level = bar.getAttribute('data-level');
    const skill = bar.getAttribute('data-skill');

    // Create inner elements
    const fill = document.createElement('div');
    fill.className = 'skill-bar__fill';
    bar.appendChild(fill);

    const pct = document.createElement('span');
    pct.className = 'skill-bar__pct';
    pct.textContent = level + '%';
    bar.appendChild(pct);

    // Update the before pseudo content to include percentage
    bar.style.setProperty('--skill-name', `"${skill}"`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-bar__fill');
        const level = entry.target.getAttribute('data-level');
        if (fill) {
          setTimeout(() => {
            fill.style.width = level + '%';
            entry.target.classList.add('animated');
          }, 200);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-bar').forEach(bar => observer.observe(bar));
}

/* ===== Navigation Active State ===== */
function initNavigation() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-section') === id);
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));

  // Smooth scroll on nav click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.getAttribute('data-section'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu
        document.getElementById('sidebar')?.classList.remove('open');
        document.getElementById('menuToggle')?.classList.remove('active');
        document.querySelector('.sidebar-backdrop')?.classList.remove('active');
      }
    });
  });
}

/* ===== Custom Cursor ===== */
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  // Check if touch device
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .detail-card, .skill-category, .project-card__image, .skill-tools__image, .profile-photo');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      follower.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      follower.classList.remove('hovering');
    });
  });
}

/* ===== Mobile Menu ===== */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  if (!toggle || !sidebar) return;

  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'sidebar-backdrop';
  document.body.appendChild(backdrop);

  function toggleMenu() {
    sidebar.classList.toggle('open');
    toggle.classList.toggle('active');
    backdrop.classList.toggle('active');
  }

  toggle.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', toggleMenu);
}

/* ===== Image Lightbox ===== */
function initImageLightbox() {
  const images = document.querySelectorAll('.project-card__image, .skill-tools__image, .profile-photo');
  if (!images.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Enlarged image');
  lightbox.innerHTML = `
    <button class="image-lightbox__close" type="button" aria-label="Close enlarged image">&times;</button>
    <div class="image-lightbox__dialog">
      <img class="image-lightbox__image" alt="">
      <p class="image-lightbox__caption"></p>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('.image-lightbox__image');
  const caption = lightbox.querySelector('.image-lightbox__caption');
  const closeBtn = lightbox.querySelector('.image-lightbox__close');
  let lastFocused = null;

  function openImage(img) {
    lastFocused = document.activeElement;
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || 'Portfolio image';
    caption.textContent = img.alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeImage() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImage.removeAttribute('src');
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  images.forEach(img => {
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('aria-label', `Enlarge image: ${img.alt || 'portfolio image'}`);

    img.addEventListener('click', () => openImage(img));
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openImage(img);
      }
    });
  });

  closeBtn.addEventListener('click', closeImage);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeImage();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('active')) {
      closeImage();
    }
  });
}
