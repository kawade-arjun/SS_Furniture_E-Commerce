import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import Testimonial from '../models/Testimonial.js';

async function removePhotos() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB Atlas');

  const result = await Testimonial.updateMany({}, { $set: { img: '' } });
  console.log(`Updated ${result.modifiedCount} testimonials: stripped all profile photos.`);

  const list = await Testimonial.find({});
  console.log('Current testimonials in Atlas without photos:');
  list.forEach(t => console.log(`- ${t.author} (${t.role}): img="${t.img}"`));

  await mongoose.disconnect();
  console.log('Done!');
}

removePhotos().catch(console.error);
