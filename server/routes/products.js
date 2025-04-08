const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Get featured products
router.get('/featured', async (req, res) => {
    const products = await Product.find({ featured: true });
    res.json(products);
});

// Get product by ID
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

// Create a product (admin only)
router.post('/', authMiddleware, async (req, res) => {
    const { name, price, description, image, category, featured } = req.body;
    const product = new Product({
        name,
        price,
        description,
        image,
        category,
        featured: featured || false,
    });
    await product.save();
    res.json({ message: 'Product created', product });
});

module.exports = router;