console.log('Routess');

const express = require('express');
const router = express.Router();
const productModel = require('../models/product.models');

const {
    getActiveProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controllers');

router.get('/products', getActiveProducts);

router.post('/product', createProduct);

router.delete('/product/:id', deleteProduct);

router.put('/product/:id', updateProduct);

module.exports = router;