const { Image } = require('../../models/index');
class ImageService {
    static async getAllImages(product_id) {
        try {
            return await Image.findAll({ where: { product_id } });
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
                await Promise.all(imagesToDelete.map(image => this.deleteImageById(image)));
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
            const currentImages = await this.getAllImages(product_id);
            const currentImageUrls = currentImages.map(image => image.url);
            const imagesToDelete = currentImages.filter(image => !newImages.includes(image.url)).map(image => image.id);
            const imagesToCreate = newImages.filter(image => !currentImageUrls.includes(image)).map(image => ({ url: image, product_id }));
            return { imagesToDelete, imagesToCreate };
        } catch (error) {
            throw new Error('Error comparing images');
        }
    }


    static async deleteImageById(id) {
        try {
            return await Image.destroy({ where: { id } });
        } catch (error) {
            throw new Error('Error deleting image');
        }
    }
}

module.exports = ImageService;