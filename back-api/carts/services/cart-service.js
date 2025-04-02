const { Cart, CartItem, Product } = require('../../models/index');
const CartItemService = require('./cart-item-service');
class CartService {
    static async getCart(userId) {
        try {
            return await Cart.findOne({ where: { user_id: userId } });
        } catch (error) {
            throw new Error('Error getting cart');
        }
    }

    static async removeCart(cartId) {
        try {
            return await Cart.destroy({ where: { id: cartId } });
        } catch (error) {
            throw new Error('Error removing cart');
        }
    }

    static async getCartWithItems(userId) {
        try {
            return await Cart.findOne({ 
                where: { user_id: userId }, 
                include: [
                    {
                        model: CartItem,
                        attributes: ['quantity'],
                        include: [{ model: Product, attributes: ['title', 'description', 'price'] }]
                    }
                ] });
        } catch (error) {
            throw new Error('Error getting cart');
        }
    }
    static async addOrUpdateCart(userId, quantity = 1, productId) {
        try {
            let cart = await this.getCart(userId);
            if (!cart) cart = await Cart.create({ user_id: userId });
            return await CartItemService.addOrUpdateCartItem(cart.id, quantity, productId);
        } catch (error) {
            throw new Error('Error adding product to cart');
        }
    }
}

module.exports = CartService;