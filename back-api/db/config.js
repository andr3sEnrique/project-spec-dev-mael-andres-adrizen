const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.db',
    logging: false,
});

sequelize.authenticate()
    .then(() => {
        console.log('✅ Connected to the SQLite database.');
    })
    .catch((err) => {
        console.error('Database opening error: ', err.message);
    });

module.exports = sequelize;