const express = require('express');
const CartController = require('../controllers/cart-controller');
const router = express.Router();

router.get('/', CartController.getItems);
router.put('/', CartController.addOrUpdateCart);
router.delete('/:cartId', CartController.removeCard);

module.exports = router;