import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import HeroSlider from '../components/HeroSlider';
import CustomizerSection from '../components/CustomizerSection';
import QuickViewModal from '../components/QuickViewModal';
import { matchCategory, matchSearch } from '../utils/filterUtils';

export default function Home() {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  // Inquiry form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Custom Sofa Set Design');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const valid = Array.isArray(data)
          ? data.filter((p) => p && p.name && p.price && p.image)
          : [];
        setProducts(valid);
        setFilteredProducts(valid.slice(0, 8)); // Initial limit on home page
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = products;

    if (activeCategory && activeCategory !== 'All') {
      result = result.filter((p) => matchCategory(p.category, activeCategory));
    }

    if (searchQuery && searchQuery.trim() !== '') {
      result = result.filter((p) => matchSearch(p, searchQuery));
    }

    setFilteredProducts(result.slice(0, 8));
  }, [activeCategory, searchQuery, products]);

  const isCatActive = (cat) => {
    if (cat === 'All') return activeCategory === 'All';
    return activeCategory === cat || matchCategory(cat, activeCategory);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email || !message) {
      showToast('Please fill out all fields.', 'Form Validation');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          message: `[Inquiry Type: ${inquiryType}] ${message}`,
        }),
      });

      if (response.ok) {
        showToast(`Thank you, ${name}! Your enquiry has been received.`, 'Enquiry Submitted');
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        showToast('Error submitting inquiry. Please try again.', 'Submission Error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error submitting inquiry.', 'Connection Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { name: 'Sofa Sets', count: '12+', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80' },
    { name: 'Beds', count: '15+', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80' },
    { name: 'Dining Tables', count: '10+', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80' },
    { name: 'Wardrobes', count: '8+', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80' },
    { name: 'TV Units', count: '9+', image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=600&q=80' },
    { name: 'Office Furniture', count: '14+', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
    { name: 'Modular Furniture', count: '7+', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80' },
    { name: 'Chairs', count: '18+', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80' },
    { name: 'Center Tables', count: '11+', image: 'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=600&q=80' },
    { name: 'Storage Cabinets', count: '6+', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80' },
  ];

  const features = [
    { title: 'Premium Materials', desc: 'We source ethically harvested, kiln-dried Teak, Sheesham, and Walnut timber alongside imported Italian upholstery.', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.594 15.12a2 2 0 00-1.81 2.37l.7 4.2A2 2 0 006.45 23h11.1a2 2 0 001.967-1.63l.7-4.2a2 2 0 00-.789-1.742z' },
    { title: 'Bespoke Customization', desc: 'Tailor dimensions, wood stains, fabric textures, and cushion density to match your exact room architecture.', icon: 'M11 4a2 2 0 114 0v1a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2h8zM4 14h16m-7 6h7' },
    { title: '10-Year Structure Warranty', desc: 'Complete peace of mind. Every wooden skeleton and internal joinery comes backed with a 10-year guarantee.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { title: 'Free Insured Delivery', desc: 'White-glove home delivery and professional on-site assembly handled by our trained carpentry technicians.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { title: 'Direct Factory Pricing', desc: 'By eliminating middleman markups, we pass up to 35% savings directly to our customers without compromising quality.', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Dedicated Design Advisors', desc: 'Get 1-on-1 expert consultation to select wood hues, spatial layouts, and color palettes for your dream home.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  return (
    <div>
      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* 2. COMPANY INTRODUCTION */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] glass-card p-2">
                <img
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80"
                  alt="SS Furniture Workshop"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card-dark p-6 rounded-2xl max-w-xs animate-float shadow-2xl">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-extrabold text-amber-400">15+</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Years of Excellence</h4>
                    <p className="text-xs text-gray-300">Master Wood Craftsmen</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                About SS Furniture
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Where Master Artistry Meets Modern Home Comfort
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Founded with a passion for architectural aesthetics and solid wood durability,{' '}
                <strong>SS Furniture</strong> has grown into a premier luxury showroom. We blend
                traditional woodworking heritage with contemporary ergonomic design.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every piece in our collection—from seasoned Grade-A Teak wood frames to precision
                hydraulic hardware—undergoes rigorous quality testing to ensure your home receives
                nothing short of perfection.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white/70 border border-amber-100 shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">100% Solid Wood</h4>
                    <p className="text-xs text-gray-500">Seasoned Teak & Sheesham</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/70 border border-amber-100 shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">10 Year Warranty</h4>
                    <p className="text-xs text-gray-500">Guaranteed Protection</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/about" className="btn-gold text-sm py-3 px-6">
                  Learn More About Our Journey &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Unrivaled Quality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            Why SS Furniture Stands Above
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mt-2">
            Discover the commitments that make us the trusted choice for over 12,000 homes.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="glass-card p-8 text-left hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 text-2xl font-bold mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={f.icon} />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            Explore Product Categories
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mt-2">
            Browse our 10 specialized luxury categories designed for every corner of your sanctuary.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((c, idx) => (
            <Link
              key={idx}
              to={`/products?category=${encodeURIComponent(c.name)}`}
              className="category-card aspect-square block group"
            >
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="overlay absolute inset-0 p-4 flex flex-col justify-end text-white">
                <span className="text-xs text-amber-300 font-semibold">{c.count} Designs</span>
                <h3 className="font-serif text-lg font-bold">{c.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. FEATURED HIGHLIGHTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
              Showroom Highlights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
              Featured Products
            </h2>
            <p className="text-gray-500 text-sm mt-1">Handpicked luxury items ready for immediate dispatch.</p>
          </div>

          <div className="relative min-w-[280px]">
            <input
              type="text"
              placeholder="Search sofa, bed, table..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-amber-600"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 overflow-x-auto pb-2 scrollbar-none flex gap-2">
          {['All', 'Sofa Sets', 'Beds', 'Dining Tables', 'Wardrobes', 'Office Furniture'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isCatActive(cat)
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'bg-white/80 text-gray-700 hover:bg-amber-50 border border-gray-200'
              }`}
            >
              {cat === 'All' ? 'All Showcase' : cat === 'Office Furniture' ? 'Office' : cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-10 text-gray-500 font-medium">
              Loading Showcase Products...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <h3 className="text-xl font-serif text-gray-700">No Furniture Matches Search</h3>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div key={p.id} className="product-card glass-card overflow-hidden">
                <div className="img-container aspect-square bg-gray-100 relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-amber-700 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
                      {p.badge}
                    </span>
                  )}
                  <div className="quick-actions">
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="px-4 py-2 bg-white text-gray-900 text-xs font-bold rounded-full shadow-lg hover:bg-amber-700 hover:text-white transition-colors"
                    >
                      Quick Spec
                    </button>
                  </div>
                </div>
                <div className="p-5 text-left space-y-2">
                  <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block">
                    {p.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-gray-900 truncate">{p.name}</h3>
                  <div className="flex items-baseline justify-between pt-2">
                    <span className="text-lg font-bold text-amber-900">{p.price}</span>
                    <span className="text-xs text-amber-500 font-semibold">★ {p.rating}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 6. NEW ARRIVALS */}
      <section className="py-20 bg-gradient-dark text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="badge-gold">Fresh Off The Workshop</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white">New Arrivals 2026</h2>
              <p className="text-gray-400 text-sm mt-1">Exquisite modern designs freshly crafted by our master artisans.</p>
            </div>
            <Link to="/products" className="btn-gold text-xs py-2.5 px-6 mt-4 md:mt-0">
              View All New Designs &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(2, 5).map((p) => (
              <div key={p.id} className="glass-card-dark rounded-2xl overflow-hidden group">
                <div className="h-64 overflow-hidden relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 badge-gold">New Release</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">{p.name}</h3>
                  <p className="text-xs text-gray-400 mb-4 line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xl font-bold text-amber-400">{p.price}</span>
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="px-4 py-1.5 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-full border border-amber-500/40 hover:bg-amber-500 hover:text-gray-900 transition-colors"
                    >
                      Quick Spec
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMIZER SECTION */}
      <CustomizerSection />

      {/* 8. MANUFACTURING PROCESS */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Artisan Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            Our 5-Step Manufacturing Process
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mt-2">
            From raw timber selection to home installation, precision in every detail.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
          {[
            { num: 1, title: 'Consultation', desc: 'Understanding room dimensions, wood species, and fabric preferences.' },
            { num: 2, title: 'Wood Selection', desc: 'Inspecting kiln-dried Teak & Sheesham logs for moisture balance.' },
            { num: 3, title: 'Precision Crafting', desc: 'Hand-carving joinery and fitting German soft-close mechanisms.' },
            { num: 4, title: 'Quality Audit', desc: 'Structural stress test, polish inspection, and upholstery check.' },
            { num: 5, title: 'Setup & Delivery', desc: 'Insured white-glove transport and free on-site installation.' },
          ].map((step) => (
            <div key={step.num} className="glass-card p-6 relative">
              <div className="w-12 h-12 rounded-full bg-amber-700 text-white font-serif font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                {step.num}
              </div>
              <h4 className="font-serif font-bold text-gray-900 text-base mb-1">{step.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. REVIEWS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mt-2">
            Real reviews from homeowners and interior designers who chose SS Furniture.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Rajesh Sharma', role: 'Villa Owner', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', quote: 'The Chesterfield leather sofa set we ordered for our villa is absolutely breathtaking! Solid wood craftsmanship and super comfortable seating.' },
            { name: 'Priya Verma', role: 'Interior Architect', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', quote: 'SS Furniture customized an 8-seater Carrara marble dining table to fit our exact dining space dimensions. Their delivery team was punctual and helpful!' },
            { name: 'Vikram Malhotra', role: 'Penthouse Resident', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', quote: 'Bought a hydraulic storage king bed in solid walnut. Super sturdy, smooth hydraulic lifting, and zero creaking sound. Best furniture investment!' }
          ].map((r, idx) => (
            <div key={idx} className="glass-card p-8 space-y-4 text-left">
              <div className="flex items-center gap-1 text-amber-500 text-sm">★★★★★</div>
              <p className="text-gray-600 text-sm italic leading-relaxed">"{r.quote}"</p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img src={r.img} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{r.name}</h4>
                  <span className="text-xs text-emerald-600 font-semibold">Verified Buyer • {r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. STATISTICS COUNTER */}
      <section id="stats-section" className="py-16 bg-gradient-wood text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { target: '15+', label: 'Years Experience' },
            { target: '12,000+', label: 'Happy Homes' },
            { target: '500+', label: 'Custom Projects' },
            { target: '4.9 ★', label: 'Average Rating' },
          ].map((s, idx) => (
            <div key={idx} className="p-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-amber-400 font-serif mb-2">
                {s.target}
              </div>
              <p className="text-xs uppercase tracking-widest text-amber-200 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. FAQ ACCORDION PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm mt-2">Find quick answers regarding wood quality, custom ordering, and delivery policy.</p>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {[
            { q: 'What wood species do you use for SS Furniture items?', a: 'We use 100% seasoned Grade-A Teak wood, Indian Sheesham, and imported American Walnut. All wood is kiln-dried to eliminate moisture and prevent warping or pest infestation.' },
            { q: 'How long does custom furniture crafting take?', a: 'Bespoke custom furniture pieces typically require 14 to 21 business days for precision crafting, polishing, and quality audit before dispatch.' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="faq-item glass-card p-5 cursor-pointer text-left"
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
            >
              <div className="faq-question flex items-center justify-between font-serif font-bold text-lg text-gray-900">
                <span>{item.q}</span>
                <svg
                  className={`faq-icon w-5 h-5 text-amber-700 transition-transform duration-300 ${
                    activeFaq === idx ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {activeFaq === idx && (
                <div className="faq-answer text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 12. CONTACT PREVIEW */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-card p-8 sm:p-10 text-left">
              <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                Contact Us
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mt-3 mb-2">Send Us an Enquiry</h2>
              <p className="text-xs text-gray-500 mb-6">
                Fill in your details below and our furniture specialist will contact you within 2 hours.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Govind Raj"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 8220766926"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="govindraj@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Inquiry Type</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
                  >
                    <option value="Custom Sofa Set Design">Custom Sofa Set Design</option>
                    <option value="Bed & Storage Cabinet Quote">Bed & Storage Cabinet Quote</option>
                    <option value="Dining Table Customization">Dining Table Customization</option>
                    <option value="Full Home Interior Package">Full Home Interior Package</option>
                    <option value="Showroom Visit Booking">Showroom Visit Booking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Message / Requirements *</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Describe required dimensions, wood preference, or home layout..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full text-sm py-3.5 justify-center disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Furniture Enquiry →'}
                </button>
              </form>
            </div>

            <div className="space-y-6 flex flex-col justify-between text-left">
              <div className="glass-card p-8 space-y-6">
                <h3 className="font-serif text-2xl font-bold text-gray-900">Visit Our Flagship Showroom</h3>
                <p className="text-sm text-gray-600">
                  Experience our solid wood finishes and luxury Chesterfield couches in person at our flagship experience center.
                </p>

                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-800 mt-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <strong className="text-gray-900">Showroom Address:</strong>
                      <p className="text-xs text-gray-500">
                        SS furniture and electronics Annur road Jeevanathapuram Opp-tata motors Mettupalayam Coimbatore 641301
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-800 mt-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <strong className="text-gray-900">Business Hours:</strong>
                      <p className="text-xs text-gray-500">Monday - Sunday: 10:00 AM – 9:00 PM (Open All 7 Days)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg border border-amber-200 aspect-[16/9] bg-gray-200 relative">
                <iframe
                  title="SS Furniture Location Map"
                  className="w-full h-full border-0"
                  src="https://maps.google.com/maps?q=11.295162,76.949547&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. QUICK VIEW MODAL */}
      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
