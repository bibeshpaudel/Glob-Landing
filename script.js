/**
 * Glob Explorer — Linear Design Pattern System (https://linear.app)
 * Interactive Segmented Tabs, Mouse Spotlight, Keyboard Shortcut Filter & Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================================================
  // 1. Showcase Segmented Control & Views
  // ========================================================================
  const tabs = Array.from(document.querySelectorAll('.segmented-tab, .showcase-tab'));
  const slides = Array.from(document.querySelectorAll('.showcase-slide'));
  const captionBadge = document.getElementById('showcase-caption-badge');
  const captionText = document.getElementById('showcase-caption-text');
  const captionMetric = document.getElementById('showcase-caption-metric');
  const zoomBtn = document.getElementById('btn-zoom-current');

  const slideMetadata = [
    {
      badge: 'Search & Content Match',
      text: 'Simultaneous Files, Folders, and ripgrep Content matching with live folder & code inspection.',
      metric: '76 items · 291 ms',
      src: 'assets/search.png',
      alt: 'Glob Explorer simultaneous file, folder, and ripgrep content search with live folder inspector'
    },
    {
      badge: 'This PC & Drives',
      text: 'Instant NTFS/exFAT volume telemetry, storage capacity gauges, and pinned Quick Access locations.',
      metric: '7 items · 21 ms',
      src: 'assets/home.png',
      alt: 'Glob Explorer This PC and Drives view with real-time NTFS storage capacity inspector'
    },
    {
      badge: 'Live Preview & File Actions',
      text: 'Context-sensitive live preview pane with image dimensions, file metadata, and one-click native actions.',
      metric: '32 items · 2 ms',
      src: 'assets/preview.png',
      alt: 'Glob Explorer live image preview pane showing PNG resolution, byte size, and quick actions'
    },
    {
      badge: 'Developer Settings',
      text: 'Granular search controls for .gitignore rules, filename-only matching, hidden/system files, and WinUI 3 themes.',
      metric: 'Local JSON State',
      src: 'assets/setting.png',
      alt: 'Glob Explorer native WinUI 3 settings modal for theme and developer search filters'
    }
  ];

  let activeIndex = 0;

  function activateSlide(index) {
    if (index < 0 || index >= slides.length) return;
    activeIndex = index;

    tabs.forEach((tab, idx) => {
      const isSelected = idx === index;
      tab.classList.toggle('active', isSelected);
      tab.setAttribute('aria-selected', String(isSelected));
    });

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });

    const meta = slideMetadata[index];
    if (meta) {
      if (captionBadge) captionBadge.textContent = meta.badge;
      if (captionText) captionText.textContent = meta.text;
      if (captionMetric) captionMetric.textContent = meta.metric;
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      activateSlide(index);
    });

    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (index + 1) % tabs.length;
        tabs[next].focus();
        activateSlide(next);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = (index - 1 + tabs.length) % tabs.length;
        tabs[prev].focus();
        activateSlide(prev);
      }
    });
  });

  // ========================================================================
  // 2. Linear-Style Mouse Spotlight Effect on Cards
  // ========================================================================
  const spotlightCards = document.querySelectorAll('[data-spotlight], .bento-card, .shortcut-card, .privacy-container');
  
  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ========================================================================
  // 3. Interactive Shortcut Palette Filter
  // ========================================================================
  const shortcutInput = document.getElementById('shortcut-filter-input');
  const shortcutCards = Array.from(document.querySelectorAll('.shortcut-card, .shortcut-row'));
  const noShortcutsMsg = document.getElementById('no-shortcuts-msg');

  if (shortcutInput) {
    shortcutInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      let matchCount = 0;

      shortcutCards.forEach((card) => {
        const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
        const text = card.textContent.toLowerCase();
        const isMatch = !query || keywords.includes(query) || text.includes(query);

        card.style.display = isMatch ? 'flex' : 'none';
        if (isMatch) matchCount++;
      });

      if (noShortcutsMsg) {
        noShortcutsMsg.style.display = matchCount === 0 ? 'block' : 'none';
      }
    });
  }

  // Interactive pulse on shortcut click
  shortcutCards.forEach((card) => {
    card.addEventListener('click', () => {
      shortcutCards.forEach((c) => c.classList.remove('active-pulse'));
      card.classList.add('active-pulse');
      setTimeout(() => card.classList.remove('active-pulse'), 800);
    });
  });

  // ========================================================================
  // 4. Lightbox Fullscreen Preview
  // ========================================================================
  const lightbox = document.getElementById('screenshot-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(index) {
    const meta = slideMetadata[index] || slideMetadata[0];
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = meta.src;
    lightboxImg.alt = meta.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  slides.forEach((slide, index) => {
    const img = slide.querySelector('img');
    if (img) {
      img.addEventListener('click', () => openLightbox(index));
    }
  });

  if (zoomBtn) {
    zoomBtn.addEventListener('click', () => openLightbox(activeIndex));
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  // ========================================================================
  // 5. Scroll-Spy for Navigation Links
  // ========================================================================
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute('href')?.replace('#', '');
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  function onScroll() {
    const scrollPos = window.scrollY + 140;
    let currentId = '';
    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
