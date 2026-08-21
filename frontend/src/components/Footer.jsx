import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-gray-400 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
              SS
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-white">SS Furniture</span>
              <span className="text-[10px] tracking-widest text-amber-500 uppercase font-semibold">Furniture & Electronics</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-gray-500">
            Handcrafting premium luxury furniture for living rooms, bedrooms, dining suites, and offices. Custom interior design and direct factory pricing.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-white text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
            <li><Link to="/categories" className="hover:text-amber-400 transition-colors">Categories</Link></li>
            <li><Link to="/products" className="hover:text-amber-400 transition-colors">Products Catalog</Link></li>
            <li><Link to="/gallery" className="hover:text-amber-400 transition-colors">Showroom Gallery</Link></li>
            <li><Link to="/services" className="hover:text-amber-400 transition-colors">Our Services</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-serif font-bold text-white text-sm mb-4">Support & FAQ</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/faq" className="hover:text-amber-400 transition-colors">Frequently Asked Questions</Link></li>
            <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
            <li><a href="tel:+918220766926" className="hover:text-amber-400 transition-colors">Phone: +91 8220766926</a></li>
            <li><a href="https://wa.me/919655492444" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">WhatsApp: +91 9655492444</a></li>
          </ul>
        </div>

        {/* Office & Showroom Address */}
        <div>
          <h4 className="font-serif font-bold text-white text-sm mb-4">Our Showroom</h4>
          <p className="text-xs leading-relaxed text-gray-500">
            SS Furniture & Electronics,<br />
            2/448, GNT Road, Cholavaram,<br />
            Chennai, Tamil Nadu 600067<br />
            India
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} SS Furniture. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link to="/" className="hover:underline">Home</Link>
          <span>&middot;</span>
          <Link to="/contact" className="hover:underline">Inquiry Form</Link>
        </div>
      </div>
    </footer>
  );
}
