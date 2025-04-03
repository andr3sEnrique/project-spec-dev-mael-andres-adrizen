const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService  = require('../../users/services/user-service');
require('dotenv').config();

class AuthService {
    static async registerUser(user) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return await UserService.createUser({ ...user, password: hashedPassword });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async loginUser(user) {
        const foundUser = await UserService.getUserByUsername(user.username);
        if (!foundUser) throw new Error('User not found');
        const passwordMatch = await bcrypt.compare(user.password, foundUser.password);
        if (!passwordMatch) throw new Error('Invalid credentials');
        return jwt.sign({ id: foundUser.id, email: foundUser.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
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