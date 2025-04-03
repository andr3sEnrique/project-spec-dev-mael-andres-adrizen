const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Basket = sequelize.define('baskets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
});

module.exports = Basket;