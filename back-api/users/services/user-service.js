const { User } = require('../../models/index');
class UserService {
    static async getUserById(id) {
        try {
            return await User.findByPk(id);
        } catch (error) {
            throw new Error('Error getting user');
        }
    }
}

module.exports = UserService;