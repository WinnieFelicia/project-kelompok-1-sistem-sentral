const Inventory = require('../models/Inventory');
const Order = require('../models/Order');
const Supplier = require('../models/Supplier');

exports.getInventoryReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let query = {};
        if (startDate && endDate) {
            query.createdAt = { 
                $gte: new Date(startDate), 
                $lte: new Date(endDate) 
            };
        }
        const inventories = await Inventory.find(query);
        res.json(inventories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let query = {};
        if (startDate && endDate) {
            query.createdAt = { 
                $gte: new Date(startDate), 
                $lte: new Date(endDate) 
            };
        }
        const orders = await Order.find(query);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSupplierReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let query = {};
        if (startDate && endDate) {
            query.createdAt = { 
                $gte: new Date(startDate), 
                $lte: new Date(endDate) 
            };
        }
        const suppliers = await Supplier.find(query);
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
