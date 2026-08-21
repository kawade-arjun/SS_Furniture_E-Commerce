import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/categories', label: 'Categories' },
    { path: '/products', label: 'Products' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/services', label: 'Services' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/faq', label: 'FAQ' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        id="navbar"
        className={`glass-nav fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
          isScrolled ? 'scrolled' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              SS
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl md:text-2xl tracking-tight text-gray-900">
                SS Furniture
              </span>
              <span className="text-[10px] tracking-widest text-amber-700 uppercase font-semibold -mt-1">
                Furniture & Electronics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link transition-colors ${
                    isActive
                      ? 'text-amber-700 font-bold'
                      : 'hover:text-amber-700 text-gray-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:+918220766926"
              className="flex items-center gap-2 text-xs font-bold text-gray-800 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-full hover:bg-amber-100 transition-colors"
            >
              <svg
                className="w-4 h-4 text-amber-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +918220766926
            </a>
            <a
              href="https://wa.me/919655492444?text=Hi%20SS%20Furniture,%20I'd%20like%20to%20book%20a%20showroom%20visit"
              target="_blank"
              rel="noreferrer"
              className="btn-gold text-xs py-2 px-4 shadow-sm"
            >
              Book Visit
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="lg:hidden p-2 text-gray-800 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#FDFBF7] z-50 p-6 flex flex-col justify-between transition-transform duration-300 shadow-2xl ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-gray-200">
            <span className="font-serif font-bold text-xl text-gray-900">SS Furniture</span>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900 text-2xl"
            >
              &times;
            </button>
          </div>
          <nav className="flex flex-col gap-4 py-6 text-base font-semibold text-gray-800">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsDrawerOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'text-amber-700' : 'hover:text-amber-700'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="pt-6 border-t border-gray-200 space-y-3">
          <a
            href="tel:+918220766926"
            className="w-full py-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl font-bold text-center block text-sm"
          >
            Call +91 8220766926
          </a>
          <a
            href="https://wa.me/919655492444"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-center block text-sm"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </>
  );
}
