import React, { useEffect } from 'react';

export default function LightboxModal({ list, currentIndex, onClose, onPrev, onNext }) {
  const activeItem = list[currentIndex];

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!activeItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md active">
      {/* Top Navbar details inside Lightbox */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between text-white z-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            {activeItem.category} Showcase
          </span>
          <h4 className="font-serif text-lg font-bold mt-1">{activeItem.title}</h4>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-amber-400 text-3xl font-bold bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-all"
        >
          &times;
        </button>
      </div>

      {/* Main Image View */}
      <div className="relative w-full max-w-5xl max-h-[70vh] flex items-center justify-center p-4">
        <img
          src={activeItem.image}
          alt={activeItem.title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
        />

        {/* Carousel buttons */}
        <button
          onClick={onPrev}
          className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={onNext}
          className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom controls reminder */}
      <div className="absolute bottom-6 text-gray-500 text-xs flex gap-4">
        <span>Use Arrow keys &larr; &rarr; to browse</span>
        <span>&middot;</span>
        <span>Esc to close</span>
      </div>
    </div>
  );
}
