const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  kodeProduk: String,
  namaProduk: String,
  kategori: String,
  harga: Number,
  stok: Number,
  batasMinimumStok: Number,
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
