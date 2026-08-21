import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Book Showroom Visit');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email || !message) {
      showToast('Please fill out all required fields.', 'Validation Alert');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          message: `[Subject: ${subject}] ${message}`,
        }),
      });

      if (response.ok) {
        showToast(`Thank you, ${name}! Your enquiry has been received.`, 'Enquiry Submitted');
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        showToast('Error registering enquiry. Please try again.', 'Error Alert');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error submitting enquiry.', 'Connection Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* PAGE HERO */}
      <section className="pt-32 pb-16 bg-gradient-dark text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="badge-gold">Get In Touch</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-4">Contact SS Furniture</h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Visit our experience center, request a custom quote, or speak directly with our luxury consultant.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card p-8 sm:p-10 text-left">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">Send Us an Enquiry</h2>
            <p className="text-xs text-gray-500 mb-6">Our furniture specialist will respond within 2 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Govind raj"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 8220766926"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="govindraj@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
                >
                  <option value="Book Showroom Visit">Book Showroom Visit</option>
                  <option value="Custom Furniture Consultation">Custom Furniture Consultation</option>
                  <option value="Bulk Office / Commercial Order">Bulk Office / Commercial Order</option>
                  <option value="Interior Architect Collaboration">Interior Architect Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Message *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Describe required dimensions, wood preference, or home layout..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-amber-600"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full text-sm py-3.5 justify-center disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Furniture Enquiry →'}
              </button>
            </form>
          </div>

          {/* Showroom Info & Maps */}
          <div className="space-y-6 flex flex-col justify-between text-left">
            <div className="glass-card p-8 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-gray-900">Showroom Address</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <p>
                  <strong>Address:</strong> SS furniture and electronics Annur road Jeevanathapuram Opp-tata motors Mettupalayam Coimbatore 641301
                </p>
                <p>
                  <strong>Phone:</strong> +91 8220766926 / 9655492444
                </p>
                <p>
                  <strong>Email:</strong> ssfurnituremtp@gmail.com
                </p>
                <p>
                  <strong>Business Hours:</strong> Monday – Sunday: 10:00 AM – 9:00 PM (Open 7 Days)
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                <a href="tel:+919655492444" className="btn-gold text-xs py-2.5 px-6">
                  Call Now
                </a>
                <a
                  href="https://wa.me/919655492444?text=Hi%20SS%20Furniture,%20I%20want%20to%20visit%20your%20showroom"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-full hover:bg-emerald-700 transition-colors block text-center"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-amber-200 aspect-[16/9] bg-gray-200">
              <iframe
                title="SS Furniture Location Map"
                className="w-full h-full border-0"
                src="https://maps.google.com/maps?q=11.295162,76.949547&t=&z=17&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
