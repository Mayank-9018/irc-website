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

  window.addEventListener('scroll', () => {
    let currentSection = 'home';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSection}` || (currentSection === 'home' && href === '#home')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
});
