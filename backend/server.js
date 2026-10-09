import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

import connectDB from './config/db.js';

// Mongoose Models
import Product from './models/Product.js';
import Category from './models/Category.js';
import Testimonial from './models/Testimonial.js';
import Order from './models/Order.js';
import Subscriber from './models/Subscriber.js';
import Gallery from './models/Gallery.js';
import Faq from './models/Faq.js';
import Inquiry from './models/Inquiry.js';
import Banner from './models/Banner.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB and seed banners if collection is empty
connectDB().then(async () => {
  try {
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      const defaultBanners = [
        {
          id: 'banner_1',
          badge: 'Handcrafted Perfection',
          title: 'Redefine Luxury Living With SS Furniture',
          description: 'Discover bespoke solid wood furniture, artisan Chesterfield sofas, and tailored interior creations built to inspire generations.',
          bg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80',
          btnLink: '/products',
          btnText: 'Explore Collection',
          hasCustomizerBtn: true,
          order: 1,
          isActive: true,
        },
        {
          id: 'banner_2',
          badge: 'Artisan Dining Collection',
          title: 'Gather Around Italian Marble & Teak Elegance',
          description: 'Transform meal times into regal dining experiences with custom-crafted marble tops and solid Sheesham wood dining suites.',
          bg: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2000&q=80',
          btnLink: '/products?category=Dining Tables',
          btnText: 'View Dining Sets',
          hasCustomizerBtn: false,
          order: 2,
          isActive: true,
        },
        {
          id: 'banner_3',
          badge: 'Sanctuary Bedding',
          title: 'Sleep In Masterpiece Walnut Beds',
          description: 'Hydraulic storage convenience meets velvet upholstered luxury. Engineered for lifetime structural durability.',
          bg: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80',
          btnLink: '/products?category=Beds',
          btnText: 'Browse Bedrooms',
          hasCustomizerBtn: false,
          order: 3,
          isActive: true,
        },
      ];
      await Banner.insertMany(defaultBanners);
      console.log('Default home hero banners initialized in MongoDB Atlas.');
    }
  } catch (e) {
    console.error('Error auto-seeding banners:', e);
  }
});


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
      resource: Category, 
      options: { 
        navigation: { name: 'Catalog', icon: 'Grid' },
        listProperties: ['image', 'name', 'catParam', 'models'],
        editProperties: ['id', 'name', 'catParam', 'models', 'desc', 'image', 'order'],
        showProperties: ['id', 'name', 'catParam', 'models', 'desc', 'image', 'order'],
        properties: {
          id: { isId: true, description: 'Category identifier code (e.g. cat_sofas)' },
          desc: { type: 'textarea' }
        }
      } 
    },
    { 
      resource: Order, 
      options: { 
        navigation: { name: 'E-Commerce', icon: 'DollarSign' },
        listProperties: ['orderId', 'totalAmount', 'status', 'paymentMethod', 'paymentStatus', 'createdAt'],
        showProperties: ['orderId', 'customer', 'items', 'totalAmount', 'status', 'paymentMethod', 'paymentStatus', 'notes', 'createdAt'],
        editProperties: ['status', 'paymentStatus', 'notes'],
        properties: {
          orderId: { isId: true },
          notes: { type: 'textarea' }
        }
      } 
    },
    { 
      resource: Testimonial, 
      options: { 
        navigation: { name: 'Feedback', icon: 'Star' },
        listProperties: ['img', 'author', 'role', 'stars', 'isFeatured'],
        editProperties: ['id', 'author', 'role', 'stars', 'quote', 'img', 'isFeatured'],
        showProperties: ['id', 'author', 'role', 'stars', 'quote', 'img', 'isFeatured'],
        properties: {
          id: { isId: true },
          quote: { type: 'textarea' }
        }
      } 
    },
    { 
      resource: Subscriber, 
      options: { 
        navigation: { name: 'Marketing', icon: 'UserCheck' },
        listProperties: ['email', 'isActive', 'createdAt'],
        editProperties: ['email', 'isActive'],
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


// Middleware for general API routes
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsPath));

// Multer storage setup for local file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-');
    cb(null, `${cleanName}-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WebP) are allowed!'), false);
    }
  }
});

// File Upload Endpoint (Saves local file and returns public URL)
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl, filename: req.file.filename });
});

// Admin Login Verification Endpoint
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ssfurniture.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true, email: ADMIN_EMAIL, token: 'ss_furniture_admin_session' });
  }
  return res.status(401).json({ error: 'Invalid admin credentials' });
});

// API Routes

// 1. Get Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    // Exclude any products whose essential data is not available
    const availableProducts = products.filter(
      (p) => p.name && p.name.trim() !== '' && p.price && p.price.trim() !== '' && p.image && p.image.trim() !== ''
    );
    res.json(availableProducts);
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    res.status(500).json({ error: 'Server error fetching products' });
  }
});

// 1b. Create Product (MongoDB Cloud)
app.post('/api/products', async (req, res) => {
  try {
    const { name, category, price, oldPrice, badge, tag, material, dimensions, image, description } = req.body;
    if (!name || !category || !price) {
      return res.status(400).json({ error: 'Name, category, and price are required' });
    }
    const customId = req.body.id || `p_${Date.now()}`;
    const product = new Product({
      id: customId,
      name,
      category,
      price,
      oldPrice: oldPrice || '',
      badge: badge || '',
      tag: tag || '',
      material: material || '',
      dimensions: dimensions || '',
      image: image || '',
      description: description || '',
    });
    await product.save();
    console.log(`Product created in Cloud: ${product.name} (${product.id})`);
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product in database' });
  }
});

// 1c. Update Product (MongoDB Cloud)
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const query = isObjectId ? { $or: [{ _id: id }, { id }] } : { id };
    
    const product = await Product.findOneAndUpdate(query, { $set: updateData }, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log(`Product updated in Cloud: ${product.name} (${product.id})`);
    res.json(product);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product in database' });
  }
});

// 1d. Delete Product (MongoDB Cloud)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const query = isObjectId ? { $or: [{ _id: id }, { id }] } : { id };

    const product = await Product.findOneAndDelete(query);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log(`Product deleted from Cloud: ${product.name} (${product.id})`);
    res.json({ message: 'Product deleted successfully', id });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product from database' });
  }
});

// ==========================================
// Banners & Hero Ads Endpoints (MongoDB Cloud)
// ==========================================

// 1e. Get active banners for public homepage
app.get('/api/banners', async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    res.json(banners);
  } catch (error) {
    console.error('Error fetching banners from MongoDB:', error);
    res.status(500).json({ error: 'Server error fetching banners' });
  }
});

// 1f. Get all banners (including inactive) for Admin
app.get('/api/banners/all', async (req, res) => {
  try {
    const banners = await Banner.find({}).sort({ order: 1, createdAt: 1 });
    res.json(banners);
  } catch (error) {
    console.error('Error fetching all banners from MongoDB:', error);
    res.status(500).json({ error: 'Server error fetching banners' });
  }
});

// 1g. Create Banner (MongoDB Cloud)
app.post('/api/banners', async (req, res) => {
  try {
    const { title, badge, description, bg, btnLink, btnText, hasCustomizerBtn, order, isActive } = req.body;
    if (!title || !bg) {
      return res.status(400).json({ error: 'Title and background image URL/path are required' });
    }
    const customId = req.body.id || `banner_${Date.now()}`;
    const banner = new Banner({
      id: customId,
      title,
      badge: badge || 'Special Offer',
      description: description || '',
      bg,
      btnLink: btnLink || '/products',
      btnText: btnText || 'Explore Collection',
      hasCustomizerBtn: Boolean(hasCustomizerBtn),
      order: Number(order) || 0,
      isActive: isActive !== false,
    });
    await banner.save();
    console.log(`Banner created in Cloud: ${banner.title} (${banner.id})`);
    res.status(201).json(banner);
  } catch (err) {
    console.error('Error creating banner:', err);
    res.status(500).json({ error: 'Failed to create banner in database' });
  }
});

// 1h. Update Banner (MongoDB Cloud)
app.put('/api/banners/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const query = isObjectId ? { $or: [{ _id: id }, { id }] } : { id };

    const banner = await Banner.findOneAndUpdate(query, { $set: req.body }, { new: true });
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }
    console.log(`Banner updated in Cloud: ${banner.title} (${banner.id})`);
    res.json(banner);
  } catch (err) {
    console.error('Error updating banner:', err);
    res.status(500).json({ error: 'Failed to update banner in database' });
  }
});

// 1i. Delete Banner (MongoDB Cloud)
app.delete('/api/banners/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const query = isObjectId ? { $or: [{ _id: id }, { id }] } : { id };

    const banner = await Banner.findOneAndDelete(query);
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }
    console.log(`Banner deleted from Cloud: ${banner.title} (${banner.id})`);
    res.json({ message: 'Banner deleted successfully', id });
  } catch (err) {
    console.error('Error deleting banner:', err);
    res.status(500).json({ error: 'Failed to delete banner from database' });
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

// 6. Get Categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories from MongoDB:', error);
    res.status(500).json({ error: 'Server error fetching categories' });
  }
});

// 7. Get Testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isFeatured: true }).sort({ stars: -1, id: 1 });
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials from MongoDB:', error);
    res.status(500).json({ error: 'Server error fetching testimonials' });
  }
});

// 8. Submit Customer Testimonial
app.post('/api/testimonials', async (req, res) => {
  const { author, role, quote, stars, img } = req.body;
  if (!author || !quote) {
    return res.status(400).json({ error: 'Author and quote are required' });
  }
  try {
    const newTestimonial = new Testimonial({
      id: Date.now(),
      author,
      role: role || 'Verified Customer',
      quote,
      stars: stars || 5,
      img: img || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      isFeatured: true,
    });
    await newTestimonial.save();
    res.status(201).json({ message: 'Review submitted successfully', data: newTestimonial });
  } catch (error) {
    console.error('Error saving testimonial:', error);
    res.status(500).json({ error: 'Server error saving testimonial' });
  }
});

// 9. Place Customer Order
app.post('/api/orders', async (req, res) => {
  const { customer, items, totalAmount, paymentMethod, notes } = req.body;
  if (!customer || !customer.name || !customer.phone || !items || !items.length) {
    return res.status(400).json({ error: 'Customer details and at least one item are required to place an order' });
  }

  try {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = new Order({
      orderId,
      customer,
      items,
      totalAmount: totalAmount || 'Contact for Price',
      paymentMethod: paymentMethod || 'Cash on Delivery',
      notes,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', orderId, order: newOrder });
  } catch (error) {
    console.error('Error creating order in MongoDB:', error);
    res.status(500).json({ error: 'Server error creating order' });
  }
});

// 10. Get Order by Order ID
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Server error fetching order' });
  }
});

// 11. Subscribe to Newsletter
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: 'You are already subscribed!' });
    }
    const sub = new Subscriber({ email });
    await sub.save();
    res.status(201).json({ message: 'Subscribed successfully to SS Furniture updates!' });
  } catch (error) {
    console.error('Error saving newsletter subscriber:', error);
    res.status(500).json({ error: 'Server error subscribing to newsletter' });
  }
});

// Serve static assets in production if frontend/dist folder exists
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
