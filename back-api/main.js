require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const { sequelize } = require('./models/index');
const authRoutes = require('./auth/routes/auth-routes');
const productRoutes = require('./products/routes/product-routes');
const basketRoutes = require('./baskets/routes/basket-routes');
const { authMiddleware } = require('./middlewares/authMiddleware');

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
const app = express();
app.use(cors(corsOptions));
app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://apis.google.com"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
        },
      },
    })
  );
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/baskets', authMiddleware, basketRoutes);

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