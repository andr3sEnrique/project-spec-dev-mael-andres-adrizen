const sequelize = require('../db/config');
const User = require('../users/models/User');
const Product = require('../products/models/Product');
const Image = require('../images/models/Image');
const Cart = require('../carts/models/Cart');
const CartItem = require('../carts/models/CartItem');

Product.hasMany(Image, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Image.belongsTo(Product, { foreignKey: 'product_id' });
User.hasOne(Cart, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.hasMany(CartItem, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
Product.hasMany(CartItem, { foreignKey: 'product_id', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { sequelize, User, Product, Image, Cart, CartItem };
