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
    }
}, {timestamps: false});

Image.addIndex(['product_id', 'url'], {
    unique: true,
    name: 'unique_product_url'
  });
  
module.exports = Image;