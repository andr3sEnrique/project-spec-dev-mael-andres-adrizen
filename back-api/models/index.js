const sequelize = require('../db/config');
const User = require('./users/User');
const Product = require('./products/Product');
const Image = require('./images/Image');

// Definir relaciones
Product.hasMany(Image, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Image.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { sequelize, User, Product, Image };
