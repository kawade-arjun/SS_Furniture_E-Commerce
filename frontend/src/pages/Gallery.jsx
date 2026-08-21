import React, { useState, useEffect } from 'react';
import LightboxModal from '../components/LightboxModal';

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [filteredGallery, setFilteredGallery] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [loading, setLoading] = useState(true);

  // Fetch gallery list from backend API
  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
        setFilteredGallery(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching gallery:', err);
        setLoading(false);
      });
  }, []);

  // Filter items by category
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredGallery(gallery);
    } else {
      setFilteredGallery(gallery.filter((item) => item.category === activeCategory));
    }
  }, [activeCategory, gallery]);

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  return (
    <div>
      {/* PAGE HERO */}
      <section className="pt-32 pb-16 bg-gradient-dark text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="badge-gold">Interactive Lightbox Portfolio</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-4">Showroom & Home Gallery</h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto mb-8">
            Click any project card below to launch full-screen high-resolution view.
          </p>

          {/* Gallery Filter Tabs */}
          <div className="flex justify-center flex-wrap gap-2">
            {[
              { label: 'All Projects', value: 'All' },
              { label: 'Living Room', value: 'Living' },
              { label: 'Bedroom', value: 'Bedroom' },
              { label: 'Dining', value: 'Dining' },
              { label: 'Custom', value: 'Custom' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === tab.value
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'bg-white/20 text-white hover:bg-amber-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-16 bg-gradient-soft min-h-[600px]">
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">
            Loading Gallery Portfolio...
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No projects found in this category.
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer aspect-[4/3] glass-card"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <span className="badge-gold w-max mb-2">{item.category}</span>
                  <h4 className="font-serif text-lg font-bold text-white mb-1">{item.title}</h4>
                  <span className="text-xs text-amber-300 font-medium">Click to view full screen &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex >= 0 && (
        <LightboxModal
          list={filteredGallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
