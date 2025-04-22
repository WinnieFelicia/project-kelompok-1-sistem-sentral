const express = require('express');
const { getAllSuppliers, createSupplier, deleteSupplier } = require('../controllers/supplierController');

const router = express.Router();

router.get('/', getAllSuppliers);
router.post('/', createSupplier);
router.delete('/:id', deleteSupplier);

module.exports = router;
