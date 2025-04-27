const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderID: String,
  date: Date,
  supplier: String,
  product: String,
  quantity: Number,
  price: Number,
  total: Number,
  payment: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
