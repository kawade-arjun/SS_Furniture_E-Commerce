import React, { useState, useEffect } from 'react';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch FAQ list from backend API
  useEffect(() => {
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching FAQs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* PAGE HERO */}
      <section className="pt-32 pb-16 bg-gradient-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="badge-gold">Help Center</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Everything you need to know about our solid wood, custom orders, delivery, and warranty policies.
          </p>
        </div>
      </section>

      {/* FAQ ACCORDION LIST */}
      <section className="py-20 bg-gradient-soft min-h-[500px]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {loading ? (
            <div className="text-center py-20 text-gray-500 font-medium">
              Loading FAQs...
            </div>
          ) : (
            faqs.map((faq, idx) => (
              <div
                key={faq.id}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="faq-item glass-card p-6 cursor-pointer text-left"
              >
                <div className="faq-question flex items-center justify-between font-serif font-bold text-lg text-gray-900">
                  <span>{faq.question}</span>
                  <svg
                    className={`faq-icon w-5 h-5 text-amber-700 transition-transform duration-300 ${
                      activeFaq === idx ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
