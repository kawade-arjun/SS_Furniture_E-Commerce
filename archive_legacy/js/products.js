/**
 * SS Furniture - Products Database & Interactive Catalogue Logic
 */

const PRODUCTS_DATA = [
  {
    id: 'p1',
    name: 'Royal Chesterfield Leather Sofa',
    category: 'Sofa Sets',
    price: '₹78,500',
    oldPrice: '₹92,000',
    badge: 'Best Seller',
    tag: 'Living Room',
    rating: 4.9,
    reviewsCount: 42,
    dimensions: '88"W x 38"D x 31"H',
    material: 'Genuine Italian Leather & Solid Teak Frame',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    description: 'Timeless Chesterfield design with deep button tufting, hand-rubbed leather finish, and solid teak turned legs for unmatched luxury.'
  },
  {
    id: 'p2',
    name: 'Nordic Minimalist Fabric Sectional Sofa',
    category: 'Sofa Sets',
    price: '₹64,900',
    oldPrice: '₹75,000',
    badge: 'Popular',
    tag: 'Living Room',
    rating: 4.8,
    reviewsCount: 38,
    dimensions: '104"W x 65"D x 34"H',
    material: 'High-Density Foam & Premium Stain-Resistant Linen',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80',
    description: 'Modern L-shaped modular sectional sofa featuring plush cushioning, ergonomic lumbar support, and removable washable covers.'
  },
  {
    id: 'p3',
    name: 'Monarch Solid Walnut King Bed',
    category: 'Beds',
    price: '₹85,000',
    oldPrice: '₹98,000',
    badge: 'New Arrival',
    tag: 'Bedroom',
    rating: 5.0,
    reviewsCount: 29,
    dimensions: '76"W x 84"L x 52"H',
    material: 'Grade-A American Walnut & Velvet Headboard',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    description: 'Opulent solid walnut bed with integrated ambient LED lighting, cushioned velvet headboard, and hidden storage drawers.'
  },
  {
    id: 'p4',
    name: 'Aura Upholstered Hydraulic Queen Bed',
    category: 'Beds',
    price: '₹59,500',
    oldPrice: '₹69,000',
    badge: 'Trending',
    tag: 'Bedroom',
    rating: 4.7,
    reviewsCount: 31,
    dimensions: '64"W x 82"L x 48"H',
    material: 'Hydraulic Storage Frame & Breathable Microfiber',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c517a?auto=format&fit=crop&w=1000&q=80',
    description: 'Space-saving hydraulic lift storage bed wrapped in rich beige suede upholstery with padded geometric headboard.'
  },
  {
    id: 'p5',
    name: 'Grand Marble Top 8-Seater Dining Table',
    category: 'Dining Tables',
    price: '₹1,15,000',
    oldPrice: '₹1,35,000',
    badge: 'Luxury Pick',
    tag: 'Dining Room',
    rating: 4.9,
    reviewsCount: 19,
    dimensions: '96"L x 42"W x 30"H',
    material: 'Italian Carrara Marble & Brushed Brass Metal Base',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
    description: 'Statement dining table with imported natural Carrara marble top and sculptural brushed gold brass geometric pedestal legs.'
  },
  {
    id: 'p6',
    name: 'Sheesham Artisan 6-Seater Dining Set',
    category: 'Dining Tables',
    price: '₹52,000',
    oldPrice: '₹62,000',
    badge: 'Best Seller',
    tag: 'Dining Room',
    rating: 4.8,
    reviewsCount: 56,
    dimensions: '72"L x 36"W x 30"H',
    material: '100% Solid Indian Sheesham Wood',
    image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1000&q=80',
    description: 'Handcrafted solid Sheesham wood dining set with natural honey grain finish and 6 ergonomic cushioned chairs.'
  },
  {
    id: 'p7',
    name: 'Signature Sliding 4-Door Mirror Wardrobe',
    category: 'Wardrobes',
    price: '₹95,000',
    oldPrice: '₹1,10,000',
    badge: 'Custom Choice',
    tag: 'Storage',
    rating: 4.9,
    reviewsCount: 34,
    dimensions: '96"W x 24"D x 84"H',
    material: 'HDF Marine Ply & Tinted Toughened Glass',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
    description: 'Modern full-height wardrobe with soft-closing German sliding mechanism, interior LED sensors, and digital locker unit.'
  },
  {
    id: 'p8',
    name: 'Floating Modern Entertainment Wall Unit',
    category: 'TV Units',
    price: '₹38,500',
    oldPrice: '₹46,000',
    badge: 'Popular',
    tag: 'Living Room',
    rating: 4.7,
    reviewsCount: 28,
    dimensions: '78"W x 16"D x 68"H',
    material: 'Engineered Teak Veneer & Slate Accent Panel',
    image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1000&q=80',
    description: 'Contemporary TV wall console featuring concealed cable channels, floating shelving units, and ambient backlighting.'
  },
  {
    id: 'p9',
    name: 'Executive Ergonomic Mesh Office Chair',
    category: 'Office Furniture',
    price: '₹18,900',
    oldPrice: '₹24,000',
    badge: 'Best Seller',
    tag: 'Office',
    rating: 4.9,
    reviewsCount: 88,
    dimensions: '26"W x 26"D x 46-52"H',
    material: 'Breathable Mesh & Aluminum Heavy Base',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=1000&q=80',
    description: 'Premium ergonomic desk chair with 4D adjustable armrests, synchronized tilt lock, and dynamic lumbar support.'
  },
  {
    id: 'p10',
    name: 'Modular Luxury Kitchen Island & Cabinet',
    category: 'Modular Furniture',
    price: '₹1,45,000',
    oldPrice: '₹1,70,000',
    badge: 'Custom Design',
    tag: 'Modular',
    rating: 5.0,
    reviewsCount: 15,
    dimensions: '84"W x 36"D x 36"H',
    material: 'Quartz Top & Anti-Scratch Acrylic Shutters',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    description: 'Customizable modular kitchen island with pull-out spice racks, wine cooler slot, and quartz countertop.'
  },
  {
    id: 'p11',
    name: 'Velvet Accent Lounge Lounge Armchair',
    category: 'Chairs',
    price: '₹22,500',
    oldPrice: '₹28,000',
    badge: 'Trending',
    tag: 'Living Room',
    rating: 4.8,
    reviewsCount: 45,
    dimensions: '32"W x 30"D x 33"H',
    material: 'Plush Velvet Fabric & Gold Metal Legs',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
    description: 'Elegant accent armchair featuring seashell channel tufting, deep seating comfort, and tapered gold legs.'
  },
  {
    id: 'p12',
    name: 'Nested Brass & Oak Coffee Table Set',
    category: 'Center Tables',
    price: '₹24,900',
    oldPrice: '₹31,000',
    badge: 'Popular',
    tag: 'Living Room',
    rating: 4.8,
    reviewsCount: 39,
    dimensions: '36" Dia (Large) & 24" Dia (Small)',
    material: 'Solid Oak Wood & Antique Gold Steel',
    image: 'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=1000&q=80',
    description: 'Dual nested circular coffee table unit designed for flexible entertaining space with solid wood table surfaces.'
  },
  {
    id: 'p13',
    name: 'Artisan Solid Teak Sideboard Cabinet',
    category: 'Storage Cabinets',
    price: '₹48,000',
    oldPrice: '₹56,000',
    badge: 'New Arrival',
    tag: 'Storage',
    rating: 4.9,
    reviewsCount: 22,
    dimensions: '66"W x 18"D x 34"H',
    material: 'Hand-carved Teak & Brass Knobs',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80',
    description: 'Classic buffet sideboard featuring hand-carved shutter doors, adjustable shelving, and brass hardware detail.'
  },
  {
    id: 'p14',
    name: 'Minimalist Walnut Executive Desk',
    category: 'Office Furniture',
    price: '₹42,000',
    oldPrice: '₹50,000',
    badge: 'Office Pick',
    tag: 'Office',
    rating: 4.8,
    reviewsCount: 27,
    dimensions: '60"W x 28"D x 30"H',
    material: 'Walnut Veneer & Powder-coated Steel Base',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
    description: 'Sleek work desk with built-in wireless charging pad, discreet drawer organization, and cable management tray.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initCatalogue();
  initQuickViewModal();
});

function initCatalogue() {
  const container = document.getElementById('products-grid');
  const searchInput = document.getElementById('product-search-input');
  const categoryPills = document.querySelectorAll('.category-pill');

  if (!container) return;

  let activeCategory = 'All';
  let searchQuery = '';

  function renderProducts() {
    const filtered = PRODUCTS_DATA.filter(item => {
      const matchesCategory = (activeCategory === 'All' || item.category === activeCategory);
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16">
          <div class="inline-flex p-4 rounded-full bg-amber-50 text-amber-600 mb-4">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-serif text-gray-800 mb-2">No Furniture Found</h3>
          <p class="text-gray-500 max-w-md mx-auto">Try adjusting your search terms or selecting a different furniture category.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="glass-card product-card group">
        <div class="img-container aspect-[4/3] bg-gray-100 relative">
          <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover">
          <div class="absolute top-3 left-3 flex flex-col gap-1 z-10">
            <span class="badge-gold">${item.badge}</span>
          </div>
          <div class="quick-actions flex items-center gap-2">
            <button onclick="openQuickView('${item.id}')" class="px-4 py-2 bg-white/90 backdrop-blur-md text-xs font-semibold text-gray-800 rounded-full shadow-lg hover:bg-amber-600 hover:text-white transition-all duration-200">
              Quick View
            </button>
            <a href="https://wa.me/919876543210?text=Hi%20SS%20Furniture,%20I'm%20interested%20in%20${encodeURIComponent(item.name)}" target="_blank" class="p-2 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.143 4.174 4.286-1.077z"/></svg>
            </a>
          </div>
        </div>
        <div class="p-5 flex flex-col justify-between flex-grow">
          <div>
            <div class="flex items-center justify-between text-xs text-amber-700 font-semibold mb-1">
              <span>${item.category}</span>
              <span class="flex items-center gap-1 text-amber-500">★ ${item.rating} (${item.reviewsCount})</span>
            </div>
            <h3 class="font-serif text-lg text-gray-900 font-semibold group-hover:text-amber-700 transition-colors line-clamp-1 mb-2">
              ${item.name}
            </h3>
            <p class="text-xs text-gray-500 line-clamp-2 mb-4">
              ${item.description}
            </p>
          </div>
          <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span class="text-lg font-bold text-gray-900">${item.price}</span>
              <span class="text-xs text-gray-400 line-through ml-1.5">${item.oldPrice}</span>
            </div>
            <button onclick="triggerEnquiry('${item.name}')" class="px-3.5 py-1.5 bg-amber-700 text-white text-xs font-semibold rounded-full hover:bg-amber-800 transition-colors shadow-sm">
              Enquire
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => {
        p.classList.remove('bg-amber-700', 'text-white', 'shadow-md');
        p.classList.add('bg-white/80', 'text-gray-700', 'hover:bg-amber-50');
      });
      pill.classList.remove('bg-white/80', 'text-gray-700', 'hover:bg-amber-50');
      pill.classList.add('bg-amber-700', 'text-white', 'shadow-md');

      activeCategory = pill.getAttribute('data-category') || 'All';
      renderProducts();
    });
  });

  renderProducts();
}

function initQuickViewModal() {
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('quick-view-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

window.openQuickView = function(productId) {
  const item = PRODUCTS_DATA.find(p => p.id === productId);
  if (!item) return;

  const modal = document.getElementById('quick-view-modal');
  const modalContent = document.getElementById('quick-view-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div class="rounded-xl overflow-hidden shadow-lg bg-gray-100">
        <img src="${item.image}" alt="${item.name}" class="w-full h-80 md:h-96 object-cover">
      </div>
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="badge-gold">${item.badge}</span>
          <span class="text-xs font-semibold text-amber-700 uppercase tracking-wider">${item.category}</span>
        </div>
        <h2 class="font-serif text-2xl md:text-3xl text-gray-900 font-bold mb-3">${item.name}</h2>
        <div class="flex items-center gap-3 mb-4">
          <span class="text-2xl font-extrabold text-amber-800">${item.price}</span>
          <span class="text-sm text-gray-400 line-through">${item.oldPrice}</span>
          <span class="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">Inclusive of taxes & assembly</span>
        </div>
        <p class="text-sm text-gray-600 mb-6 leading-relaxed">${item.description}</p>
        
        <div class="space-y-2 mb-6 text-xs text-gray-700 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
          <div><strong class="text-gray-900">Dimensions:</strong> ${item.dimensions}</div>
          <div><strong class="text-gray-900">Material & Finish:</strong> ${item.material}</div>
          <div><strong class="text-gray-900">Warranty:</strong> 10 Years Structural Warranty</div>
          <div><strong class="text-gray-900">Delivery:</strong> Free Insured White-Glove Delivery</div>
        </div>

        <div class="flex flex-wrap gap-3">
          <a href="https://wa.me/919876543210?text=Hello%20SS%20Furniture,%20I'd%20like%20to%20order%20the%20${encodeURIComponent(item.name)}%20(${item.price})" target="_blank" class="btn-gold text-sm py-3 px-6">
            Instant WhatsApp Order
          </a>
          <button onclick="triggerEnquiry('${item.name}')" class="btn-outline-wood text-sm py-3 px-6">
            Request Callback
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
};

window.triggerEnquiry = function(productName) {
  showToast(`Enquiry opened for "${productName}". Redirecting to WhatsApp...`, 'SS Furniture Enquiry');
  setTimeout(() => {
    window.open(`https://wa.me/919876543210?text=Hi%20SS%20Furniture,%20I%20have%20an%20enquiry%20regarding:%20${encodeURIComponent(productName)}`, '_blank');
  }, 1000);
};
