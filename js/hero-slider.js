/**
 * SS Furniture - Hero Slider Controller
 * Controls Full-screen Hero Banner Slides, Auto-rotation & Animation Triggers
 */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoSlideTimer = null;
  const INTERVAL_TIME = 5500;

  function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('bg-amber-500', 'w-8');
        dot.classList.remove('bg-white/50', 'w-3');
      } else {
        dot.classList.remove('bg-amber-500', 'w-8');
        dot.classList.add('bg-white/50', 'w-3');
      }
    });

    currentIndex = index;
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, INTERVAL_TIME);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      startAutoSlide();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startAutoSlide();
    });
  });

  // Pause on hover
  const heroSection = document.getElementById('hero-slider-section');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoSlide);
    heroSection.addEventListener('mouseleave', startAutoSlide);
  }

  showSlide(0);
  startAutoSlide();
});
