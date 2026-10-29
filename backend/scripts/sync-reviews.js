import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import Product from '../models/Product.js';
import Review from '../models/Review.js';

async function syncRealReviews() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB Atlas');

  const products = await Product.find({});
  console.log('Found', products.length, 'products in Atlas');

  for (const p of products) {
    const realReviews = await Review.find({
      $or: [{ productId: p.id }, { productId: String(p._id) }],
      isApproved: true,
    });

    const realCount = realReviews.length;
    const realAvg = realCount > 0 
      ? Number((realReviews.reduce((sum, r) => sum + r.rating, 0) / realCount).toFixed(1))
      : 0;

    p.reviewsCount = realCount;
    p.rating = realAvg;
    await p.save();
    console.log(`Updated ${p.id} (${p.name}): real count = ${realCount}, rating = ${realAvg}`);
  }

  await mongoose.disconnect();
  console.log('Finished syncing all products in MongoDB Atlas to real review counts!');
}

syncRealReviews().catch(console.error);
