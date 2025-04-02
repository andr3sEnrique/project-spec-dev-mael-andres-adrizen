const { Image } = require('../../models/index');
class ImageService {
    static async getAllImages(productId) {
        try {
            return await Image.findAll({ where: { product_id: productId } });
        }catch (error) {
            throw new Error('Error getting images');
        }
    }

    static async getImageById(id) {
        try {
            return await Image.findByPk(id);
        }catch (error) {
            throw new Error('Error getting image');
        }
    }

    static async createImage(images, productId) {
        try {
            const imagesWithProductId = images.map(image => ({ ...image, product_id: productId }));
            await Image.bulkCreate(imagesWithProductId, { 
                updateOnDuplicate: ['url']
            });
        }catch (error) {
            throw new Error('Error creating/updating image');
        }
    }

    static async deleteImage(id) {
        try {
            return await Image.destroy({ where: { id } });
        }catch (error) {
            throw new Error('Error deleting image');
        }
    }
}

module.exports = ImageService;