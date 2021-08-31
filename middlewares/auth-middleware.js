const { verifyAccessToken } = require('../services/token-service');
const { findSingleUser } = require('../services/user-service');

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

async function admin(req, res, next) {
  try {
    const user = await findSingleUser({ _id: req.user._id });
    if (!user) return res.status(404).json({ error: 'No user found' });
    if (!user.isAdmin) throw new Error('You are not authorized as an admin');
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err.message || 'Server error' });
  }
}

module.exports = { auth, admin };
