import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Faq', FaqSchema);
