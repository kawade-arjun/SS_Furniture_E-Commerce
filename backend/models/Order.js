import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String },
});

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    }
  },
  items: [OrderItemSchema],
  totalAmount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'In Production', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  paymentMethod: {
    type: String,
    enum: ['Cash on Delivery', 'UPI / Online', 'Direct Bank Transfer'],
    default: 'Cash on Delivery',
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
  notes: String,
}, {
  timestamps: true,
});

export default mongoose.model('Order', OrderSchema);
