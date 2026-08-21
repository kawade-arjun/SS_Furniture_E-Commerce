/**
 * SS Furniture - Gallery Lightbox & Media Showcase
 */

const GALLERY_DATA = [
  { id: 1, category: 'Living', title: 'Chesterfield Living Lounge', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, category: 'Bedroom', title: 'Royal Walnut Master Bedroom', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, category: 'Dining', title: 'Carrara Marble Dining Suite', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, category: 'Office', title: 'Ergonomic Executive Studio', image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, category: 'Custom', title: 'Handcrafted Sheesham Buffet', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, category: 'Living', title: 'Modern Nordic Sectional Layout', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, category: 'Bedroom', title: 'Beige Upholstered Hydraulic Bed', image: 'https://images.unsplash.com/photo-1540518614846-7ede433c517a?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, category: 'Dining', title: 'Solid Honey Sheesham Setup', image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1200&q=80' },
  { id: 9, category: 'Custom', title: 'Modular Kitchen Island Bar', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80' }
];

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
});

function initGallery() {
  const container = document.getElementById('gallery-grid');
  const tabs = document.querySelectorAll('.gallery-tab');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (!container) return;

  let activeCategory = 'All';
  let currentGalleryList = [...GALLERY_DATA];
  let currentIndex = 0;

  function renderGallery() {
    currentGalleryList = GALLERY_DATA.filter(item => activeCategory === 'All' || item.category === activeCategory);

    container.innerHTML = currentGalleryList.map((item, idx) => `
      <div class="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer aspect-[4/3] glass-card" onclick="openLightbox(${idx})">
        <img src="${item.image}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <span class="badge-gold w-max mb-2">${item.category}</span>
          <h4 class="font-serif text-lg font-bold text-white mb-1">${item.title}</h4>
          <span class="text-xs text-amber-300 font-medium">Click to view full screen &rarr;</span>
        </div>
      </div>
    `).join('');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('bg-amber-700', 'text-white');
        t.classList.add('bg-white/80', 'text-gray-700');
      });
      tab.classList.remove('bg-white/80', 'text-gray-700');
      tab.classList.add('bg-amber-700', 'text-white');

      activeCategory = tab.getAttribute('data-gallery') || 'All';
      renderGallery();
    });
  });

  window.openLightbox = function(index) {
    if (!lightbox || !currentGalleryList[index]) return;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function updateLightbox() {
    const item = currentGalleryList[currentIndex];
    if (!item) return;
    lightboxImg.src = item.image;
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = item.category + ' Showcase';
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
      updateLightbox();
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % currentGalleryList.length;
      updateLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
  });

  renderGallery();
}
