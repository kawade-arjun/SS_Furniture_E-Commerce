const express = require('express'); // Node.js framework for building APIs
const cors = require('cors'); // js library used to connect frontend and backend
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database file paths
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const GALLERY_FILE = path.join(__dirname, 'data', 'gallery.json');
const FAQS_FILE = path.join(__dirname, 'data', 'faqs.json');
const INQUIRIES_FILE = path.join(__dirname, 'data', 'inquiries.json');

// Helper function to read JSON files safely
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file: ${filePath}`, error);
    return [];
  }
}

// Helper function to write JSON files safely
async function writeJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file: ${filePath}`, error);
    return false;
  }
}

// API Routes

// 1. Get Products
app.get('/api/products', async (req, res) => {
  const products = await readJsonFile(PRODUCTS_FILE);
  res.json(products);
});

// 2. Get Gallery items
app.get('/api/gallery', async (req, res) => {
  const gallery = await readJsonFile(GALLERY_FILE);
  res.json(gallery);
});

// 3. Get FAQs
app.get('/api/faqs', async (req, res) => {
  const faqs = await readJsonFile(FAQS_FILE);
  res.json(faqs);
});

// 4. Submit General Contact Inquiry
app.post('/api/inquiries', async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const inquiries = await readJsonFile(INQUIRIES_FILE);
  const newInquiry = {
    id: 'inq_' + Date.now(),
    type: 'general',
    name,
    phone,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  inquiries.push(newInquiry);
  const success = await writeJsonFile(INQUIRIES_FILE, inquiries);

  if (success) {
    res.status(201).json({ message: 'Inquiry submitted successfully', data: newInquiry });
  } else {
    res.status(500).json({ error: 'Server error saving inquiry' });
  }
});

// 5. Submit Custom Furniture Quote
app.post('/api/custom-quotes', async (req, res) => {
  const { room, wood, fabric, length, width, estimatedPrice } = req.body;

  if (!room || !wood || !fabric || !length || !width || !estimatedPrice) {
    return res.status(400).json({ error: 'All customization specs are required' });
  }

  const inquiries = await readJsonFile(INQUIRIES_FILE);
  const newQuote = {
    id: 'quote_' + Date.now(),
    type: 'custom_quote',
    room,
    wood,
    fabric,
    dimensions: `${length}ft x ${width}ft`,
    estimatedPrice,
    timestamp: new Date().toISOString()
  };

  inquiries.push(newQuote);
  const success = await writeJsonFile(INQUIRIES_FILE, inquiries);

  if (success) {
    res.status(201).json({ message: 'Custom quote logged successfully', data: newQuote });
  } else {
    res.status(500).json({ error: 'Server error saving quote' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`SS Furniture backend listening on port ${PORT}`);
});
