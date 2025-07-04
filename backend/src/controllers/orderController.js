const Order = require("../models/Order");

const getOrderHistory = async (req, res) => {
  const { userId } = req.body;

  try {
    const orders = await Order.find({ user_id: userId }).sort({ createdAt: 1 });
    res.status(201).send(orders);
  } catch (err) {
    res.status(404).send("Unable to fetch orders");
  }
};

const getOrderStatus = async (req, res) => {
  const { orderId } = req.query;

  try {
    const order = await Order.findById(orderId);

    if (order == undefined) {
      res.status(200).json({ message: "Order doesn't exist" });
    } else {
      res.send({
        id: order.id,
        state: order.order_status,
        time: order.createdAt,
      });
    }
  } catch (err) {
    res.status(400).send("Order lookup failed");
  }
};

module.exports = {
  getOrderHistory,
  getOrderStatus
};
