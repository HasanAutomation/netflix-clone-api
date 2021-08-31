const User = require('../models/user-model');
class UserService {
  async findSingleUser(filter) {
    return await User.findOne(filter);
  }
  async createUser(data) {
    const user = await User.create(data);
    return user;
  }
  isSameUser(currentUserId, incomingUserId) {
    return currentUserId === incomingUserId;
  }
  async updateSingleUser(id, data) {
    return await User.findByIdAndUpdate(id, { $set: data }, { new: true });
  }
  async deleteUser(id) {
    await User.findByIdAndDelete(id);
  }
  async getSingleUser(id) {
    return await User.findById(id);
  }
  async getUsers(limit) {
    const users = limit ? await User.find().limit(10) : await User.find();
    return users;
  }
  async getUserStats() {
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: '$createdAt' },
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: 1 },
          },
        },
      ]);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UserService();
