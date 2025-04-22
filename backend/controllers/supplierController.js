const Supplier = require('../models/supplierModel');

exports.getAllSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  res.json(suppliers);
};

exports.createSupplier = async (req, res) => {
  const { supplierId, name, contact, address } = req.body;
  const newSupplier = new Supplier({ supplierId, name, contact, address });
  await newSupplier.save();
  res.status(201).json(newSupplier);
};

exports.deleteSupplier = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Supplier deleted' });
};
