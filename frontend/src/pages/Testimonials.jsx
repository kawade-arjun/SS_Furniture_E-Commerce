import React from 'react';

const REVIEWS_DATA = [
  {
    stars: 5,
    quote: '"The Chesterfield leather sofa set we ordered for our villa in ECR is breathtaking! Solid teak wood structure and hand-rubbed leather finish."',
    author: 'Karthik Murugan',
    role: 'Villa Owner',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    stars: 5,
    quote: '"எங்கள் டைனிங் ரூம் அளவுக்கு சரியாக இருக்கும்படி ஒரு 8-சீட்டர் மார்பிள் டைனிங் டேபிளை SS Furniture செய்து கொடுத்தார்கள். குறித்த நேரத்தில் டெலிவரி செய்தார்கள்!"',
    author: 'Anbuselvi Ramesh',
    role: 'Interior Architect',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
  {
    stars: 5,
    quote: '"Bought a hydraulic storage king bed in solid walnut. Sturdy build, smooth hydraulic lifting, and zero creaking noise!"',
    author: 'Vigneshwaran Sundaram',
    role: 'Penthouse Owner',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    stars: 5,
    quote: '"நாங்கள் ஆர்டர் செய்த எக்ஸிகியூட்டிவ் ஆபீஸ் சேர்கள் முதுகு வலியை மிக நன்றாகக் குறைத்துள்ளன. பணத்திற்குச் சிறந்த மதிப்பு."',
    author: 'Senthil Nathan',
    role: 'Tech Founder',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  },
  {
    stars: 5,
    quote: '"Their custom furniture online tool made ordering so simple. Sent specs over WhatsApp and got 3D drawings within 24 hours."',
    author: 'Divya Bharathi',
    role: 'Apartment Owner',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    stars: 5,
    quote: '"The Sheesham 6-seater dining set has become the centerpiece of our home. செம பினிஷிங் மற்றும் தரம் (Awesome finish and quality)"',
    author: 'Ashok Kumar',
    role: 'Homeowner',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
  },
];

export default function Testimonials() {
  return (
    <div>
      {/* PAGE HERO */}
      <section className="pt-32 pb-16 bg-gradient-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="badge-gold">Verified Homeowner Feedback</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-4">Customer Reviews</h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Read experiences from clients who entrusted their living spaces to SS Furniture.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((r, idx) => (
            <div key={idx} className="glass-card p-8 space-y-4 text-left flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500 text-sm">
                  {Array.from({ length: r.stars }).map((_, i) => '★')}
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed">{r.quote}</p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-4">
                <img src={r.img} alt={r.author} className="w-12 h-12 rounded-full object-cover bg-gray-200" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{r.author}</h4>
                  <span className="text-xs text-emerald-600 font-semibold">Verified Buyer • {r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
