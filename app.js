/**
 * ICONIC TATTOO STUDIO BALI — Interactive Core Application
 * Handles gallery filtering, interactive estimator, lightbox modal, FAQ, and Netlify Forms AJAX
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initGallery();
  initEstimator();
  initFaqAccordion();
  initArtistBookingLinks();
  initConsultationForm();
  initTourEnquiryLinks();
});

/* Day Tours & Events: preselect the enquiry type */
function initTourEnquiryLinks() {
  document.querySelectorAll('[data-enquiry]').forEach(link => {
    link.addEventListener('click', () => {
      const select = document.getElementById('form-enquiry-type');
      if (select) select.value = link.getAttribute('data-enquiry');
    });
  });
}

/* ==========================================================================
   1. Header Scroll Behavior
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.site-header');
  const links = document.querySelectorAll('.nav-links a');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('mobile-nav-active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('mobile-nav-active');
    });
  });
}

/* ==========================================================================
   3. Gallery Filtering & Lightbox Modal
   ========================================================================== */
const galleryData = [
  {
    id: 'g1',
    category: 'balinese',
    title: 'Balinese Barong Mask',
    artist: 'Iconic Tattoo Studio',
    technique: 'Dotwork Shading & Fine Linework',
    duration: 'Quoted on consultation',
    image: 'assets/portfolio/barong-mask.jpg',
    description: 'A sacred Balinese Barong mask on the forearm, the protective spirit of Balinese mythology, framed with frangipani and traditional carving motifs.'
  },
  {
    id: 'g2',
    category: 'fineline',
    title: 'Family Names Script',
    artist: 'Iconic Tattoo Studio',
    technique: 'Fine Line Script Lettering',
    duration: 'Quoted on consultation',
    image: 'assets/portfolio/script-names.jpg',
    description: 'Flowing hand-lettered names linked with delicate hearts, a meaningful tribute that sits beautifully along the forearm.'
  },
  {
    id: 'g3',
    category: 'fineline',
    title: 'Fine Line Ornamental Lotus',
    artist: 'Iconic Tattoo Studio',
    technique: 'Single Needle Fine Line',
    duration: 'Quoted on consultation',
    image: 'assets/portfolio/fineline-lotus.jpg',
    description: 'A dainty ornamental lotus with flourishes and a guiding star, crisp and minimal on the lower leg.'
  },
  {
    id: 'g4',
    category: 'polynesian',
    title: 'Polynesian Manta Ray',
    artist: 'Iconic Tattoo Studio',
    technique: 'Bold Blackwork & Tribal Patterning',
    duration: 'Quoted on consultation',
    image: 'assets/portfolio/polynesian-manta.jpg',
    description: 'A Polynesian-style manta ray on the calf, filled with traditional tribal patterning symbolising grace, strength and freedom.'
  },
  {
    id: 'g5',
    category: 'blackgrey',
    title: 'See, Hear, Speak No Evil Dolls',
    artist: 'Iconic Tattoo Studio',
    technique: 'Black & Grey Illustrative Shading',
    duration: 'Quoted on consultation',
    image: 'assets/portfolio/illustrative-dolls.jpg',
    description: 'A playful, slightly dark illustrative stack of button-eyed dolls, a modern take on the three wise monkeys.'
  },
  {
    id: 'g6',
    category: 'fineline',
    title: 'Fine Line In Progress',
    artist: 'Iconic Tattoo Studio',
    technique: 'Fine Line Single Needle',
    duration: 'Quoted on consultation',
    image: 'assets/portfolio/studio-fineline-process.jpg',
    description: 'Behind the scenes at our Kuta studio: fresh single-use cartridges, gloved hands and steady fine linework.'
  }
];

function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('gallery-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalArtist = document.getElementById('modal-artist');
  const modalTechnique = document.getElementById('modal-technique');
  const modalDuration = document.getElementById('modal-duration');
  const modalDesc = document.getElementById('modal-desc');
  const modalBookBtn = document.getElementById('modal-book-btn');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox Open
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const pieceId = item.getAttribute('data-id');
      const data = galleryData.find(p => p.id === pieceId);
      if (!data) return;

      modalImg.src = data.image;
      modalImg.alt = data.title;
      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category.toUpperCase();
      modalArtist.textContent = data.artist;
      modalTechnique.textContent = data.technique;
      modalDuration.textContent = data.duration;
      modalDesc.textContent = data.description;

      modalBookBtn.onclick = () => {
        closeModal();
        prefillFormFromArtwork(data);
      };

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Lightbox Close
  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function prefillFormFromArtwork(data) {
  const artistSelect = document.getElementById('form-artist');
  const styleSelect = document.getElementById('form-style');
  const descTextarea = document.getElementById('form-desc');
  const bookingSection = document.getElementById('booking');

  if (artistSelect) {
    for (let opt of artistSelect.options) {
      if (opt.text.toLowerCase().includes(data.artist.split(' ')[0].toLowerCase())) {
        artistSelect.value = opt.value;
        break;
      }
    }
  }

  if (styleSelect) {
    for (let opt of styleSelect.options) {
      if (opt.value === data.category) {
        styleSelect.value = opt.value;
        break;
      }
    }
  }

  if (descTextarea) {
    descTextarea.value = `Inspired by your portfolio piece "${data.title}". `;
  }

  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ==========================================================================
   4. Interactive Session & Quote Estimator
   ========================================================================== */
function initEstimator() {
  const sizeRadios = document.querySelectorAll('input[name="est-size"]');
  const placementRadios = document.querySelectorAll('input[name="est-placement"]');
  const styleRadios = document.querySelectorAll('input[name="est-style"]');
  const applyBtn = document.getElementById('apply-estimator-btn');

  const estDurationEl = document.getElementById('est-duration');
  const estSessionsEl = document.getElementById('est-sessions');
  const estRecommendedArtistEl = document.getElementById('est-recommended-artist');
  const estHealingEl = document.getElementById('est-healing');

  const artistMap = {
    'fineline': 'Iconic Resident Artist (Fine Line)',
    'balinese': 'Iconic Resident Artist (Sacred Balinese)',
    'realism': 'Iconic Resident Artist (Black & Grey)',
    'irezumi': 'Iconic Resident Artist (Japanese)',
    'geometry': 'Iconic Resident Artist (Geometry & Dotwork)'
  };

  const calculateEstimate = () => {
    const selectedSize = document.querySelector('input[name="est-size"]:checked')?.value || 'medium';
    const selectedPlacement = document.querySelector('input[name="est-placement"]:checked')?.value || 'forearm';
    const selectedStyle = document.querySelector('input[name="est-style"]:checked')?.value || 'fineline';

    let durationText = '2.5 – 3.5 Hours';
    let sessionsText = 'Single Session';
    let healingText = '10–14 Days';

    if (selectedSize === 'micro') {
      durationText = '1.0 – 1.5 Hours';
      sessionsText = 'Single Session';
      healingText = '7–10 Days';
    } else if (selectedSize === 'small') {
      durationText = '1.5 – 2.5 Hours';
      sessionsText = 'Single Session';
      healingText = '10 Days';
    } else if (selectedSize === 'medium') {
      durationText = '3.0 – 4.5 Hours';
      sessionsText = 'Single Session';
      healingText = '12–14 Days';
    } else if (selectedSize === 'large') {
      durationText = '5.0 – 7.0 Hours';
      sessionsText = 'Full-Day Session';
      healingText = '14–18 Days';
    } else if (selectedSize === 'sleeve') {
      durationText = '18 – 30+ Hours Total';
      sessionsText = '3 to 5 Full-Day Sessions';
      healingText = 'Phased over 6–8 Weeks';
    }

    if (estDurationEl) estDurationEl.textContent = durationText;
    if (estSessionsEl) estSessionsEl.textContent = sessionsText;
    if (estHealingEl) estHealingEl.textContent = healingText;
    if (estRecommendedArtistEl) {
      estRecommendedArtistEl.textContent = artistMap[selectedStyle] || 'Master Resident Artist';
    }
  };

  [...sizeRadios, ...placementRadios, ...styleRadios].forEach(input => {
    input.addEventListener('change', calculateEstimate);
  });

  calculateEstimate();

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const selectedSize = document.querySelector('input[name="est-size"]:checked')?.value || 'medium';
      const selectedPlacement = document.querySelector('input[name="est-placement"]:checked')?.value || 'forearm';
      const selectedStyle = document.querySelector('input[name="est-style"]:checked')?.value || 'fineline';

      const formSize = document.getElementById('form-size');
      const formPlacement = document.getElementById('form-placement');
      const formStyle = document.getElementById('form-style');
      const formArtist = document.getElementById('form-artist');
      const bookingSection = document.getElementById('booking');

      if (formSize) formSize.value = selectedSize;
      if (formPlacement) formPlacement.value = selectedPlacement;
      if (formStyle) formStyle.value = selectedStyle;

      if (formArtist) formArtist.value = 'any';
      const formEnquiry = document.getElementById('form-enquiry-type');
      if (formEnquiry) formEnquiry.value = 'tattoo';

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/* ==========================================================================
   5. FAQ Accordion Toggle
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   6. Artist Profile Quick Booking Links
   ========================================================================== */
function initArtistBookingLinks() {
  const artistLinks = document.querySelectorAll('.artist-book-link');
  const artistSelect = document.getElementById('form-artist');
  const bookingSection = document.getElementById('booking');

  artistLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const artistVal = link.getAttribute('data-artist');
      if (artistSelect && artistVal) {
        artistSelect.value = artistVal;
      }
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   7. Netlify Forms AJAX Submission
   ========================================================================== */
function initConsultationForm() {
  const form = document.getElementById('consultation-form');
  const successAlert = document.getElementById('form-success-alert');
  const errorAlert = document.getElementById('form-error-alert');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (successAlert) successAlert.style.display = 'none';
    if (errorAlert) errorAlert.style.display = 'none';

    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Sending Enquiry...
      `;
    }

    try {
      const formData = new FormData(form);
      const urlEncoded = new URLSearchParams(formData).toString();

      // Submit via AJAX targeting static root or static form file for Netlify form processing
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlEncoded
      });

      if (response.ok) {
        if (successAlert) {
          successAlert.style.display = 'block';
          successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        form.reset();
      } else {
        throw new Error(`Submission failed with status: ${response.status}`);
      }
    } catch (err) {
      console.warn('Form submission error, checking fallback:', err);
      // Fallback submit to root
      try {
        const formData = new FormData(form);
        const urlEncoded = new URLSearchParams(formData).toString();
        const fallbackRes = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: urlEncoded
        });
        if (fallbackRes.ok) {
          if (successAlert) successAlert.style.display = 'block';
          form.reset();
        } else {
          if (errorAlert) errorAlert.style.display = 'block';
        }
      } catch (fallbackErr) {
        if (errorAlert) errorAlert.style.display = 'block';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}
