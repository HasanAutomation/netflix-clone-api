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

  verifyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }
}

module.exports = new TokenService();
