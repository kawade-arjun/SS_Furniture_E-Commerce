import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

const WOOD_RATES = {
  'Teak': 1400,
  'Walnut': 1600,
  'Sheesham': 1100,
  'Oak': 1250
};

const FABRIC_RATES = {
  'Italian Leather': 800,
  'Velvet': 450,
  'Microfiber Suede': 350,
  'Cotton Linen': 300
};

export default function CustomizerSection() {
  const { showToast } = useToast();
  
  const [room, setRoom] = useState('Living Room');
  const [wood, setWood] = useState('Teak');
  const [fabric, setFabric] = useState('Italian Leather');
  const [length, setLength] = useState(6);
  const [width, setWidth] = useState(3);
  const [estimatedPrice, setEstimatedPrice] = useState(25000);
  const [whatsappHref, setWhatsappHref] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const area = length * width;
    const woodRate = WOOD_RATES[wood] || 1200;
    const fabricRate = FABRIC_RATES[fabric] || 350;

    let baseEstimate = Math.round(area * (woodRate + fabricRate));
    if (baseEstimate < 25000) baseEstimate = 25000;
    setEstimatedPrice(baseEstimate);

    const formattedPrice = '₹' + baseEstimate.toLocaleString('en-IN');
    const message = `Hello SS Furniture, I used your online Custom Furniture Builder to design a custom piece:\n\n` +
      `• Room/Type: ${room}\n` +
      `• Wood Finish: ${wood}\n` +
      `• Fabric/Upholstery: ${fabric}\n` +
      `• Dimensions: ${length} ft x ${width} ft (${area} sq ft)\n` +
      `• Estimated Quote: ${formattedPrice}\n\n` +
      `Please contact me to discuss crafting options and final blueprint.`;

    setWhatsappHref(`https://wa.me/919655492444?text=${encodeURIComponent(message)}`);
  }, [room, wood, fabric, length, width]);

  const handleSubmitSpec = async (e) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/custom-quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room,
          wood,
          fabric,
          length,
          width,
          estimatedPrice: '₹' + estimatedPrice.toLocaleString('en-IN')
        })
      });

      if (response.ok) {
        showToast('Your custom specs have been logged. Click below to chat on WhatsApp!', 'Specs Registered');
      } else {
        showToast('Error registering your specs on the server.', 'Customizer Error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error logging quote.', 'Connection Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="customizer-section" className="py-20 bg-gradient-soft border-t border-gray-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge-gold">Bespoke Design Studio</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Estimate Your Custom Furniture
          </h2>
          <p className="text-sm text-gray-600">
            Select timber species, luxury fabrics, and drag the sliders to configure exact specifications. Get instant price approximations.
          </p>
        </div>

        <div className="glass-card p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Customizer Inputs Form */}
          <div className="space-y-6">
            
            {/* Room Select */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Room / Furniture Category</label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600 transition-colors"
              >
                <option value="Living Room">Living Room (Sofa, Lounge, Accent Chairs)</option>
                <option value="Bedroom">Bedroom (Beds, Dressers, Bedside Tables)</option>
                <option value="Dining Room">Dining Room (Dining Tables, Credenzas)</option>
                <option value="Office">Office Furniture (Executive Desks, Chairs)</option>
                <option value="Storage">Storage & Cabinets (Wardrobes, Sideboards)</option>
                <option value="Kitchen">Modular Kitchen / Kitchen Islands</option>
              </select>
            </div>

            {/* Wood Species */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Wood Species / Hardwood Finish</label>
              <select
                value={wood}
                onChange={(e) => setWood(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600 transition-colors"
              >
                <option value="Teak">Grade-A Seasoned Teak Wood (Premium)</option>
                <option value="Walnut">Imported American Walnut Finish</option>
                <option value="Sheesham">100% Solid Indian Sheesham (Honey Grain)</option>
                <option value="Oak">European White Oak Finish</option>
              </select>
            </div>

            {/* Fabric/Upholstery */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Upholstery & Textiles</label>
              <select
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600 transition-colors"
              >
                <option value="Italian Leather">Genuine Italian Upholstery Leather</option>
                <option value="Velvet">Ultra-Plush Velvet Fabric</option>
                <option value="Microfiber Suede">Stain-Resistant Microfiber Suede</option>
                <option value="Cotton Linen">Organic Woven Cotton Linen</option>
              </select>
            </div>

            {/* Length Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-2">
                <span>APPROXIMATE LENGTH</span>
                <span className="text-amber-700 font-bold">{length} ft</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
              />
            </div>

            {/* Width Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-2">
                <span>APPROXIMATE WIDTH / DEPTH</span>
                <span className="text-amber-700 font-bold">{width} ft</span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                step="0.5"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
              />
            </div>

          </div>

          {/* Pricing Display */}
          <div className="bg-gradient-dark rounded-2xl p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12"></div>
            
            <div className="space-y-6">
              <h4 className="font-serif text-xl font-bold tracking-tight text-amber-400">Spec Estimation Summary</h4>
              
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between"><span className="text-gray-400">Room Category:</span> <span className="font-semibold text-white">{room}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Wood Timber:</span> <span className="font-semibold text-white">{wood}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Upholstery:</span> <span className="font-semibold text-white">{fabric}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Configured Dimensions:</span> <span className="font-semibold text-white">{length} ft x {width} ft</span></div>
                <div className="flex justify-between border-t border-white/10 pt-3"><span className="text-gray-400">Total Fabric & Wood Area:</span> <span className="font-semibold text-white">{length * width} sq ft</span></div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Estimated Quote:</span>
                <span className="text-3xl font-bold text-amber-400 font-serif">₹{estimatedPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSubmitSpec}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering...' : 'Register Custom Blueprint'}
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => handleSubmitSpec()}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm text-center rounded-xl transition-colors block"
                >
                  Request Crafting on WhatsApp
                </a>
              </div>
              <p className="text-[10px] text-gray-500 text-center leading-relaxed">
                *Estimated quotes are subject to blueprint reviews. Crafting time is typically 14-21 business days from confirmation.
              </p>
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}
