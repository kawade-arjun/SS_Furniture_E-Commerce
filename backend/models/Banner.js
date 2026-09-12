import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  badge: {
    type: String,
    default: 'Special Offer',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  bg: {
    type: String,
    required: true,
  },
  btnLink: {
    type: String,
    default: '/products',
  },
  btnText: {
    type: String,
    default: 'Explore Collection',
  },
  hasCustomizerBtn: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Banner', BannerSchema);
