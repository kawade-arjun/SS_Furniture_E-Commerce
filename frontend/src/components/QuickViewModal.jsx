import React from 'react';

export default function QuickViewModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FDFBF7] rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 border border-amber-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center font-bold text-2xl transition-all"
        >
          &times;
        </button>

        {/* Product Image Column */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[420px] rounded-2xl overflow-hidden shadow-inner bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {product.badge && <span className="badge-gold">{product.badge}</span>}
              <span className="badge-dark">{product.category}</span>
            </div>
            
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 leading-tight">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold">{product.rating}</span>
              <span>({product.reviewsCount} reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-amber-900">{product.price}</span>
              {product.oldPrice && (
                <span className="text-base text-gray-400 line-through">{product.oldPrice}</span>
              )}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Details Table */}
            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-700">
              <div>
                <span className="font-bold text-gray-900">Dimensions:</span> {product.dimensions}
              </div>
              <div>
                <span className="font-bold text-gray-900">Materials:</span> {product.material}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href={`https://wa.me/919655492444?text=Hi%20SS%20Furniture,%20I'd%20like%20to%20inquire%20about%20ordering%20the%20${encodeURIComponent(
                product.name
              )}%20(${product.id}).`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 btn-gold text-center justify-center text-sm py-3"
            >
              Order on WhatsApp
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold text-sm hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
