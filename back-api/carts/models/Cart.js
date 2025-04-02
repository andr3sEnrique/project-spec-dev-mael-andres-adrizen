const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Cart = sequelize.define('carts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
});

module.exports = Cart;