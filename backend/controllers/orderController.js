const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
  res.json(order);
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  await Order.findByIdAndDelete(id);
  res.json({ message: 'Order deleted' });
};

// 🚀 Tambahan baru untuk laporan berdasarkan tanggal
exports.getReport = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: 'Start and end dates are required' });
    }

    const orders = await Order.find({
      date: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    }).sort({ date: 1 });

    res.json(orders);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Failed to fetch report' });
  }
};
