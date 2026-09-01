// ==========================================================================
// IIM Mumbai International Relations - JavaScript Interactivity
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- Elements ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  const brochureModal = document.getElementById('brochureModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const heroBrochureBtn = document.getElementById('heroBrochureBtn');
  const navBrochureBtn = document.getElementById('navBrochureBtn');
  const mobileBrochureBtn = document.getElementById('mobileBrochureBtn');
  const brochureForm = document.getElementById('brochureForm');
  const modalSuccessMsg = document.getElementById('modalSuccessMsg');

  // --- Mobile Drawer Toggle ---
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // --- Modal Open / Close Logic ---
  function openModal(e) {
    if (e) e.preventDefault();
    if (brochureModal) {
      brochureModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (modalSuccessMsg) modalSuccessMsg.style.display = 'none';
      if (brochureForm) brochureForm.style.display = 'block';
    }
  }

  function closeModal() {
    if (brochureModal) {
      brochureModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (heroBrochureBtn) heroBrochureBtn.addEventListener('click', openModal);
  if (navBrochureBtn) navBrochureBtn.addEventListener('click', openModal);
  if (mobileBrochureBtn) mobileBrochureBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Universal open brochure modal class trigger
  const genericBrochureBtns = document.querySelectorAll('.open-brochure-modal');
  genericBrochureBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  const viewOnlineBtn = document.getElementById('viewOnlineBtn');
  if (viewOnlineBtn) {
    viewOnlineBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const onlineViewerSection = document.getElementById('onlineViewerSection');
      if (onlineViewerSection) {
        onlineViewerSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Close modal on outside click
  if (brochureModal) {
    brochureModal.addEventListener('click', (e) => {
      if (e.target === brochureModal) {
        closeModal();
      }
    });
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && brochureModal && brochureModal.classList.contains('active')) {
      closeModal();
    }
  });

  // --- Programmes Filter Functionality ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const programmeCards = document.querySelectorAll('.programme-card');

  if (filterTabs.length > 0 && programmeCards.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');

        programmeCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Partner Institutions Region Filter Functionality ---
  const regionPills = document.querySelectorAll('.region-pill-btn');
  const matrixCells = document.querySelectorAll('.matrix-cell');

  if (regionPills.length > 0 && matrixCells.length > 0) {
    regionPills.forEach(pill => {
      pill.addEventListener('click', () => {
        regionPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const selectedRegion = pill.getAttribute('data-region');

        matrixCells.forEach(cell => {
          const cellRegion = cell.getAttribute('data-region');
          if (selectedRegion === 'all' || cellRegion === selectedRegion) {
            cell.classList.remove('hidden');
          } else {
            cell.classList.add('hidden');
          }
        });
      });
    });
  }

  // --- Brochure Form Submission ---
  if (brochureForm) {
    brochureForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = brochureForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Generating PDF...';
      submitBtn.disabled = true;

      setTimeout(() => {
        brochureForm.style.display = 'none';
        if (modalSuccessMsg) modalSuccessMsg.style.display = 'block';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        brochureForm.reset();

        // Automatically close after 3 seconds
        setTimeout(() => {
          closeModal();
        }, 3000);
      }, 900);
    });
  }

  // --- Active Nav Highlight on Scroll ---
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let currentSection = '';
      const scrollPosition = window.pageYOffset + 140;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      if (currentSection) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${currentSection}`) {
            link.classList.add('active');
          } else if (href && href.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  // --- Global Image Lightbox Modal (Expandable on Click) ---
  let lightboxModal = document.getElementById('imageLightbox');

  if (!lightboxModal) {
    lightboxModal = document.createElement('div');
    lightboxModal.id = 'imageLightbox';
    lightboxModal.className = 'lightbox-modal';
    lightboxModal.innerHTML = `
      <div class="lightbox-wrapper">
        <button class="lightbox-close-btn" id="lightboxCloseBtn" aria-label="Close image">&times;</button>
        <img src="" alt="" class="lightbox-img" id="lightboxImg">
        <div class="lightbox-caption" id="lightboxCaption"></div>
      </div>
    `;
    document.body.appendChild(lightboxModal);
  }

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  function openLightbox(src, alt) {
    if (lightboxImg && lightboxModal) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || 'Expanded View';
      if (lightboxCaption) {
        lightboxCaption.textContent = alt || '';
        lightboxCaption.style.display = alt ? 'block' : 'none';
      }
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (lightboxImg) lightboxImg.src = '';
      }, 300);
    }
  }

  // Attach click listener to all gallery & photo cards across the website
  const expandableSelectors = [
    '.facility-photo-box img',
    '.c-photo-item img',
    '.c-photo-large img',
    '.tradition-photo-card img',
    '.place-img-box img',
    '.exp-img-box img',
    '.facility-img',
    '.culture-img',
    '.tradition-img',
    '.place-img',
    '.exp-img',
    '.about-img'
  ];

  document.querySelectorAll(expandableSelectors.join(', ')).forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img.currentSrc || img.src, img.alt);
    });
  });

  // Also enable clicking the parent card wrapper
  document.querySelectorAll('.facility-photo-box, .c-photo-item, .c-photo-large, .tradition-photo-card, .place-img-box, .exp-img-box').forEach(card => {
    card.addEventListener('click', (e) => {
      const img = card.querySelector('img');
      if (img && e.target !== img) {
        openLightbox(img.currentSrc || img.src, img.alt);
      }
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-wrapper')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
});

