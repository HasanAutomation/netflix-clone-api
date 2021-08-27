const UserDto = require('../dtos/user-dto');
const { hashOtp, hashPassword } = require('../services/hash-service');
const { generateOtp, verifyOtp } = require('../services/otp-service');
const { generateTokens, createToken } = require('../services/token-service');
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
      const hashedPassword = await hashPassword(password);
      return res.json({
        hash: `${hash}.${expires}`,
        email,
        otp,
        password: hashedPassword,
      });
    } else {
      return res.status(400).json({
        error: 'All fields are mandatory',
      });
    }
  }
  async verifyOtp(req, res) {
    const { otp, hash, email, password, username } = req.body;

    if (otp && hash && email && password && username) {
      const [hashedOtp, expires] = hash.split('.');
      if (Date.now() > Number(expires)) {
        return res.status(400).json({ message: 'OTP expired' });
      }
      const data = `${email}.${otp}.${expires}`;
      const isValid = await verifyOtp(hashedOtp, data);
      if (!isValid) return res.status(400).json({ error: 'OTP is not valid' });

      try {
        let user = await findSingleUser({ email });
        if (user) return res.status(400).json({ error: 'User already exists' });

        user = await createUser({
          email,
          username,
          password,
        });

        // generate tokens
        const { accessToken, refreshToken } = await generateTokens({
          _id: user._id,
          isAdmin: user.isAdmin,
        });

        //store token
        await createToken(refreshToken, user._id);

        // store token in the cookies
        res.cookie('accesstoken', accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30,
          httpOnly: true,
        });
        res.cookie('refreshtoken', refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30,
          httpOnly: true,
        });

        const userDto = new UserDto(user);
        res.status(201).json({ user: userDto, auth: true });
      } catch (err) {
        console.log(err);
        res.status(500).send(err.message || 'Internal server error');
      }
    } else {
      return res.status(400).json({ error: 'All fields are mandatory' });
    }
  }
}

module.exports = new UserController();
