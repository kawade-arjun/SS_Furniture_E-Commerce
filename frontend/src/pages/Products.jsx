import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import QuickViewModal from '../components/QuickViewModal';
import { matchCategory, matchSearch } from '../utils/filterUtils';

export default function Products() {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set category filter based on query param when location changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('All');
    }
  }, [location]);

  // Fetch product list from Backend Express API
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const valid = Array.isArray(data)
          ? data.filter((p) => p && p.name && p.price && p.image)
          : [];
        setProducts(valid);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const categoryList = useMemo(() => {
    const list = ['All'];
    products.forEach((p) => {
      if (p.category && typeof p.category === 'string') {
        const cat = p.category.trim();
        if (!list.some((existing) => existing !== 'All' && matchCategory(existing, cat))) {
          list.push(cat);
        }
      }
    });
    return list;
  }, [products]);

  // Filter products based on search query and category tab selections
  useEffect(() => {
    let result = products;

    if (activeCategory && activeCategory !== 'All') {
      result = result.filter((p) => matchCategory(p.category, activeCategory));
    }

    if (searchQuery && searchQuery.trim() !== '') {
      result = result.filter((p) => matchSearch(p, searchQuery));
    }

    setFilteredProducts(result);
  }, [activeCategory, searchQuery, products]);

  const isCatActive = (cat) => {
    if (cat === 'All') return activeCategory === 'All';
    return activeCategory === cat || matchCategory(cat, activeCategory);
  };

  return (
    <div>
      {/* PAGE HERO */}
      <section className="pt-32 pb-16 bg-gradient-dark text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="badge-gold">Complete Showcase</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-4">Our Furniture Catalogue</h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Filter by category or search by keyword to explore our solid wood furniture pieces.
          </p>
        </div>
      </section>

      {/* SEARCH & FILTER SECTION */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Search Input */}
          <div className="relative w-full md:w-96 text-left">
            <input
              type="text"
              placeholder="Search by name, wood, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-amber-600 shadow-sm"
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

          {/* Categories Pills */}
          <div className="overflow-x-auto w-full md:w-auto pb-2 scrollbar-none flex gap-2">
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isCatActive(cat)
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-amber-50'
                }`}
              >
                {cat === 'All' ? 'All Items' : cat === 'Office Furniture' ? 'Office' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-16 bg-gradient-soft min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-20 text-gray-500 font-medium">
              Loading Catalog...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <h3 className="text-2xl font-serif text-gray-700 mb-2">No Furniture Found</h3>
              <p className="text-sm text-gray-500">Try adjusting search keywords or selecting another category.</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div key={p.id} className="product-card glass-card overflow-hidden">
                <div className="img-container aspect-square bg-gray-100 relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
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

      {/* QUICK VIEW MODAL */}
      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
