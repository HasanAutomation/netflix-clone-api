const { sendOtp, verifyOtp } = require('../controllers/user-controller');

const router = require('express').Router();

router.route('/send-otp').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);

module.exports = router;
