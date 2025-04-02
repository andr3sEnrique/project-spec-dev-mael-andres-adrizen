const { Product } = require('../../models/index');
const ImagenService = require('../../images/services/image-service');

class ProductService {
    static async getAllProducts() {
        try {
            return await Product.findAll();
        }catch (error) {
            throw new Error('Error getting products');
        }
    }

    static async getProductById(id) {
        try {
            return await Product.findByPk(id);
        }catch (error) {
            throw new Error('Error getting product');
        }
    }

    static async createOrUpdateProduct(product) {
        try {
            const { images } = product;
            const newProduct = await Product.upsert(product);

            if (images || images.length > 0) await ImagenService.createImage(images, newProduct.id);
            return newProduct;
        }catch (error) {
            throw new Error('Error creating/updating product');
        }
    }

    static async deleteProduct(id) {
        try {
            return await Product.destroy({ where: { id } });
        }catch (error) {
            throw new Error('Error deleting product');
        }
    }

}

module.exports = ProductService;