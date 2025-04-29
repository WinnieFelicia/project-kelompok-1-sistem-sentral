const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderID: String,
  date: Date,
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  
  product: String,
  quantity: Number,
  price: Number,
  total: Number,
  payment: String
});

module.exports = mongoose.model('Order', orderSchema);