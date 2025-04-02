const CartService = require('../services/cart-service');

class CartController {
    static async getItems(req, res) {
        try {
            const cart = await CartService.getCartWithItems(req.user.id);
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async addOrUpdateCart(req, res) {
        try {
            const cart = await CartService.addOrUpdateCart(req.body.userId, req.body.quantity ,req.body.productId);
            res.status(201).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async removeCard(req, res) {
        try {
            await CartService.removeCart(req.params.cartId);
            res.status(200).json({ message: 'Cart removed' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = CartController;