const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Image = sequelize.define('images', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false, 
    indexes: [{
        name: 'idx_image_url_product_id',
        unique: true,
        fields: ['url', 'product_id']
    }]
});

module.exports = Image;