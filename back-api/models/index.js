const sequelize = require('../db/config');
const User = require('../users/models/User');
const Product = require('../products/models/Product');
const Image = require('../images/models/Image');
const Basket = require('../baskets/models/Basket');
const BasketItem = require('../baskets/models/BasketItem');

Product.hasMany(Image, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Image.belongsTo(Product, { foreignKey: 'product_id' });
User.hasOne(Basket, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Basket.belongsTo(User, { foreignKey: 'user_id' });
Basket.hasMany(BasketItem, { foreignKey: 'basket_id', onDelete: 'CASCADE' });
Product.hasMany(BasketItem, { foreignKey: 'product_id', onDelete: 'CASCADE' });
BasketItem.belongsTo(Basket, { foreignKey: 'basket_id' });
BasketItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { sequelize, User, Product, Image, Basket, BasketItem };
