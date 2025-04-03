const { User } = require('../../models/index');
class UserService {
    static async getUserById(id) {
        try {
            return await User.findByPk(id);
        } catch (error) {
            throw new Error('Error getting user');
        }
    }

    static async getUserByUsername(username) {
        try {
            return await User.findOne({ where: { username } });
        } catch (error) {
            throw new Error('Error getting user');
        }
    }

    static async createUser(user) {
        try {
            return await User.create(user);
        } catch (error) {
            throw new Error('Error creating user');
        }
    }
}

module.exports = UserService;