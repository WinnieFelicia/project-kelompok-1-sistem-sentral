const Order = require('../models/Order');

exports.getReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const orders = await Order.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).sort({ date: 1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
};
