import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useToast } from '../context/ToastContext';
import { matchCategory, matchSearch } from '../utils/filterUtils';

export default function Admin() {
  const { showToast } = useToast();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Navigation Tab: 'products' or 'banners'
  const [activeTab, setActiveTab] = useState('products');

  // Products & Data State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Home Hero Ads & Banners State
  const [banners, setBanners] = useState([]);
  const [bannersLoading, setBannersLoading] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [bannerModalMode, setBannerModalMode] = useState('add');
  const [editingBannerId, setEditingBannerId] = useState(null);
  const [uploadingBannerFile, setUploadingBannerFile] = useState(false);
  const bannerFileInputRef = useRef(null);
  const [bannerFormData, setBannerFormData] = useState({
    id: '',
    badge: 'Handcrafted Perfection',
    title: '',
    description: '',
    bg: '',
    btnLink: '/products',
    btnText: 'Explore Collection',
    hasCustomizerBtn: false,
    order: 1,
    isActive: true,
  });

  // Modal State (Add / Edit Products)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingId, setEditingId] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'sofas',
    price: '',
    oldPrice: '',
    material: '',
    dimensions: '',
    badge: '',
    tag: '',
    image: '',
    description: '',
  });

  // File Upload State for Products
  const [uploadingFile, setUploadingFile] = useState(false);
  const fileInputRef = useRef(null);

  // Check login on mount
  useEffect(() => {
    const token = localStorage.getItem('ss_admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch products from MongoDB Atlas Cloud
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        showToast('Failed to load products from database', 'Error');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      showToast('Cannot connect to backend server', 'Network Error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch banners from MongoDB Atlas Cloud
  const fetchBanners = async () => {
    setBannersLoading(true);
    try {
      const res = await fetch('/api/banners/all');
      if (res.ok) {
        const data = await res.json();
        setBanners(data);
      } else {
        showToast('Failed to load home banners from database', 'Error');
      }
    } catch (err) {
      console.error('Error fetching banners:', err);
      showToast('Cannot connect to backend for banners', 'Network Error');
    } finally {
      setBannersLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchBanners();
    }
  }, [isAuthenticated]);

  // Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('ss_admin_token', data.token);
        setIsAuthenticated(true);
        showToast('Welcome back, Admin!', 'Logged In');
      } else {
        showToast(data.error || 'Invalid credentials', 'Login Failed');
      }
    } catch (err) {
      showToast('Login request failed', 'Error');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('ss_admin_token');
    setIsAuthenticated(false);
    showToast('You have been logged out', 'Goodbye');
  };

  // Handle Local File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image type
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP)', 'Invalid File');
      return;
    }

    setUploadingFile(true);
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: bodyFormData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        showToast('Photo uploaded from your computer successfully!', 'Upload Complete');
      } else {
        showToast(data.error || 'Upload failed', 'Error');
      }
    } catch (err) {
      console.error('File upload error:', err);
      showToast('Server error uploading image', 'Upload Error');
    } finally {
      setUploadingFile(false);
    }
  };

  // Open Modal for Create
  const handleOpenAdd = () => {
    setModalMode('add');
    setEditingId(null);
    setFormData({
      id: `p_${Date.now().toString().slice(-4)}`,
      name: '',
      category: 'sofas',
      price: '₹',
      oldPrice: '',
      material: 'Solid Teak Wood',
      dimensions: '',
      badge: '',
      tag: 'Handcrafted',
      image: '',
      description: '',
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (p) => {
    setModalMode('edit');
    setEditingId(p._id || p.id);
    setFormData({
      id: p.id || '',
      name: p.name || '',
      category: p.category || 'sofas',
      price: p.price || '',
      oldPrice: p.oldPrice || '',
      material: p.material || '',
      dimensions: p.dimensions || '',
      badge: p.badge || '',
      tag: p.tag || '',
      image: p.image || '',
      description: p.description || '',
    });
    setIsModalOpen(true);
  };

  // Submit Add / Edit to MongoDB Atlas Cloud
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      showToast('Name, category, and price are required', 'Validation Error');
      return;
    }

    try {
      if (modalMode === 'add') {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          showToast(`"${formData.name}" added to MongoDB Cloud!`, 'Saved to Cloud');
          setIsModalOpen(false);
          fetchProducts();
        } else {
          showToast('Failed to add product', 'Error');
        }
      } else {
        const res = await fetch(`/api/products/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          showToast(`"${formData.name}" updated in MongoDB Cloud!`, 'Updated in Cloud');
          setIsModalOpen(false);
          fetchProducts();
        } else {
          showToast('Failed to update product', 'Error');
        }
      }
    } catch (err) {
      console.error('Form submit error:', err);
      showToast('Network error saving to cloud', 'Error');
    }
  };

  // Delete Product from MongoDB Atlas Cloud
  const handleDelete = async (p) => {
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete "${p.name}" from MongoDB Cloud?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${p._id || p.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast(`"${p.name}" deleted from Cloud Database`, 'Deleted');
        fetchProducts();
      } else {
        showToast('Failed to delete product', 'Error');
      }
    } catch (err) {
      showToast('Network error deleting product', 'Error');
    }
  };

  // Banner Actions
  const handleOpenAddBanner = () => {
    setBannerModalMode('add');
    setEditingBannerId(null);
    setBannerFormData({
      id: `banner_${Date.now()}`,
      badge: 'Exclusive Collection',
      title: '',
      description: '',
      bg: '',
      btnLink: '/products',
      btnText: 'Explore Collection',
      hasCustomizerBtn: false,
      order: banners.length + 1,
      isActive: true,
    });
    setIsBannerModalOpen(true);
  };

  const handleOpenEditBanner = (b) => {
    setBannerModalMode('edit');
    setEditingBannerId(b._id || b.id);
    setBannerFormData({
      id: b.id || '',
      badge: b.badge || '',
      title: b.title || '',
      description: b.description || '',
      bg: b.bg || '',
      btnLink: b.btnLink || '/products',
      btnText: b.btnText || 'Explore Collection',
      hasCustomizerBtn: Boolean(b.hasCustomizerBtn),
      order: b.order || 1,
      isActive: b.isActive !== false,
    });
    setIsBannerModalOpen(true);
  };

  const handleBannerFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP)', 'Invalid File');
      return;
    }

    setUploadingBannerFile(true);
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: bodyFormData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setBannerFormData((prev) => ({ ...prev, bg: data.url }));
        showToast('Banner photo uploaded from computer successfully!', 'Upload Complete');
      } else {
        showToast(data.error || 'Upload failed', 'Error');
      }
    } catch (err) {
      console.error('File upload error:', err);
      showToast('Server error uploading image', 'Upload Error');
    } finally {
      setUploadingBannerFile(false);
    }
  };

  const handleBannerFormSubmit = async (e) => {
    e.preventDefault();
    if (!bannerFormData.title || !bannerFormData.bg) {
      showToast('Banner title and background image are required', 'Validation Error');
      return;
    }

    try {
      if (bannerModalMode === 'add') {
        const res = await fetch('/api/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bannerFormData),
        });
        if (res.ok) {
          showToast(`Banner "${bannerFormData.title}" saved to Cloud!`, 'Saved to Cloud');
          setIsBannerModalOpen(false);
          fetchBanners();
        } else {
          showToast('Failed to save banner', 'Error');
        }
      } else {
        const res = await fetch(`/api/banners/${editingBannerId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bannerFormData),
        });
        if (res.ok) {
          showToast(`Banner "${bannerFormData.title}" updated in Cloud!`, 'Updated in Cloud');
          setIsBannerModalOpen(false);
          fetchBanners();
        } else {
          showToast('Failed to update banner', 'Error');
        }
      }
    } catch (err) {
      console.error('Banner save error:', err);
      showToast('Network error saving banner', 'Error');
    }
  };

  const handleDeleteBanner = async (b) => {
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete banner "${b.title}" from MongoDB Cloud?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/banners/${b._id || b.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast(`Banner "${b.title}" deleted from Cloud Database`, 'Deleted');
        fetchBanners();
      } else {
        showToast('Failed to delete banner', 'Error');
      }
    } catch (err) {
      console.error('Delete banner error:', err);
      showToast('Network error deleting banner', 'Error');
    }
  };

  const handleToggleBannerActive = async (b) => {
    try {
      const res = await fetch(`/api/banners/${b._id || b.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !b.isActive }),
      });
      if (res.ok) {
        showToast(`Banner status updated to ${!b.isActive ? 'Active' : 'Hidden'}`, 'Status Updated');
        fetchBanners();
      }
    } catch (err) {
      console.error('Toggle banner status error:', err);
    }
  };

  // Dynamically compute available categories from products
  const adminCategories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category && p.category.trim()) {
        set.add(p.category.trim());
      }
    });
    return ['all', ...Array.from(set)];
  }, [products]);

  // Filtered Products via Real-time Top Search Bar
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p || !p.name) return false;
      const matchesCat = selectedCategory === 'all' || matchCategory(p.category, selectedCategory);
      if (!matchesCat) return false;
      return matchSearch(p, searchQuery);
    });
  }, [products, searchQuery, selectedCategory]);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full glass-card p-8 sm:p-10 shadow-xl border border-amber-200">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white font-serif font-bold text-2xl shadow-md mb-4">
              SS
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Owner Portal</h1>
            <p className="text-xs text-gray-500 mt-1">Sign in to manage cloud furniture inventory</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@ssfurniture.com"
                className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Admin Password</label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="btn-gold w-full text-sm py-3.5 justify-center mt-2 disabled:opacity-50"
            >
              {loginLoading ? 'Signing In...' : 'Log In to Dashboard →'}
            </button>
          </form>
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <a href="/" className="text-xs text-amber-800 font-semibold hover:underline">
              ← Return to Showroom Storefront
            </a>
          </div>
        </div>
      </div>
    );
  }

  // MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#F8F6F2] text-gray-900 font-sans pb-24">
      {/* 1. TOP NAVBAR */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
              SS
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg text-gray-900 leading-tight">SS Furniture Dashboard</h1>
              <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">● Connected to MongoDB Atlas Cloud</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-lg transition-colors"
            >
              View Live Storefront ↗
            </a>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-lg border border-rose-200 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB SWITCHER */}
        <div className="flex items-center gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3.5 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>📦 Products Catalog</span>
            <span
              className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                activeTab === 'products'
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {products.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`pb-3.5 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'banners'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>🖼️ Home Ads & Hero Banners</span>
            <span
              className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                activeTab === 'banners'
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {banners.length}
            </span>
          </button>
        </div>

        {activeTab === 'products' ? (
          <>
            {/* 2. STATS ROW */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cloud Products</span>
                <div className="text-3xl font-bold text-gray-900 mt-1">{products.length}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</span>
                <div className="text-3xl font-bold text-amber-800 mt-1">
                  {Math.max(0, adminCategories.length - 1)}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Filtered Matches</span>
                <div className="text-3xl font-bold text-emerald-700 mt-1">{filteredProducts.length}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Storage Mode</span>
                <div className="text-sm font-bold text-gray-800 mt-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  MongoDB Atlas
                </div>
              </div>
            </div>

            {/* 3. PROMINENT TOP SEARCH BAR */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                {/* Real-time search input */}
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products by name, category, wood type, price, or ID..."
                    className="w-full pl-11 pr-10 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm p-1"
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Quick Add Product Button */}
                <button
                  onClick={handleOpenAdd}
                  className="btn-gold py-3.5 px-6 text-sm font-bold shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  + Add New Product
                </button>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px] mr-1">Filter:</span>
                {adminCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full font-bold capitalize transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-amber-800 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat === 'all' ? `All Products (${products.length})` : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. PRODUCT LIST TABLE */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-serif font-bold text-lg text-gray-900">
                  Product Catalog ({filteredProducts.length})
                </h2>
                {searchQuery && (
                  <span className="text-xs text-amber-800 font-semibold">
                    Searching for "{searchQuery}"
                  </span>
                )}
              </div>

              {loading ? (
                <div className="text-center py-20 text-gray-500 font-medium">
                  Loading products from MongoDB Atlas Cloud...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 px-4">
                  <p className="text-gray-500 text-sm mb-4">No products found matching your search.</p>
                  <button onClick={handleOpenAdd} className="btn-gold text-xs py-2 px-4">
                    + Add New Product
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-500 text-xs font-bold uppercase tracking-wider">
                        <th className="py-3.5 px-4">Product</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Price</th>
                        <th className="py-3.5 px-4">Material</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.map((p) => (
                        <tr key={p._id || p.id} className="hover:bg-amber-50/30 transition-colors">
                          {/* Image & Name */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 rounded-xl object-cover border border-gray-200 bg-gray-100"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=150&q=80';
                                }}
                              />
                              <div>
                                <div className="font-bold text-gray-900">{p.name}</div>
                                <div className="text-xs text-gray-400 font-mono">ID: {p.id}</div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2.5 py-1 text-xs font-bold uppercase rounded-md bg-amber-100/70 text-amber-900">
                              {p.category}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-amber-900">{p.price}</div>
                            {p.oldPrice && (
                              <div className="text-xs text-gray-400 line-through">{p.oldPrice}</div>
                            )}
                          </td>

                          {/* Material */}
                          <td className="py-3.5 px-4 text-xs text-gray-600">
                            {p.material || 'Solid Wood'}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 mr-2 transition-colors"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(p)}
                              className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-8">
            {/* 2. BANNERS STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Slides</span>
                <div className="text-3xl font-bold text-gray-900 mt-1">{banners.length}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active on Home</span>
                <div className="text-3xl font-bold text-emerald-700 mt-1">
                  {banners.filter((b) => b.isActive).length}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hidden Slides</span>
                <div className="text-3xl font-bold text-gray-400 mt-1">
                  {banners.filter((b) => !b.isActive).length}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Position</span>
                <div className="text-sm font-bold text-amber-900 mt-3">Home Hero Carousel</div>
              </div>
            </div>

            {/* 3. BANNERS HEADER & ACTION BAR */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif font-bold text-xl text-gray-900">Homepage Hero Ads & Banners</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Change promo graphics, titles, offer badges, action buttons, or upload photos from your computer.
                </p>
              </div>
              <button
                onClick={handleOpenAddBanner}
                className="btn-gold py-3 px-6 text-xs font-bold shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                + Add New Home Slide / Ad
              </button>
            </div>

            {/* 4. BANNERS GRID */}
            {bannersLoading ? (
              <div className="text-center py-20 text-gray-500 font-medium bg-white rounded-2xl border border-gray-200 shadow-sm">
                Loading banners from MongoDB Atlas Cloud...
              </div>
            ) : banners.length === 0 ? (
              <div className="text-center py-20 px-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="text-4xl mb-3">🖼️</div>
                <h3 className="text-lg font-bold text-gray-800">No Banners Found</h3>
                <p className="text-gray-500 text-xs mt-1 mb-4">Add your first promotional ad banner or hero slide.</p>
                <button onClick={handleOpenAddBanner} className="btn-gold text-xs py-2 px-4">
                  + Add New Banner
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((b, idx) => (
                  <div
                    key={b.id || idx}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    {/* Slide Photo Preview */}
                    <div className="relative aspect-[16/9] bg-gray-900 overflow-hidden group">
                      <img
                        src={b.bg}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      {/* Badge overlay */}
                      {b.badge && (
                        <span className="absolute top-3 left-3 bg-amber-500/90 text-amber-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm">
                          {b.badge}
                        </span>
                      )}

                      {/* Active Status pill */}
                      <span
                        className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm ${
                          b.isActive ? 'bg-emerald-500/90 text-white' : 'bg-gray-600/90 text-gray-200'
                        }`}
                      >
                        {b.isActive ? '● Active' : 'Hidden'}
                      </span>

                      {/* Title preview on image */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-[10px] text-amber-300 font-semibold mb-0.5">
                          Slide #{b.order || idx + 1}
                        </div>
                        <h4 className="font-serif font-bold text-sm line-clamp-1 leading-snug">{b.title}</h4>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {b.description || 'No description provided.'}
                        </p>

                        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2 items-center text-[11px] text-gray-500">
                          <span className="font-semibold text-gray-700">Button:</span>
                          <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-medium">
                            {b.btnText || 'Explore'} &rarr; {b.btnLink || '/products'}
                          </span>
                        </div>
                        {b.hasCustomizerBtn && (
                          <div className="mt-1 text-[11px] text-amber-800 font-semibold flex items-center gap-1">
                            <span>✓ Custom Quote Button Included</span>
                          </div>
                        )}
                      </div>

                      {/* Card Actions */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <button
                          onClick={() => handleToggleBannerActive(b)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                            b.isActive
                              ? 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'
                              : 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {b.isActive ? 'Hide Slide' : 'Set Active'}
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditBanner(b)}
                            className="text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBanner(b)}
                            className="text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 5. ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="font-serif text-2xl font-bold text-gray-900">
                {modalMode === 'add' ? '+ Add New Product to Cloud' : '✏️ Edit Product in Cloud'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
              {/* Product Name & ID */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Royal Chesterfield Teak Sofa"
                    className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Product Code / ID</label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="e.g. p15"
                    className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white font-mono"
                  />
                </div>
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
                  >
                    <option value="sofas">Sofas & Couches</option>
                    <option value="dining">Dining Sets</option>
                    <option value="beds">Beds & Mattresses</option>
                    <option value="office">Office Furniture</option>
                    <option value="living">Living Room</option>
                    <option value="decor">Home Decor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Selling Price *</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. ₹48,000"
                    className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Old Price (Optional)</label>
                  <input
                    type="text"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                    placeholder="e.g. ₹58,000"
                    className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Material & Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Wood & Material</label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="e.g. Solid Teak Wood / Suede Fabric"
                    className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder="e.g. 7ft x 3.5ft x 2.8ft"
                    className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* IMAGE SELECTION: LOCAL FILE UPLOAD + URL */}
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-amber-950">
                    Product Image (Upload from Computer or Paste Link)
                  </label>
                  {formData.image && (
                    <a
                      href={formData.image}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-amber-800 font-bold hover:underline"
                    >
                      View Link ↗
                    </a>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  {/* File Upload Button */}
                  <div className="w-full sm:w-auto">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingFile}
                      className="w-full sm:w-auto px-4 py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      📁 {uploadingFile ? 'Uploading Photo...' : 'Choose Photo from Computer'}
                    </button>
                  </div>

                  <span className="text-xs text-gray-400 font-bold">OR</span>

                  {/* URL Text Input */}
                  <div className="flex-1 w-full">
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Paste image web link (https://...)"
                      className="w-full p-3 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                {/* Live Image Preview */}
                {formData.image && (
                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-16 h-16 rounded-xl object-cover border border-amber-200 bg-white shadow-sm"
                    />
                    <div className="text-xs text-gray-600">
                      <span className="text-emerald-700 font-bold">✓ Image Ready:</span>
                      <p className="text-[11px] text-gray-400 truncate max-w-xs">{formData.image}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Product Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe wood grains, durability, upholstery, warranty..."
                  className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
                ></textarea>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-7 py-2.5 text-xs font-bold shadow-md"
                >
                  {modalMode === 'add' ? 'Save Product to Cloud Database →' : 'Update in Cloud Database →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. ADD / EDIT BANNER MODAL */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="font-serif text-2xl font-bold text-gray-900">
                {bannerModalMode === 'add' ? '+ Add Homepage Ad / Slide' : '✏️ Edit Homepage Slide'}
              </h3>
              <button
                onClick={() => setIsBannerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBannerFormSubmit} className="space-y-5 text-left">
              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Slide Title / Headline *</label>
                  <input
                    type="text"
                    required
                    value={bannerFormData.title}
                    onChange={(e) => setBannerFormData({ ...bannerFormData, title: e.target.value })}
                    placeholder="e.g. Redefine Luxury Living With SS Furniture"
                    className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Badge / Tagline</label>
                  <input
                    type="text"
                    value={bannerFormData.badge}
                    onChange={(e) => setBannerFormData({ ...bannerFormData, badge: e.target.value })}
                    placeholder="e.g. Special Festive Offer"
                    className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Slide Description / Subtext</label>
                <textarea
                  rows="2"
                  value={bannerFormData.description}
                  onChange={(e) => setBannerFormData({ ...bannerFormData, description: e.target.value })}
                  placeholder="e.g. Discover bespoke solid wood furniture and tailored interior creations..."
                  className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
                ></textarea>
              </div>

              {/* BANNER PHOTO: LOCAL FILE UPLOAD + URL */}
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-amber-950">
                    Banner Background Image (Upload from Computer or Paste Link) *
                  </label>
                  {bannerFormData.bg && (
                    <a
                      href={bannerFormData.bg}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-amber-800 font-bold hover:underline"
                    >
                      View Link ↗
                    </a>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  {/* File Upload Button */}
                  <div className="w-full sm:w-auto">
                    <input
                      type="file"
                      ref={bannerFileInputRef}
                      onChange={handleBannerFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={uploadingBannerFile}
                      onClick={() => bannerFileInputRef.current?.click()}
                      className="w-full sm:w-auto px-4 py-3 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors whitespace-nowrap"
                    >
                      <span>📁</span>
                      <span>{uploadingBannerFile ? 'Uploading...' : 'Upload Image from Computer'}</span>
                    </button>
                  </div>

                  <span className="text-xs font-bold text-gray-400">OR</span>

                  {/* URL Text Input */}
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      required
                      value={bannerFormData.bg}
                      onChange={(e) => setBannerFormData({ ...bannerFormData, bg: e.target.value })}
                      placeholder="Paste image URL (https://... or /uploads/...)"
                      className="w-full p-3 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 font-mono"
                    />
                  </div>
                </div>

                {/* Live Banner Preview */}
                {bannerFormData.bg && (
                  <div className="relative aspect-[21/9] rounded-xl overflow-hidden border border-amber-300 bg-gray-900 mt-2 shadow-sm">
                    <img
                      src={bannerFormData.bg}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-4">
                      <div className="text-white space-y-1">
                        {bannerFormData.badge && (
                          <span className="inline-block px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-[10px] font-bold">
                            {bannerFormData.badge}
                          </span>
                        )}
                        <h4 className="font-serif font-bold text-sm text-white">
                          {bannerFormData.title || 'Slide Title Preview'}
                        </h4>
                        <p className="text-[11px] text-gray-300 line-clamp-1 max-w-sm">
                          {bannerFormData.description || 'Description preview...'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Button Settings & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={bannerFormData.btnText}
                    onChange={(e) => setBannerFormData({ ...bannerFormData, btnText: e.target.value })}
                    placeholder="e.g. Explore Collection"
                    className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Button Target Link</label>
                  <input
                    type="text"
                    value={bannerFormData.btnLink}
                    onChange={(e) => setBannerFormData({ ...bannerFormData, btnLink: e.target.value })}
                    placeholder="e.g. /products or /products?category=sofas"
                    className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Slide Order (#)</label>
                  <input
                    type="number"
                    value={bannerFormData.order}
                    onChange={(e) => setBannerFormData({ ...bannerFormData, order: Number(e.target.value) })}
                    placeholder="1, 2, 3..."
                    className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bannerFormData.hasCustomizerBtn}
                    onChange={(e) => setBannerFormData({ ...bannerFormData, hasCustomizerBtn: e.target.checked })}
                    className="rounded border-gray-300 text-amber-700 focus:ring-amber-500 h-4 w-4"
                  />
                  <span>Include "Custom Furniture Quote" Button</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bannerFormData.isActive}
                    onChange={(e) => setBannerFormData({ ...bannerFormData, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                  />
                  <span>Active (Visible on Homepage Carousel)</span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-7 py-2.5 text-xs font-bold shadow-md"
                >
                  {bannerModalMode === 'add' ? 'Save Banner to Cloud Database →' : 'Update Banner in Cloud →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
