import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SLIDES_DATA = [
  {
    badge: 'Handcrafted Perfection',
    title: 'Redefine Luxury Living With SS Furniture',
    description: 'Discover bespoke solid wood furniture, artisan Chesterfield sofas, and tailored interior creations built to inspire generations.',
    bg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80',
    btnLink: '/products',
    btnText: 'Explore Collection',
    hasCustomizerBtn: true
  },
  {
    badge: 'Artisan Dining Collection',
    title: 'Gather Around Italian Marble & Teak Elegance',
    description: 'Transform meal times into regal dining experiences with custom-crafted marble tops and solid Sheesham wood dining suites.',
    bg: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2000&q=80',
    btnLink: '/products?category=Dining Tables',
    btnText: 'View Dining Sets',
    hasCustomizerBtn: false
  },
  {
    badge: 'Sanctuary Bedding',
    title: 'Sleep In Masterpiece Walnut Beds',
    description: 'Hydraulic storage convenience meets velvet upholstered luxury. Engineered for lifetime structural durability.',
    bg: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80',
    btnLink: '/products?category=Beds',
    btnText: 'Browse Bedrooms',
    hasCustomizerBtn: false
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const INTERVAL_TIME = 5500;

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES_DATA.length);
    }, INTERVAL_TIME);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
    return () => stopAutoSlide();
  }, [isHovered, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES_DATA.length) % SLIDES_DATA.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES_DATA.length);
  };

  const scrollToCustomizer = (e) => {
    e.preventDefault();
    const customizerEl = document.getElementById('customizer-section');
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-slider-section"
      className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden bg-gray-900 pt-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {SLIDES_DATA.map((slide, idx) => (
        <div
          key={idx}
          className={`hero-slide absolute inset-0 ${
            idx === currentIndex ? 'active' : ''
          }`}
        >
          {/* Background image with scaling transition */}
          <div
            className="absolute inset-0 bg-cover bg-center hero-slide-bg"
            style={{
              backgroundImage: `url('${slide.bg}')`,
              transform: idx === currentIndex ? 'scale(1)' : 'scale(1.08)',
              transition: 'transform 7s ease-out',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl text-white space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs uppercase tracking-widest font-semibold backdrop-blur-md animate-fade-in">
                {slide.badge}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed animate-fade-in">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to={slide.btnLink} className="btn-gold text-sm py-3.5 px-8">
                  {slide.btnText}
                </Link>
                {slide.hasCustomizerBtn && (
                  <a
                    href="#customizer-section"
                    onClick={scrollToCustomizer}
                    className="btn-outline-wood text-sm py-3.5 px-8 !text-white !border-white/50 hover:!border-amber-400 hover:!bg-amber-400/20"
                  >
                    Custom Furniture Quote
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slider Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all z-20"
        aria-label="Previous Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all z-20"
        aria-label="Next Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {SLIDES_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`hero-dot rounded-full transition-all ${
              idx === currentIndex ? 'bg-amber-500 w-8 h-3' : 'bg-white/50 w-3 h-3'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
