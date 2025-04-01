const AuthService = require('../../services/auth-service');

class AuthController {
    static async registerUser(req, res) {
        try {
            const user = await AuthService.registerUser(req.body);
            res.status(201).json({ message: 'User registered', user });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }
    
    static async loginUser(req, res) {
        try {
            const user = await AuthService.loginUser(req.body);
            res.status(200).json({ message: 'User logged in', token, user });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = AuthController;