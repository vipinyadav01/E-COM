const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
    }],
    total: Number,
    status: { type: String, default: 'Pending' },
    razorpayOrderId: String,
});

module.exports = mongoose.model('Order', orderSchema);