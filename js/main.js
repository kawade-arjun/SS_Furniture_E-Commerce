/**
 * SS Furniture - Main JavaScript Controller
 * Handles Navigation, Mobile Menu, Counters, Toast Notifications & Global Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollToTop();
  initStatsCounter();
  initWhatsAppWidget();
});

/* 1. Navbar Glass Effect & Active Link Highlight */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Highlight active link based on current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('text-amber-700', 'font-bold');
      link.classList.remove('text-gray-700');
    }
  });
}

/* 2. Mobile Drawer Navigation */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-menu-drawer');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* 3. Scroll to Top Button */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scroll-to-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      scrollTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
      scrollTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 4. Animated Statistics Counter */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  let counted = false;

  const startCounting = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0', 10);
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target.toLocaleString() + (stat.getAttribute('data-suffix') || '');
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current).toLocaleString() + (stat.getAttribute('data-suffix') || '');
        }
      }, stepTime);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        startCounting();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* 5. WhatsApp Floating Widget */
function initWhatsAppWidget() {
  const waToggle = document.getElementById('wa-widget-toggle');
  const waPopover = document.getElementById('wa-widget-popover');
  const waClose = document.getElementById('wa-widget-close');

  if (!waToggle || !waPopover) return;

  waToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    waPopover.classList.toggle('hidden');
  });

  if (waClose) {
    waClose.addEventListener('click', () => {
      waPopover.classList.add('hidden');
    });
  }

  document.addEventListener('click', (e) => {
    if (!waPopover.contains(e.target) && !waToggle.contains(e.target)) {
      waPopover.classList.add('hidden');
    }
  });
}

/* 6. Global Toast Notification System */
window.showToast = function(message, title = 'SS Furniture') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="text-amber-500 text-xl">
      <svg class="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <div>
      <h4 class="font-semibold text-sm text-white">${title}</h4>
      <p class="text-xs text-gray-300">${message}</p>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};
