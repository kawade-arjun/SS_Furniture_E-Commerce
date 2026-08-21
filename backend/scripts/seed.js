import mongoose from 'mongoose';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/db.js';

// Models
import Product from '../models/Product.js';
import Gallery from '../models/Gallery.js';
import Faq from '../models/Faq.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_JSON = path.join(__dirname, '..', 'data', 'products.json');
const GALLERY_JSON = path.join(__dirname, '..', 'data', 'gallery.json');
const FAQS_JSON = path.join(__dirname, '..', 'data', 'faqs.json');

async function seed() {
  try {
    // 1. Connect DB
    await connectDB();

    console.log('Reading seed data files...');

    // 2. Read JSON datasets
    const productsData = JSON.parse(await fs.readFile(PRODUCTS_JSON, 'utf8'));
    const galleryData = JSON.parse(await fs.readFile(GALLERY_JSON, 'utf8'));
    const faqsData = JSON.parse(await fs.readFile(FAQS_JSON, 'utf8'));

    // 3. Clear existing collections
    console.log('Clearing existing collections...');
    await Product.deleteMany({});
    await Gallery.deleteMany({});
    await Faq.deleteMany({});

    // 4. Seed database
    console.log('Inserting seed records into MongoDB...');
    await Product.insertMany(productsData);
    console.log(`Seeded ${productsData.length} products.`);

    await Gallery.insertMany(galleryData);
    console.log(`Seeded ${galleryData.length} gallery items.`);

    await Faq.insertMany(faqsData);
    console.log(`Seeded ${faqsData.length} FAQ questions.`);

    console.log('Database seeding completed successfully.');
    
    // 5. Close connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding process failed:', error);
    process.exit(1);
  }
}

seed();
