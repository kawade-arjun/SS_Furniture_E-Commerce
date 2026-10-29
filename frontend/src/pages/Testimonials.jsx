import React, { useState, useEffect } from 'react';

const REVIEWS_DATA = [
  {
    stars: 5,
    quote: '"The Chesterfield leather sofa set we ordered for our villa in ECR is breathtaking! Solid teak wood structure and hand-rubbed leather finish."',
    author: 'Karthik Murugan',
    role: 'Villa Owner',
  },
  {
    stars: 5,
    quote: '"எங்கள் டைனிங் ரூம் அளவுக்கு சரியாக இருக்கும்படி ஒரு 8-சீட்டர் மார்பிள் டைனிங் டேபிளை SS Furniture செய்து கொடுத்தார்கள். குறித்த நேரத்தில் டெலிவரி செய்தார்கள்!"',
    author: 'Anbuselvi Ramesh',
    role: 'Interior Architect',
  },
  {
    stars: 5,
    quote: '"Bought a hydraulic storage king bed in solid walnut. Sturdy build, smooth hydraulic lifting, and zero creaking noise!"',
    author: 'Vigneshwaran Sundaram',
    role: 'Penthouse Owner',
  },
  {
    stars: 5,
    quote: '"நாங்கள் ஆர்டர் செய்த எக்ஸிகியூட்டிவ் ஆபீஸ் சேர்கள் முதுகு வலியை மிக நன்றாகக் குறைத்துள்ளன. பணத்திற்குச் சிறந்த மதிப்பு."',
    author: 'Senthil Nathan',
    role: 'Tech Founder',
  },
  {
    stars: 5,
    quote: '"Their custom furniture online tool made ordering so simple. Sent specs over WhatsApp and got 3D drawings within 24 hours."',
    author: 'Divya Bharathi',
    role: 'Apartment Owner',
  },
  {
    stars: 5,
    quote: '"The Sheesham 6-seater dining set has become the centerpiece of our home. செம பினிஷிங் மற்றும் தரம் (Awesome finish and quality)"',
    author: 'Ashok Kumar',
    role: 'Homeowner',
  },
];

export default function Testimonials() {
  const [reviews, setReviews] = useState(REVIEWS_DATA);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [stars, setStars] = useState(5);
  const [hoverStars, setHoverStars] = useState(0);
  const [quote, setQuote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch testimonials from API on load
  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      })
      .catch((err) => {
        console.warn('Using local reviews fallback:', err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) {
      setErrorMsg('Please provide your name and your review experience.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: author.trim(),
          role: role.trim() || 'Verified Customer',
          stars,
          quote: quote.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      const newTestimonial = data.testimonial || data.data;
      if (newTestimonial) {
        setReviews((prev) => [newTestimonial, ...prev]);
      }
      setSuccessMsg('🎉 Thank you! Your testimonial has been published successfully.');
      setAuthor('');
      setRole('');
      setQuote('');
      setStars(5);
      setTimeout(() => {
        setShowModal(false);
        setSuccessMsg('');
      }, 2500);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStarText = (num) => {
    switch (num) {
      case 5: return '5 Stars - Regal & Flawless';
      case 4: return '4 Stars - Great Craftsmanship';
      case 3: return '3 Stars - Satisfactory';
      case 2: return '2 Stars - Needs Improvement';
      case 1: return '1 Star - Unsatisfactory';
      default: return '';
    }
  };

  return (
    <div>
      {/* PAGE HERO */}
      <section className="pt-32 pb-16 bg-gradient-dark text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="badge-gold">Verified Homeowner Feedback</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-4">Customer Reviews & Stories</h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto mb-8">
            Read authentic experiences from homeowners, architects, and designers who chose SS Furniture for bespoke solid wood luxury.
          </p>

          <button
            onClick={() => {
              setShowModal(true);
              setSuccessMsg('');
              setErrorMsg('');
            }}
            className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 shadow-xl text-sm font-bold uppercase tracking-wider transform hover:-translate-y-0.5 transition-all"
          >
            <span>✍️</span>
            <span>Share Your Experience</span>
          </button>
        </div>
      </section>

      {/* STATS HIGHLIGHT BAR */}
      <section className="bg-amber-900/90 text-amber-50 py-6 border-y border-amber-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold font-serif text-white">4.9 / 5.0</div>
            <div className="text-xs text-amber-200 mt-0.5">Average Customer Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-serif text-white">{reviews.length}+</div>
            <div className="text-xs text-amber-200 mt-0.5">Verified Testimonials</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-serif text-white">100%</div>
            <div className="text-xs text-amber-200 mt-0.5">Solid Sheesham & Teak Wood</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-serif text-white">12,000+</div>
            <div className="text-xs text-amber-200 mt-0.5">Happy Living Spaces</div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                All Customer Reviews ({reviews.length})
              </h2>
              <p className="text-xs text-gray-500 mt-1">Authentic experiences from verified homeowners across India.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-xs font-bold text-amber-900 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5"
            >
              <span>+</span>
              <span>Write a Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, idx) => (
              <div 
                key={r._id || r.id || idx} 
                className="glass-card p-8 space-y-4 text-left flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-amber-100/60 bg-white"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500 text-base">
                    {Array.from({ length: r.stars || 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm italic leading-relaxed">
                    {r.quote.startsWith('"') ? r.quote : `"${r.quote}"`}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{r.author}</h4>
                    <span className="text-xs text-amber-800/80 font-medium">{r.role || 'Verified Customer'}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">
                    ✓ Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL: SUBMIT TESTIMONIAL */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl shadow-2xl p-6 sm:p-8 border border-amber-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center font-bold text-xl transition-all"
            >
              &times;
            </button>

            <div className="mb-5">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                Customer Testimonial
              </span>
              <h3 className="font-serif text-2xl font-bold text-gray-900 mt-2">
                Share Your SS Furniture Experience
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                No account required. Tell us about the furniture quality, wood finish, or delivery.
              </p>
            </div>

            {successMsg ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-2xl text-center space-y-1">
                <p className="font-bold">{successMsg}</p>
                <p className="text-xs text-emerald-600">Your review is now live in the showroom testimonials!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 5-Star Rating Picker */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Overall Rating *</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const active = (hoverStars || stars) >= starVal;
                      return (
                        <button
                          type="button"
                          key={starVal}
                          onClick={() => setStars(starVal)}
                          onMouseEnter={() => setHoverStars(starVal)}
                          onMouseLeave={() => setHoverStars(0)}
                          className="p-1 focus:outline-none transition-transform hover:scale-125"
                        >
                          <svg
                            className={`w-7 h-7 ${active ? 'fill-amber-400 text-amber-400' : 'fill-none stroke-gray-300'}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      );
                    })}
                    <span className="text-xs text-amber-900 font-semibold ml-2">
                      {getStarText(hoverStars || stars)}
                    </span>
                  </div>
                </div>

                {/* Name & Role Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Ramesh Sundaram"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:border-amber-800 focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">City / Profession (Optional)</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Homeowner, Chennai"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:border-amber-800 focus:outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Review Quote Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Review & Feedback *</label>
                  <textarea
                    required
                    rows="3"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Tell us what you liked about our solid wood furniture, customized designs, or on-time delivery..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-amber-800 focus:outline-none bg-white resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Post Testimonial'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
