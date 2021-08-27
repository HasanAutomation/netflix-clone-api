class UserDto {
  username;
  _id;
  avatar;
  isAdmin;
  createdAt;
  constructor(user) {
    this.username = user.username;
    this.avatar = user.avatar ? user.avatar : null;
    this._id = user._id;
    this.isAdmin = user.isAdmin;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDto;
