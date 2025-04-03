const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: (user) => {
            user.username = user.username.toLowerCase();
        },
        afterCreate: (user) => {
            delete user.dataValues.password;
            delete user.dataValues.id;
        },
        afterUpdate: (user) => {
            delete user.dataValues.password;
            delete user.dataValues.id;
        }
    }
});

module.exports = User;