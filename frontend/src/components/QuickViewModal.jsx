import React, { useState, useEffect } from 'react';

export default function QuickViewModal({ product, onClose, onReviewAdded }) {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'reviews'
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Review form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Local copy of product stats so they update instantly upon submission
  const [currentRating, setCurrentRating] = useState(product.rating || 5);
  const [currentReviewsCount, setCurrentReviewsCount] = useState(product.reviewsCount || 0);

  // Fetch reviews when modal opens or when tab changes to reviews
  useEffect(() => {
    let isMounted = true;
    setLoadingReviews(true);

    fetch(`/api/products/${product.id}/reviews`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load reviews');
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setReviews(data);
          setLoadingReviews(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
        if (isMounted) setLoadingReviews(false);
      });

    return () => {
      isMounted = false;
    };
  }, [product.id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setErrorMessage('Please fill in your name and review comment.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch(`/api/products/${product.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      // Add newly submitted review to local reviews list
      setReviews((prev) => [data.review, ...prev]);
      setCurrentRating(data.updatedRating);
      setCurrentReviewsCount(data.updatedReviewsCount);
      setSuccessMessage('Thank you! Your review has been published.');
      setName('');
      setEmail('');
      setComment('');
      setRating(5);
      setShowReviewForm(false);

      // Notify parent page if callback provided
      if (onReviewAdded) {
        onReviewAdded(product.id, data.updatedRating, data.updatedReviewsCount);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getRatingLabel = (val) => {
    switch (val) {
      case 5: return '5 Stars - Exceptional Quality';
      case 4: return '4 Stars - Very Good';
      case 3: return '3 Stars - Average';
      case 2: return '2 Stars - Below Expectations';
      case 1: return '1 Star - Poor';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FDFBF7] rounded-3xl shadow-2xl p-5 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 border border-amber-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-white/80 hover:bg-gray-200 border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center font-bold text-2xl transition-all shadow-sm z-10"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Product Image Column */}
        <div className="w-full md:w-5/12 flex flex-col">
          <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-inner bg-gray-100 border border-amber-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Quick Stats below image */}
          <div className="mt-4 p-4 rounded-xl bg-amber-50/60 border border-amber-100 text-xs text-amber-950 space-y-1.5 hidden md:block">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Category:</span>
              <span className="font-bold">{product.category}</span>
            </div>
            {product.material && (
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Material:</span>
                <span className="font-bold text-right truncate max-w-[170px]">{product.material}</span>
              </div>
            )}
            {product.dimensions && (
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Dimensions:</span>
                <span className="font-bold">{product.dimensions}</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info & Tabs Column */}
        <div className="w-full md:w-7/12 flex flex-col justify-between">
          <div>
            {/* Header: Badges & Name */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {product.badge && <span className="badge-gold">{product.badge}</span>}
              <span className="badge-dark">{product.category}</span>
            </div>
            
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 leading-tight">
              {product.name}
            </h3>

            {/* Clickable Rating Bar */}
            <div 
              onClick={() => setActiveTab('reviews')}
              className="flex items-center gap-2 mt-2 cursor-pointer group w-fit"
              title="Click to view reviews"
            >
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(currentRating) ? 'fill-current' : 'stroke-current fill-none'
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-gray-900 text-sm">{currentRating}</span>
              <span className="text-xs text-amber-800 underline group-hover:text-amber-600 transition-colors">
                ({currentReviewsCount} {currentReviewsCount === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 my-4">
              <span className="text-3xl font-bold text-amber-900">{product.price}</span>
              {product.oldPrice && (
                <span className="text-base text-gray-400 line-through">{product.oldPrice}</span>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 mb-4 gap-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'details'
                    ? 'border-amber-800 text-amber-900'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Overview & Specs
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all ${
                  activeTab === 'reviews'
                    ? 'border-amber-800 text-amber-900'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <span>Customer Reviews</span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-900 font-bold">
                  {currentReviewsCount}
                </span>
              </button>
            </div>

            {/* TAB CONTENT: Details */}
            {activeTab === 'details' && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.description || 'Handcrafted solid wood furniture tailored for long-lasting structural strength and regal aesthetics.'}
                </p>

                <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-700">
                  {product.dimensions && (
                    <div>
                      <span className="font-bold text-gray-900">Dimensions:</span> {product.dimensions}
                    </div>
                  )}
                  {product.material && (
                    <div>
                      <span className="font-bold text-gray-900">Materials:</span> {product.material}
                    </div>
                  )}
                  {product.tag && (
                    <div>
                      <span className="font-bold text-gray-900">Tag:</span> {product.tag}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-4 animate-fade-in max-h-[340px] overflow-y-auto pr-1">
                {/* Reviews Header Banner */}
                <div className="flex items-center justify-between bg-amber-50/70 p-3.5 rounded-2xl border border-amber-100">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xl font-bold text-amber-950">{currentRating}</span>
                      <span className="text-amber-500 text-lg">★</span>
                      <span className="text-xs text-gray-600 font-medium">out of 5 stars</span>
                    </div>
                    <p className="text-xs text-gray-500">Based on {currentReviewsCount} customer ratings</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowReviewForm(!showReviewForm);
                      setSuccessMessage('');
                      setErrorMessage('');
                    }}
                    className="px-4 py-2 bg-amber-900 hover:bg-amber-950 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    {showReviewForm ? 'Cancel' : '✍️ Write a Review'}
                  </button>
                </div>

                {/* Success Feedback Alert */}
                {successMessage && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
                    <span>{successMessage}</span>
                    <button onClick={() => setSuccessMessage('')} className="font-bold text-sm ml-2">×</button>
                  </div>
                )}

                {/* SUBMIT REVIEW FORM */}
                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className="p-4 bg-white rounded-2xl border border-amber-200/80 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Leave Customer Review</span>
                      <span className="text-[11px] text-gray-400">No login required</span>
                    </div>

                    {/* Interactive 5-Star Rating Picker */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Your Rating *</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((starVal) => {
                          const active = (hoverRating || rating) >= starVal;
                          return (
                            <button
                              type="button"
                              key={starVal}
                              onClick={() => setRating(starVal)}
                              onMouseEnter={() => setHoverRating(starVal)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="p-1 focus:outline-none transition-transform hover:scale-125"
                            >
                              <svg
                                className={`w-6 h-6 ${active ? 'fill-amber-400 text-amber-400' : 'fill-none stroke-gray-300'}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                          );
                        })}
                        <span className="text-xs text-amber-900 font-medium ml-2">
                          {getRatingLabel(hoverRating || rating)}
                        </span>
                      </div>
                    </div>

                    {/* Reviewer Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Arjun K."
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-300 focus:border-amber-800 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">City / Location (Optional)</label>
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. Coimbatore or Chennai"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-300 focus:border-amber-800 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Review Comment */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">Review Feedback *</label>
                      <textarea
                        required
                        rows="2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell others about the wood finish, durability, comfort, or delivery..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:border-amber-800 focus:outline-none resize-none"
                      />
                    </div>

                    {errorMessage && (
                      <div className="text-[11px] text-red-600 bg-red-50 p-2 rounded-lg">{errorMessage}</div>
                    )}

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold rounded-lg transition-all shadow-sm disabled:opacity-50"
                      >
                        {submitting ? 'Submitting...' : 'Post Review'}
                      </button>
                    </div>
                  </form>
                )}

                {/* REVIEWS LIST */}
                {loadingReviews ? (
                  <div className="py-8 text-center text-xs text-gray-400">Loading reviews...</div>
                ) : reviews.length === 0 ? (
                  <div className="py-8 text-center bg-white rounded-2xl border border-dashed border-gray-200">
                    <p className="text-sm font-semibold text-gray-700">No reviews yet for this piece</p>
                    <p className="text-xs text-gray-400 mt-1">Be the first verified customer to share your thoughts!</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {reviews.map((rev) => (
                      <div key={rev._id || rev.id || Math.random()} className="p-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                              {rev.name ? rev.name.charAt(0).toUpperCase() : 'C'}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-900 leading-none">{rev.name}</p>
                              {rev.email && <p className="text-[10px] text-gray-400 mt-0.5">{rev.email}</p>}
                            </div>
                          </div>
                          <div className="flex text-amber-400 text-xs">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i}>{i < rev.rating ? '★' : '☆'}</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed pl-9">
                          "{rev.comment}"
                        </p>
                        <div className="flex justify-between items-center text-[10px] text-gray-400 pl-9 pt-1">
                          <span>Verified Customer</span>
                          <span>{rev.createdAt ? new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/919655492444?text=Hi%20SS%20Furniture,%20I'd%20like%20to%20inquire%20about%20ordering%20the%20${encodeURIComponent(
                product.name
              )}%20(${product.id}).`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 btn-gold text-center justify-center text-sm py-3 font-bold"
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
