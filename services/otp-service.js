const crypto = require('crypto');
const { hashOtp } = require('./hash-service');
class OtpService {
  async generateOtp() {
    return crypto.randomInt(1000, 9999);
  }
  async verifyOtp(hashedOtp, data) {
    const computedHash = await hashOtp(data);
    return computedHash === hashedOtp;
  }
}

module.exports = new OtpService();
