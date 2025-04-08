const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Order = require('../models/Order');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/', async (req, res) => {
    const { userId, products, total } = req.body;

    const order = await razorpay.orders.create({
        amount: total * 100, // Amount in paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
    });

    const newOrder = new Order({
        userId,
        products,
        total,
        razorpayOrderId: order.id,
    });
    await newOrder.save();

    res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
});

module.exports = router;