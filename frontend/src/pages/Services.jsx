import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div>
      {/* PAGE HERO */}
      <section className="pt-32 pb-16 bg-gradient-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="badge-gold">End-To-End Luxury Solutions</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-4">Our Services</h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            From custom blueprint design to white-glove setup and post-purchase care.
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Service 1 */}
          <div className="glass-card p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            <div className="md:col-span-4 rounded-xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80"
                alt="Custom Design"
                className="w-full h-56 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
            <div className="md:col-span-8 space-y-3">
              <span className="badge-gold">Bespoke Crafting</span>
              <h2 className="font-serif text-2xl font-bold text-gray-900">Custom Furniture Manufacturing</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Have a custom blueprint or Pinterest inspiration? Select your choice of seasoned Teak, Sheesham, or Walnut wood alongside Italian upholstery. We build furniture tailored to your exact floorplan millimeter dimensions.
              </p>
              <Link to="/#customizer-section" className="btn-gold text-xs py-2 px-5 inline-block">
                Use Custom Estimator &rarr;
              </Link>
            </div>
          </div>

          {/* Service 2 */}
          <div className="glass-card p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            <div className="md:col-span-4 rounded-xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80"
                alt="Interior Consultation"
                className="w-full h-56 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
            <div className="md:col-span-8 space-y-3">
              <span className="badge-gold">Architectural Advice</span>
              <h2 className="font-serif text-2xl font-bold text-gray-900">3D Interior & Spatial Layout Consultation</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our interior architects provide 3D CAD modeling and color palette recommendations for living rooms, bedrooms, and dining spaces to ensure effortless visual harmony before crafting begins.
              </p>
              <Link to="/contact" className="btn-gold text-xs py-2 px-5 inline-block">
                Book 3D Consultation &rarr;
              </Link>
            </div>
          </div>

          {/* Service 3 */}
          <div className="glass-card p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            <div className="md:col-span-4 rounded-xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                alt="Commercial Fit-outs"
                className="w-full h-56 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            <div className="md:col-span-8 space-y-3">
              <span className="badge-gold">Commercial & Hospitality</span>
              <h2 className="font-serif text-2xl font-bold text-gray-900">Corporate Office & Hotel Fit-outs</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We furnish corporate headquarters, boutique hotels, and luxury restaurants with heavy-duty ergonomic desk units, executive conference tables, and acoustic wall panels at bulk factory pricing.
              </p>
              <Link to="/contact" className="btn-gold text-xs py-2 px-5 inline-block">
                Request Corporate Quote &rarr;
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
