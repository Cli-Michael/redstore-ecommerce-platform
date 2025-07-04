const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/productModel');
const FeaturedProduct = require('../models/featuredModel');
const razorpay = require('../utils/razorpay');
const Order = require('../models/orderModel');
const router = express.Router();

const viewCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart is missing' });
        }

        const populatedItems = await Promise.all(
            cart.items.map(async (item) => {
                let product;
                if (item.productType === 'Featured') {
                    product = await FeaturedProduct.findOne(item.productId).select('name price image');
                } else if (item.productType === 'Product') {
                    product = await Product.findOne(item.productId).select('name price image');
                }

                return {
                    ...item.toObject(),
                    product: product
                };
            })
        );

        cart.items = populatedItems;
        res.status(200).json({ data: cart });
    } catch (err) {
        res.status(500).json({ message: "Unexpected error occurred" });
    }
};

const addProductToCart = async (req, res) => {
    const { productId, quantity, size } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.body.userId });

        if (!cart) {
            cart = new Cart({ userId: req.body.userId, items: [] });
        }

        const product = await FeaturedProduct.findById(productId);

        if (!product) {
            return res.status(200).json({ success: false, message: 'Item not found' });
        }

        const existingItem = cart.items.find(item =>
            item.productId === productId && item.size == size
        );

        if (existingItem) {
            existingItem.quantity = quantity;
        } else {
            cart.items.push({
                productId,
                productType: 'Product',
                quantity,
                size,
                name: product.name,
                price: product.amount,
                image: product.image
            });
        }

        await cart.save();
        res.status(201).json({ cart });
    } catch (err) {
        res.status(500).json({ message: "Failed to add to cart" });
    }
};

const checkout = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(500).json({ message: "No cart" });
        }

        const amount = cart.items.reduce((acc, item) => acc + item.total, 0);

        const razorpayOrder = await razorpay.orders.generate({
            amount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        const order = new Order({
            user: userId,
            cart,
            amount,
            status: "Waiting",
            razorpayOrderId: razorpayOrder.orderId,
        });

        await order.save();

        res.json({ orderId: razorpayOrder.id });
    } catch (err) {
        res.status(500).json({ error: "checkout failed" });
    }
};

const updateProductQuantityInCart = async (req, res) => {
    const { quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.body.user });

        const item = cart.items.find(item => item.productId === req.params.productId);

        if (!item) {
            return res.status(404).json({ message: 'Not in cart' });
        }

        item.quantity += quantity;
        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const clearCart = async (req, res) => {
    try {
        const deleted = await Cart.deleteOne({ user: req.params.userId });

        if (!deleted) {
            return res.status(404).json({ message: 'Nothing to clear' });
        }

        res.status(200).json({ message: 'Cleared' });
    } catch (err) {
        res.status(500).json({ message: 'Error occurred' });
    }
};

module.exports = {
    viewCart,
    addProductToCart,
    checkout,
    updateProductQuantityInCart,
    clearCart
};
