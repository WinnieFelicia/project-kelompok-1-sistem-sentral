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
