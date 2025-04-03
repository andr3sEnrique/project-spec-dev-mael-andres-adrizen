const { Basket, BasketItem, Product } = require('../../models/index');
const BasketItemService = require('./basket-item-service');
class BasketService {
    static async getCart(userId) {
        try {
            return await Basket.findOne({ where: { user_id: userId } });
        } catch (error) {
            throw new Error('Error getting cart');
        }
    }

    static async removeCart(cartId, user_id) {
        try {
            const deletedRows = await Basket.destroy({ where: { id: cartId, user_id } });
        
            if (deletedRows === 0) {
                throw new Error('Cart not found or not owned by user');
            }

            return deletedRows;
        } catch (error) {
            throw new Error('Error removing cart');
        }
    }

    static async getCartWithItems(userId) {
        try {
            return await Basket.findOne({ 
                where: { user_id: userId }, 
                include: [
                    {
                        model: BasketItem,
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
            if (!cart) cart = await Basket.create({ user_id: userId });
            return await BasketItemService.addOrUpdateCartItem(cart.id, quantity, productId);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = BasketService;