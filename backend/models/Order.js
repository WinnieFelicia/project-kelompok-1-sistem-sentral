// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  tanggal: Date,
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  
  produk: String,
  kuantitas: Number,
  harga: Number,
  total: Number,
  pembayaran: String
});

module.exports = mongoose.model('Order', orderSchema);
