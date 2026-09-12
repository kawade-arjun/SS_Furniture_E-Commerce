import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES_DATA = [
  {
    name: 'Sofa Sets & Sectionals',
    catParam: 'Sofa Sets',
    models: '12+ Models',
    desc: 'Chesterfields, L-shaped sectionals, velvet armchairs, and recliner sofas.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Solid Wood Beds',
    catParam: 'Beds',
    models: '15+ Models',
    desc: 'Hydraulic storage beds, upholstered king frames, and walnut poster beds.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dining Tables & Sets',
    catParam: 'Dining Tables',
    models: '10+ Models',
    desc: 'Italian marble tops, 6 & 8-seater Sheesham tables, and breakfast counters.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Wardrobes & Storage',
    catParam: 'Wardrobes',
    models: '8+ Models',
    desc: 'Sliding glass door wardrobes, walk-in closets, and fitted armoires.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'TV Units & Consoles',
    catParam: 'TV Units',
    models: '9+ Models',
    desc: 'Floating media consoles, backlight wall panels, and audio racks.',
    image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Executive Office Setup',
    catParam: 'Office Furniture',
    models: '14+ Models',
    desc: 'Ergonomic mesh chairs, walnut executive desks, and conference tables.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Modular Furniture',
    catParam: 'Modular Furniture',
    models: '7+ Custom Fit-outs',
    desc: 'Modular kitchens, vanity cabinets, and space-saving wall units.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Accent Chairs',
    catParam: 'Chairs',
    models: '18+ Styles',
    desc: 'Velvet lounge armchairs, wingback reading chairs, and rocking chairs.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Center & Coffee Tables',
    catParam: 'Center Tables',
    models: '11+ Styles',
    desc: 'Nested brass circles, glass-top teak tables, and trunk coffee tables.',
    image: 'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Storage Cabinets',
    catParam: 'Storage Cabinets',
    models: '6+ Styles',
    desc: 'Hand-carved sideboards, crockery display cabinets, and bar units.',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Categories() {
  const [categories, setCategories] = React.useState(CATEGORIES_DATA);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(err => {
        console.warn('Using local categories fallback:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* PAGE HERO */}
      <section className="pt-32 pb-16 bg-gradient-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="badge-gold">Core Collections</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-4">Product Categories</h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Explore all specialized furniture divisions handcrafted by SS Furniture.
          </p>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="glass-card overflow-hidden group text-left">
              <div className="h-56 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="absolute top-3 left-3 badge-gold">{cat.models}</span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">{cat.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{cat.desc}</p>
                <Link
                  to={`/products?category=${encodeURIComponent(cat.catParam)}`}
                  className="btn-gold text-xs py-2 px-5"
                >
                  Explore {cat.catParam} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
