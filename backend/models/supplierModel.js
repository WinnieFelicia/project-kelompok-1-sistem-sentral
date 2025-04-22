const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierId: String,
  name: String,
  contact: String,
  address: String,
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
