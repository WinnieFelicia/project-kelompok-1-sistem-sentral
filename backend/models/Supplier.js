const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  supplierId: { type: String, required: true },
  supplierName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model('Supplier', SupplierSchema);
