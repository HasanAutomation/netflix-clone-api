const mongoose = require('mongoose');

const tokenModel = new mongoose.Schema({
  token: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const RefreshToken = mongoose.model('refreshToken', tokenModel);
module.exports = RefreshToken;
