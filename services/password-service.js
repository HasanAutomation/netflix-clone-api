const bcrypt = require('bcryptjs');
class PasswordService {
  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
module.exports = new PasswordService();
