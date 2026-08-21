import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

import connectDB from './config/db.js';

// Mongoose Models
import Product from './models/Product.js';
import Gallery from './models/Gallery.js';
import Faq from './models/Faq.js';
import Inquiry from './models/Inquiry.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// -------------------------------------------------------------
// AdminJS Configuration
// -------------------------------------------------------------
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';

// Register the Mongoose adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Define AdminJS configuration options
const adminJsOptions = {
  resources: [
    { 
      resource: Product, 
      options: { 
        navigation: { name: 'Catalog', icon: 'ShoppingBag' },
        listProperties: ['image', 'name', 'category', 'price', 'material'],
        editProperties: ['id', 'name', 'category', 'price', 'oldPrice', 'badge', 'tag', 'rating', 'reviewsCount', 'dimensions', 'material', 'image', 'description'],
        showProperties: ['id', 'name', 'category', 'price', 'oldPrice', 'badge', 'tag', 'rating', 'reviewsCount', 'dimensions', 'material', 'image', 'description'],
        filterProperties: ['name', 'category', 'material'],
        properties: {
          id: { isId: true, description: 'Unique ID code (e.g. p1, p2, p3). DO NOT use spaces.' },
          name: { description: 'Name of the furniture item (e.g., Chesterfield Leather Sofa)' },
          category: { description: 'Category (e.g., sofas, dining, beds, office)' },
          price: { description: 'Display price including Rupee symbol (e.g. ₹45,000)' },
          oldPrice: { description: 'Original price before discount (optional, e.g. ₹55,000)' },
          badge: { description: 'Discount badge text (optional, e.g. -15% or Popular)' },
          tag: { description: 'Quality tag (optional, e.g. Solid Teak Wood or Premium Finish)' },
          rating: { description: 'Average customer rating (e.g., 4.8)' },
          reviewsCount: { description: 'Number of customer reviews' },
          dimensions: { description: 'Dimensions (e.g., 7ft x 3.5ft)' },
          material: { description: 'Wood/Fabric details (e.g., Sheesham Wood / Leatherette)' },
          image: { description: 'Direct web link to the product photo (e.g. https://images.unsplash.com/...)' },
          description: { type: 'textarea', description: 'Long description of wood grains, finish, warranty, or customization options.' }
        }
      } 
    },
    { 
      resource: Gallery, 
      options: { 
        navigation: { name: 'Showroom Photos', icon: 'Image' },
        listProperties: ['image', 'id', 'category', 'title'],
        editProperties: ['id', 'category', 'title', 'image'],
        showProperties: ['id', 'category', 'title', 'image'],
        properties: {
          id: { isId: true, description: 'Order number in grid (e.g. 1, 2, 3...)' },
          category: { description: 'Filter category (e.g., living, bedroom, dining)' },
          title: { description: 'Title overlay on photo hover' },
          image: { description: 'Direct web link to the gallery photo (e.g. https://images.unsplash.com/...)' }
        }
      } 
    },
    { 
      resource: Faq, 
      options: { 
        navigation: { name: 'Help Center', icon: 'HelpCircle' },
        listProperties: ['id', 'question'],
        editProperties: ['id', 'question', 'answer'],
        showProperties: ['id', 'question', 'answer'],
        properties: {
          id: { isId: true, description: 'Order number in FAQs (e.g. 1, 2, 3...)' },
          question: { description: 'Common customer question' },
          answer: { type: 'textarea', description: 'Detailed helpful answer' }
        }
      } 
    },
    { 
      resource: Inquiry, 
      options: { 
        navigation: { name: 'Customer Messages', icon: 'Mail' },
        listProperties: ['type', 'name', 'phone', 'email', 'estimatedPrice', 'createdAt'],
        showProperties: ['id', 'type', 'name', 'phone', 'email', 'message', 'room', 'wood', 'fabric', 'dimensions', 'estimatedPrice', 'createdAt'],
        actions: {
          new: { isVisible: false },
          edit: { isVisible: false }
        },
        properties: {
          id: { isId: true },
          type: { description: 'Inquiry type (general or custom_quote)' },
          message: { type: 'textarea' }
        }
      } 
    }
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'SS Furniture Showroom',
    logo: false,
    softwareBrothers: false,
    theme: {
      colors: {
        primary100: '#704214',
        primary80: '#A67C52',
        primary60: '#C69C6D',
        primary40: '#E6DFD3',
        primary20: '#F4EFE6'
      }
    }
  }
};

const admin = new AdminJS(adminJsOptions);

// Build the authenticated router
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate: async (email, password) => {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ssfurniture.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return { email: ADMIN_EMAIL };
    }
    return null;
  },
  cookieName: 'adminjs_session',
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD || 'super-secret-password-must-be-long-32-chars-minimum',
}, null, {
  resave: false,
  saveUninitialized: true,
  secret: 'session-secret-key-123',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
});

// Mount the AdminJS router BEFORE mounting other body parsers to prevent multer conflicts
app.use(admin.options.rootPath, adminRouter);
// -------------------------------------------------------------

// Middleware for general API routes
app.use(cors());
app.use(express.json());

// API Routes

// 1. Get Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    res.status(500).json({ error: 'Server error fetching products' });
  }
});

// 2. Get Gallery items
app.get('/api/gallery', async (req, res) => {
  try {
    const gallery = await Gallery.find({}).sort({ id: 1 });
    res.json(gallery);
  } catch (error) {
    console.error('Error fetching gallery from MongoDB:', error);
    res.status(500).json({ error: 'Server error fetching gallery' });
  }
});

// 3. Get FAQs
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await Faq.find({}).sort({ id: 1 });
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs from MongoDB:', error);
    res.status(500).json({ error: 'Server error fetching FAQs' });
  }
});

// 4. Submit General Contact Inquiry
app.post('/api/inquiries', async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newInquiry = new Inquiry({
      id: 'inq_' + Date.now(),
      type: 'general',
      name,
      phone,
      email,
      message
    });

    await newInquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully', data: newInquiry });
  } catch (error) {
    console.error('Error saving inquiry in MongoDB:', error);
    res.status(500).json({ error: 'Server error saving inquiry' });
  }
});

// 5. Submit Custom Furniture Quote
app.post('/api/custom-quotes', async (req, res) => {
  const { room, wood, fabric, length, width, estimatedPrice } = req.body;

  if (!room || !wood || !fabric || !length || !width || !estimatedPrice) {
    return res.status(400).json({ error: 'All customization specs are required' });
  }

  try {
    const newQuote = new Inquiry({
      id: 'quote_' + Date.now(),
      type: 'custom_quote',
      room,
      wood,
      fabric,
      dimensions: `${length}ft x ${width}ft`,
      estimatedPrice
    });

    await newQuote.save();
    res.status(201).json({ message: 'Custom quote logged successfully', data: newQuote });
  } catch (error) {
    console.error('Error saving custom quote in MongoDB:', error);
    res.status(500).json({ error: 'Server error saving custom quote' });
  }
});

// Serve static assets in production if frontend/dist folder exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');

app.use(express.static(frontendDistPath));

// Fallback index.html mapping for React Router SPA (wildcard route)
// Mount this AFTER all API routes and AdminJS router
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`SS Furniture backend listening on port ${PORT}`);
});
