const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/token-model');
class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20m',
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }
  async createToken(token, uid) {
    try {
      await RefreshToken.create({
        token,
        user: uid,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findRefreshToken(id) {
    return await RefreshToken.findOne({ user: id });
  }
  async updateRefreshToken(userId, token) {
    await RefreshToken.updateOne({ user: userId }, { token }, { new: true });
  }
  async deleteRefreshToken(token) {
    await RefreshToken.findOneAndDelete({ token });
  }

  verifyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }
  verifyRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  }
}

module.exports = new TokenService();
