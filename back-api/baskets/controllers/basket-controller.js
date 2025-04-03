const BasketService = require('../services/basket-service');

class BasketController {
    static async getItems(req, res) {
        try {
            const cart = await BasketService.getCartWithItems(req.user.id);
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async addOrUpdateBasket(req, res) {
        try {
            const cart = await BasketService.addOrUpdateCart(req.body.userId, req.body.quantity ,req.body.productId);
            res.status(201).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async removeCard(req, res) {
        try {
            await BasketService.removeCart(req.params.basketId);
            res.status(200).json({ message: 'Cart removed' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = BasketController;