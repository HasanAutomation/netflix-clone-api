const { hashOtp } = require('../services/hash-service');
const { generateOtp, verifyOtp } = require('../services/otp-service');
const { findSingleUser, createUser } = require('../services/user-service');

class UserController {
  async sendOtp(req, res) {
    const { email, password, username } = req.body;
    if (email && password && username) {
      const otp = await generateOtp();
      const ttl = 1000 * 60 * 1;
      const expires = Date.now() + ttl;

      const data = `${email}.${otp}.${expires}`;
      const hash = await hashOtp(data);
      return res.json({
        hash: `${hash}.${expires}`,
        email,
        otp,
      });
    } else {
      return res.status(400).json({
        error: 'All fields are mandatory',
      });
    }
  }
  async verifyOtp(req, res) {
    const { otp, hash, email } = req.body;
    const [hashedOtp, expires] = hash.split('.');
    if (Date.now() > Number(expires)) {
      return res.status(400).json({ message: 'OTP expired' });
    }
    const data = `${email}.${otp}.${expires}`;
    const isValid = await verifyOtp(hashedOtp, data);
    if (!isValid) return res.status(400).json({ error: 'OTP is not valid' });

    res.json({
      ok: true,
    });
  }
}

module.exports = new UserController();
