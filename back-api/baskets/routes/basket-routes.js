const express = require('express');
const BasketController = require('../controllers/basket-controller');
const router = express.Router();

router.get('/', BasketController.getItems);
router.put('/', BasketController.addOrUpdateBasket);
router.delete('/:basketId', BasketController.removeCard);

module.exports = router;