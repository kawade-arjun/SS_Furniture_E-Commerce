import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Gallery', GallerySchema);
