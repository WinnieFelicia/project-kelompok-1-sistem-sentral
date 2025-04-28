const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/inventory', reportController.getInventoryReport);
router.get('/orders', reportController.getOrderReport);
router.get('/suppliers', reportController.getSupplierReport);

module.exports = router;
