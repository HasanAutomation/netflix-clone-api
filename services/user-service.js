const User = require('../models/user-model');
class UserService {
  async findSingleUser(filter) {
    return await User.findOne(filter);
  }
  async createUser(data) {
    const user = await User.create(data);
    return user;
  }
}

module.exports = new UserService();
