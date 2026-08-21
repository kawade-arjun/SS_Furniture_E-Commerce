import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['general', 'custom_quote'],
    required: true,
  },
  name: String,
  phone: String,
  email: String,
  message: String,
  
  room: String,
  wood: String,
  fabric: String,
  dimensions: String,
  estimatedPrice: String,
}, {
  timestamps: true,
});

export default mongoose.model('Inquiry', InquirySchema);
