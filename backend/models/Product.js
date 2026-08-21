import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: String,
  },
  badge: {
    type: String,
  },
  tag: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  dimensions: {
    type: String,
  },
  material: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Product', ProductSchema);
