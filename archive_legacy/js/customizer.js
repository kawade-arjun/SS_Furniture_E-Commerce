/**
 * SS Furniture - Custom Furniture Estimator & Spec Builder
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomizer();
});

function initCustomizer() {
  const roomSelect = document.getElementById('cust-room');
  const woodSelect = document.getElementById('cust-wood');
  const fabricSelect = document.getElementById('cust-fabric');
  const lengthInput = document.getElementById('cust-length');
  const lengthVal = document.getElementById('cust-length-val');
  const widthInput = document.getElementById('cust-width');
  const widthVal = document.getElementById('cust-width-val');
  const estPriceEl = document.getElementById('cust-price-est');
  const whatsappBtn = document.getElementById('cust-whatsapp-btn');

  if (!roomSelect || !woodSelect || !estPriceEl) return;

  const woodRates = {
    'Teak': 1400,
    'Walnut': 1600,
    'Sheesham': 1100,
    'Oak': 1250
  };

  const fabricRates = {
    'Italian Leather': 800,
    'Velvet': 450,
    'Microfiber Suede': 350,
    'Cotton Linen': 300
  };

  function calculateEstimate() {
    const room = roomSelect.value;
    const wood = woodSelect.value;
    const fabric = fabricSelect.value;
    const length = parseFloat(lengthInput ? lengthInput.value : 6);
    const width = parseFloat(widthInput ? widthInput.value : 3);

    if (lengthVal) lengthVal.textContent = `${length} ft`;
    if (widthVal) widthVal.textContent = `${width} ft`;

    const area = length * width;
    const woodRate = woodRates[wood] || 1200;
    const fabricRate = fabricRates[fabric] || 350;

    let baseEstimate = Math.round(area * (woodRate + fabricRate));
    if (baseEstimate < 25000) baseEstimate = 25000;

    const formattedPrice = '₹' + baseEstimate.toLocaleString('en-IN');
    estPriceEl.textContent = formattedPrice;

    if (whatsappBtn) {
      const message = `Hello SS Furniture, I used your online Custom Furniture Builder to design a custom piece:%0A%0A` +
        `• Room/Type: ${encodeURIComponent(room)}%0A` +
        `• Wood Finish: ${encodeURIComponent(wood)}%0A` +
        `• Fabric/Upholstery: ${encodeURIComponent(fabric)}%0A` +
        `• Dimensions: ${length} ft x ${width} ft (${area} sq ft)%0A` +
        `• Estimated Quote: ${formattedPrice}%0A%0A` +
        `Please contact me to discuss crafting options and final blueprint.`;
      whatsappBtn.href = `https://wa.me/919876543210?text=${message}`;
    }
  }

  [roomSelect, woodSelect, fabricSelect].forEach(select => {
    if (select) select.addEventListener('change', calculateEstimate);
  });

  [lengthInput, widthInput].forEach(input => {
    if (input) input.addEventListener('input', calculateEstimate);
  });

  calculateEstimate();
}
