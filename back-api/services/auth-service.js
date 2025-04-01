const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
require('dotenv').config();

class AuthService {
    static async registerUser(user) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return await User.create({ ...user, password: hashedPassword });
        } catch (error) {
            throw new Error('User already exists');
        }
    }

    static async loginUser(user) {
        const foundUser = await User.findOne({ where: { email: user.email } });
        if (!foundUser) throw new Error('User not found');
        const passwordMatch = await bcrypt.compare(user.password, foundUser.password);
        if (!passwordMatch) throw new Error('Invalid credentials');
        const token = jwt.sign({ id: foundUser.id, email: foundUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token, foundUser };
    }

    static async verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = AuthService;