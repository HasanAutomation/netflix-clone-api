const crypto = require('crypto');
const bcrypt = require('bcryptjs');
class HashService {
  async hashOtp(data) {
    return crypto
      .createHmac('sha256', process.env.HASH_SECRET)
      .update(data)
      .digest('hex');
  }
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}

module.exports = new HashService();
