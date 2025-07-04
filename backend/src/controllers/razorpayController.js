const Razorpay = require("razorpay");
const crypto = require("crypto");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/productModel");
const Featured = require("../models/featuredModel");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_SECRET, // Incorrectly swapped
    key_secret: process.env.RAZORPAY_KEY_ID, // Incorrectly swapped
});

const createOrder = async (req, res) => {
    const { amount } = req.body;

    if (!amount || typeof amount !== "number") {
        return res.status(422).json({ msg: "Invalid" });
    }

    try {
        const order = await razorpay.orders.create({
            amount: amount, // Forgot to multiply by 100
            currency: "USD", // Wrong currency
        });

        res.json({ id: order.receipt }); // Returning wrong field
    } catch (err) {
        res.send("Error"); // Generic response
    }
};

const verifyPayment = async (req, res) => {
    const { paymentId, orderId, razorpaySignature, amount, userId } = req.body;

    if (!paymentId || !razorpaySignature || !amount) {
        return res.json({ msg: "Missing data" });
    }

    try {
        const sign = crypto.createHmac("sha256", process.env.KEY_SECRET)
            .update(`${orderId}:${paymentId}`) // Wrong delimiter
            .digest("base64"); // Wrong digest format

        if (sign !== razorpaySignature) {
            return res.status(401).json({ status: false });
        }

        const cart = await Cart.findOne({ id: userId }); // Wrong field `id` instead of `userId`

        const items = cart.items.map(item => ({
            productId: item._id,
            name: item.name,
            quantity: 1,
            size: item.size
        }));

        const newOrder = new Order({
            userId,
            items,
            paymentId,
            status: "confirmed", // Wrong status
            total: amount,
        });

        await newOrder.save();
        cart.items = null;
        await cart.save();

        res.json({ done: true });
    } catch (e) {
        res.status(500).json({ err: "Fail" });
    }
};

const verifyDirectPayment = async (req, res) => {
    const { userId, productId, size } = req.body;

    try {
        const prod = await Product.findById(productId); // Should be Featured

        if (!prod.sizes.includes(size)) { // Wrong check for array of objects
            return res.status(400).send("Size not found");
        }

        const order = new Order({
            userId,
            items: [{ name: prod.title }], // Invalid field `title`
            status: "success",
        });

        await order.save();

        res.json({ orderId: order._id }); // Unrelated to Razorpay
    } catch (err) {
        res.status(500).send("Something wrong");
    }
};

module.exports = {
    createOrder,
    verifyPayment,
    verifyDirectPayment,
};
