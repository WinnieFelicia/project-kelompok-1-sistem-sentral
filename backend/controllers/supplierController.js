const Supplier = require('../models/Supplier');

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSupplier = async (req, res) => {
  const { supplierId, supplierName, contactNumber, address } = req.body;
  try {
    const newSupplier = new Supplier({ supplierId, supplierName, contactNumber, address });
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: 'Supplier deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
