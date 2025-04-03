require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize} = require('./models/index');
const authRoutes = require('./auth/routes/auth-routes');
const productRoutes = require('./products/routes/product-routes');
const cartRoutes = require('./carts/routes/cart-routes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/carts', authMiddleware, cartRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.error('Database connection error: ', err.message);
    });
    
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});