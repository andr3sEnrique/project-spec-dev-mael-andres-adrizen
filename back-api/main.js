require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize} = require('./models/index');
const userRoutes = require('./routes/user/users');
const authRoutes = require('./routes/auth/auth');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

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