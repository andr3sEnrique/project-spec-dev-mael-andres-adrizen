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

    static async createImage(images, product_id) {
        try {
            const { imagesToDelete, imagesToCreate } = await this.compareImages(images.map(image => image.url), product_id);
            if (imagesToDelete.length) {
                await this.deleteImageForProducts(product_id);
            }
            if (imagesToCreate.length) {
                await Image.bulkCreate(imagesToCreate, { 
                    updateOnDuplicate: ['url']
                });
            }
        }catch (error) {
            throw new Error('Error creating/updating image');
        }
    }

    static async compareImages(newImages, product_id) {
        try {
            const currentImages = (await Image.findAll({ where: { product_id } })).map(image => image.url);
            const imagesToDelete = currentImages.filter(image => !newImages.includes(image));
            const imagesToCreate = (newImages.filter(image => !currentImages.includes(image))).map(image => ({ url: image, product_id }));
            return { imagesToDelete, imagesToCreate };
        } catch (error) {
            throw new Error('Error comparing images');
        }
    }


    static async deleteImageForProducts(product_id) {
        try {
            return await Image.destroy({ where: { product_id } });
        } catch (error) {
            throw new Error('Error deleting image');
        }
    }
}

module.exports = ImageService;