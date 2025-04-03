const { BasketItem } = require('../../models/index');
const ProductService = require('../../products/services/product-service');

class BasketItemService {
    static async getCartItem(cartId, productId) {
        try {
            return await BasketItem.findOne({ where: { basket_id: cartId, product_id: productId } });
        } catch (error) {
            throw new Error('Error getting cart item');
        }
    }
    static async addOrUpdateCartItem(cartId, quantity = 1, productId) {
        try {
            console.log(cartId, quantity, productId);
            const product = await ProductService.getProductById(productId);
            if (product.stock < quantity) throw new Error('Not enough stock');
            console.log(product);
            let cartItem = await this.getCartItem(cartId, productId);
            if (cartItem) {
                cartItem.quantity += quantity;
                await cartItem.save();
            } else {
                cartItem = await BasketItem.create({ basket_id: cartId, product_id: productId, quantity });
            }

            product.stock -= quantity;
            await product.save();
            return cartItem;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = BasketItemService;