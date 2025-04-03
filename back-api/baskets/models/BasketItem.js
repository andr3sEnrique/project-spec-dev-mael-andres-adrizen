const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const BasketItem = sequelize.define('basket_items', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {timestamps: false});

module.exports = BasketItem;