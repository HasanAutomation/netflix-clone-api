const { sendOtp, verifyOtp, login } = require('../controllers/user-controller');

const router = require('express').Router();

router.route('/send-otp').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);
router.post('/login', login);

module.exports = router;
