import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  catParam: {
    type: String,
    required: true,
  },
  models: {
    type: String,
    default: '10+ Models',
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

export default mongoose.model('Category', CategorySchema);
