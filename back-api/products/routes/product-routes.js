const express = require('express');
const ProductController = require('../controllers/product-controller');
const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.put('/', ProductController.createOrUpdateProduct);
router.get('/search', ProductController.searchProducts);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;