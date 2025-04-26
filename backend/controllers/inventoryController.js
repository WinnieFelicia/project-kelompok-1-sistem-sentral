const Inventory = require('../models/Inventory');

// Get all inventory
exports.getInventories = async (req, res) => {
  const inventories = await Inventory.find();
  res.json(inventories);
};

// Add inventory
exports.createInventory = async (req, res) => {
  const inventory = new Inventory(req.body);
  await inventory.save();
  res.json(inventory);
};

// Update inventory
exports.updateInventory = async (req, res) => {
  const { id } = req.params;
  const inventory = await Inventory.findByIdAndUpdate(id, req.body, { new: true });
  res.json(inventory);
};

// Delete inventory
exports.deleteInventory = async (req, res) => {
  const { id } = req.params;
  await Inventory.findByIdAndDelete(id);
  res.json({ message: 'Inventory deleted' });
};
