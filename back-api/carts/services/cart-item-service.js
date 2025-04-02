const { CartItem } = require('../../models/index');
const ProductService = require('../../products/services/product-service');

class CartItemService {
    static async getCartItem(cartId, productId) {
        try {
            return await CartItem.findOne({ where: { cart_id: cartId, product_id: productId } });
        } catch (error) {
            throw new Error('Error getting cart item');
        }
    }
    static async addOrUpdateCartItem(cartId, quantity = 1, productId) {
        try {
            const product = await ProductService.getProductById(productId);
            if (product.stock < quantity) throw new Error('Not enough stock');

            let cartItem = await this.getCartItem(cartId, productId);
            if (cartItem) {
                cartItem.quantity += quantity;
                await cartItem.save();
            } else {
                cartItem = await CartItem.create({ cart_id: cartId, product_id: productId, quantity });
            }

            product.stock -= quantity;
            await product.save();
            return cartItem;
        } catch (error) {
            throw new Error('Error adding product to cart');
        }
    }
}

module.exports = CartItemService;