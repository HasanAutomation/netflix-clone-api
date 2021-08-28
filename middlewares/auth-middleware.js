const { verifyAccessToken } = require('../services/token-service');

async function auth(req, res, next) {
  try {
    let { accesstoken } = req.cookies;
    if (!accesstoken) throw new Error('No Access token!');
    const userData = verifyAccessToken(accesstoken);
    if (!userData) return res.status(404).json({ error: 'No user data found' });
    req.user = userData;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message || 'Invalid token' });
  }
}

module.exports = auth;
