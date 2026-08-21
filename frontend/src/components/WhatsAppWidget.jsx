import React, { useState, useEffect, useRef } from 'react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={widgetRef} className="fixed bottom-6 left-6 z-40">
      {/* Floating Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-emerald-600 transition-all hover:scale-105 animate-pulse-glow"
        aria-label="Contact on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.025 14.069.99 11.45.99c-5.448 0-9.873 4.37-9.877 9.8-.002 1.758.463 3.473 1.348 4.985l-.997 3.639 3.733-.96zm12.38-5.32c-.318-.159-1.88-.916-2.172-1.02-.294-.105-.508-.159-.722.159-.214.318-.829 1.02-.1015 1.272.21.254.423.318.74.159.318-.159 1.343-.489 2.56-1.562.946-.833 1.583-1.861 1.769-2.179.185-.317.02-.49-.139-.649-.143-.143-.318-.367-.477-.55-.16-.184-.213-.317-.318-.53-.105-.213-.053-.4-.026-.55.026-.15.294-.916.403-1.18.106-.255.213-.22.294-.22h.253c.184 0 .48.067.731.339.25.271.956.916.956 2.235 0 1.32-.976 2.593-1.111 2.772-.136.179-1.921 2.894-4.654 4.053-.65.276-1.157.441-1.554.566-.656.206-1.253.177-1.725.109-.526-.077-1.616-.653-1.844-1.285-.228-.632-.228-1.176-.159-1.285.07-.11.254-.18.573-.339z" />
        </svg>
      </button>

      {/* Popover Window */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform animate-fade-in">
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  SF
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-emerald-600 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm">SS Furniture Sales</h4>
                <p className="text-xs text-emerald-100">Typically replies within minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white text-xl font-bold"
            >
              &times;
            </button>
          </div>
          <div className="p-4 bg-gray-50 text-sm text-gray-700">
            <p className="mb-3 font-medium">Hello there! 👋</p>
            <p className="text-gray-600">How can we assist you today? Let us know what custom design or furniture item you are inquiring about.</p>
          </div>
          <div className="p-3 bg-white border-t border-gray-100">
            <a
              href="https://wa.me/919655492444?text=Hi%20SS%20Furniture,%20I'd%20like%20to%20inquire%20about%20your%20custom%20furniture%20options."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.025 14.069.99 11.45.99c-5.448 0-9.873 4.37-9.877 9.8-.002 1.758.463 3.473 1.348 4.985l-.997 3.639 3.733-.96zm12.38-5.32c-.318-.159-1.88-.916-2.172-1.02-.294-.105-.508-.159-.722.159-.214.318-.829 1.02-.1015 1.272.21.254.423.318.74.159.318-.159 1.343-.489 2.56-1.562.946-.833 1.583-1.861 1.769-2.179.185-.317.02-.49-.139-.649-.143-.143-.318-.367-.477-.55-.16-.184-.213-.317-.318-.53-.105-.213-.053-.4-.026-.55.026-.15.294-.916.403-1.18.106-.255.213-.22.294-.22h.253c.184 0 .48.067.731.339.25.271.956.916.956 2.235 0 1.32-.976 2.593-1.111 2.772-.136.179-1.921 2.894-4.654 4.053-.65.276-1.157.441-1.554.566-.656.206-1.253.177-1.725.109-.526-.077-1.616-.653-1.844-1.285-.228-.632-.228-1.176-.159-1.285.07-.11.254-.18.573-.339z" />
              </svg>
              Start Chat
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
