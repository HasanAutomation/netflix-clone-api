const UserDto = require('../dtos/user-dto');
const { hashOtp, hashPassword } = require('../services/hash-service');
const { generateOtp, verifyOtp } = require('../services/otp-service');
const { comparePassword } = require('../services/password-service');
const { generateTokens, createToken } = require('../services/token-service');
const {
  findSingleUser,
  createUser,
  isSameUser,
  updateSingleUser,
  deleteUser,
  getUsers,
  getSingleUser,
} = require('../services/user-service');

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
  async login(req, res) {
    const { email, password } = req.body;
    if (email && password) {
      try {
        let user = await findSingleUser({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        const isValid = await comparePassword(password, user.password);

        if (!isValid)
          return res.status(400).json({ error: 'Invalid password' });

        const { accessToken, refreshToken } = await generateTokens({
          _id: user._id,
          isAdmin: user.isAdmin,
        });

        await createToken(refreshToken, user._id);

        res.cookie('accesstoken', accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30,
          httpOnly: true,
        });
        res.cookie('refreshtoken', refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30,
          httpOnly: true,
        });

        const userDto = new UserDto(user);
        res.status(200).json({ user: userDto, auth: true });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message || 'Internal server error' });
      }
    } else {
      return res.status(400).json({ error: 'All fields are mandatory' });
    }
  }

  async updateUser(req, res) {
    try {
      if (!isSameUser(req.user._id, req.params.id))
        return res.status(403).json({ error: 'Forbidden' });
      const updatedUser = await updateSingleUser(req.params.id, req.body);
      res.json({ user: new UserDto(updatedUser) });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message || 'Server Error' });
    }
  }
  async deleteUser(req, res) {
    try {
      if (!isSameUser(req.user._id, req.params.id))
        return res.status(403).json({ error: 'Forbidden' });
      await deleteUser(req.params.id);
      return res.status(200).json({ message: 'User Deleted' });
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: err.message || 'Server Error' });
    }
  }

  async getUser(req, res) {
    try {
      const user = await getSingleUser(req.params.id);
      if (!user) return res.status(404).json({ error: 'No User found' });
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message || 'Server Error' });
    }
  }
  async getUsers(req, res) {
    try {
      const query = req.query.new;
      console.log('QUERY ==========', req.query);
      const users = query ? await getUsers(10) : await getUsers();
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message || 'Server Error' });
    }
  }
}

module.exports = new UserController();
