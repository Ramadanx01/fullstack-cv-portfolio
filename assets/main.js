document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer setup
  const animatedEls = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        // remove the class when it leaves the viewport so animation replays
        entry.target.classList.remove('in-view');
      }
    });
  }, observerOptions);

  animatedEls.forEach(el => {
    // Ensure initial state
    el.classList.add('anim');
    observer.observe(el);
  });

  // Mobile menu toggle (small helper)
  const menuBtn = document.getElementById('menuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  function openMenu() {
    mobileNav.classList.remove('translate-x-full');
    sidebarOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.add('translate-x-full');
    sidebarOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (menuBtn && mobileNav && closeMenuBtn && sidebarOverlay) {
    menuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    sidebarOverlay.addEventListener('click', closeMenu);

    // Close menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
  }

  // --- Active Nav Link Highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('nav-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach(section => navObserver.observe(section));

  // Dynamic certificate image fitting
  const certificateImages = document.querySelectorAll('.certificate-img');
  certificateImages.forEach(img => {
    // Ensure we run this after the image is loaded to get correct dimensions
    img.onload = () => {
      const isTall = img.naturalHeight > img.naturalWidth;
      // Use 'contain' for logos or tall images to prevent cropping
      // Check if the source contains 'MTEC' or if it's a tall image
      if (isTall || img.src.includes('MTEC-Software')) {
        img.style.objectFit = 'contain';
      } else {
        img.style.objectFit = 'cover';
      }
    };
    // If image is already cached/loaded, trigger onload manually
    if (img.complete) {
      img.onload();
    } else {
      img.addEventListener('load', () => {
        img.onload();
      });
    }
  });

  // Image Modal Logic
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const previewButtons = document.querySelectorAll('.preview-btn');

  function openImageModal(src) {
    modalImage.src = src;
    imageModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  if (imageModal && modalImage) {
    previewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Find the image inside the clicked element or its closest article
        const container = e.currentTarget; // This is the element with .preview-btn
        const imgToPreview = container.querySelector('.preview-img');
        if (imgToPreview) openImageModal(imgToPreview.src);
      });
    });

    imageModal.addEventListener('click', (e) => {
      imageModal.classList.add('hidden');
      document.body.style.overflow = ''; // Restore scrolling
    });
  }

  // --- Scroll Navigation Arrows ---
  const scrollUpBtn = document.getElementById('scrollUp');
  const scrollDownBtn = document.getElementById('scrollDown');
  const allSections = Array.from(document.querySelectorAll('#main-content > section'));

  function getNextSection(direction) {
    const currentScroll = window.scrollY;
    let targetSection = null;

    if (direction === 'down') {
      targetSection = allSections.find(section => section.offsetTop > currentScroll + window.innerHeight / 3);
    } else { // 'up'
      const upTargets = allSections.filter(section => section.offsetTop < currentScroll - window.innerHeight / 3);
      targetSection = upTargets.length > 0 ? upTargets[upTargets.length - 1] : allSections[0];
    }
    return targetSection;
  }

  scrollDownBtn.addEventListener('click', () => {
    getNextSection('down')?.scrollIntoView({ behavior: 'smooth' });
  });

  scrollUpBtn.addEventListener('click', () => {
    getNextSection('up')?.scrollIntoView({ behavior: 'smooth' });
  });

  // --- Theme (Dark/Light Mode) Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconLight = document.getElementById('theme-icon-light');
  const themeIconDark = document.getElementById('theme-icon-dark');
  const htmlEl = document.documentElement;

  // Function to set the theme
  function setTheme(theme) {
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
      themeIconLight.classList.add('hidden');
      themeIconDark.classList.remove('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlEl.classList.remove('dark');
      themeIconLight.classList.remove('hidden');
      themeIconDark.classList.add('hidden');
      localStorage.setItem('theme', 'light');
    }
  }

  // Check for saved theme in localStorage or user's system preference
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);

  // Add click listener to the toggle button
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.classList.contains('dark') ? 'dark' : 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // --- Auto-hide Header on Scroll (Mobile) ---
  let lastScrollY = window.scrollY;
  const header = document.getElementById('main-header');
  const headerHeight = header.offsetHeight;

  window.addEventListener('scroll', () => {
    // Apply this logic only for mobile screens
    if (window.innerWidth < 768) {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
        // Scrolling Down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling Up or at the top
        header.style.transform = 'translateY(0)';
      }
      lastScrollY = currentScrollY;
    }
  }, { passive: true });

  // --- Contact Form Placeholder Logic ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('contact-submit-btn');
      const formMessage = document.getElementById('form-message');

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Placeholder message
      formMessage.textContent = 'Form submission is currently under development. Please use the direct email link.';
    });
  }

  // --- "Show More" Projects Logic ---
  const showMoreBtn = document.getElementById('show-more-btn');
  const moreProjects = document.getElementById('more-projects');

  if (showMoreBtn && moreProjects) {
    showMoreBtn.addEventListener('click', () => {
      const isHidden = moreProjects.classList.contains('hidden');
      moreProjects.classList.toggle('hidden');

      // Update button text based on state (assuming i18n might be used later)
      if (isHidden) {
        showMoreBtn.textContent = 'Show Less';
      } else {
        showMoreBtn.textContent = 'Show More';
      }
    });
  }

  // --- Accessibility: Update HTML lang and dir ---
  // This function should be called from your i18n.js file whenever the language changes.
  // Example call from i18n.js: updateHtmlLang(newLang);
  /**
   * @param {string} currentLang The current language code ('ar' or 'en').
   */
  function updateHtmlLang(currentLang) {
    if (!currentLang) return;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  // Make it globally accessible to be called from i18n.js
  window.updateHtmlLang = updateHtmlLang;

});