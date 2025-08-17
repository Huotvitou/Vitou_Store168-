
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  phone: String,
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: String,
    price: Number,
    qty: Number
  }],
  total: Number,
  slipUrl: String,
  status: { type: String, enum: ['Pending','Verified','Complete'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
