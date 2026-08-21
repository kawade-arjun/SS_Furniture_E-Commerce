import React from 'react';

export default function About() {
  return (
    <div>
      {/* PAGE HERO */}
      <section className="pt-32 pb-20 bg-gradient-dark text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="badge-gold">Our Legacy & Craftsmanship</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-4">About SS Furniture</h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Building generational furniture engineered with solid teak wood, Italian marble, and master carpentry since 2011.
          </p>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="glass-card p-10 space-y-4 border-l-4 border-amber-600 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl font-bold">👁️</div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">Our Vision</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              To be India’s most revered luxury furniture brand, setting benchmarks in sustainable timber sourcing, architectural aesthetics, and uncompromised structural longevity.
            </p>
          </div>

          {/* Mission */}
          <div className="glass-card p-10 space-y-4 border-l-4 border-amber-600 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl font-bold">🎯</div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              To empower homeowners and interior designers with tailored, factory-direct furniture pieces crafted from seasoned solid wood without intermediary price inflation.
            </p>
          </div>
        </div>
      </section>

      {/* OUR STORY & CRAFTSMANSHIP */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl glass-card p-2">
            <img
              src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80"
              alt="Carpentry Workshop"
              className="w-full h-auto rounded-2xl"
            />
          </div>

          <div className="space-y-6 text-left">
            <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
              15 Years of Heritage
            </span>
            <h2 className="font-serif text-3xl font-bold text-gray-900">Crafted with Seasoned Precision</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              At SS Furniture, we believe that wood is alive—it breathes, expands, and carries a story. That is why every log of Teak or Sheesham entering our workshop undergoes 6 weeks of controlled kiln seasoning to ensure zero shrinkage or warping over decades of usage.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our team of over 45 master woodcarvers and upholstered craftsmen combine traditional dovetail joinery with modern computer-numerical tooling for micron-level precision.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 text-center">
              <div>
                <span className="text-2xl font-bold text-amber-800">45+</span>
                <p className="text-xs text-gray-500">Master Craftsmen</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-amber-800">12,000+</span>
                <p className="text-xs text-gray-500">Delivered Homes</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-amber-800">100%</span>
                <p className="text-xs text-gray-500">Kiln Seasoned</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
