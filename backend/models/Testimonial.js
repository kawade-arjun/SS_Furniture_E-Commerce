import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  stars: {
    type: Number,
    required: true,
    default: 5,
    min: 1,
    max: 5,
  },
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Homeowner',
  },
  img: {
    type: String,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

export default mongoose.model('Testimonial', TestimonialSchema);
