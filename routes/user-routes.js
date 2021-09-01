const {
  sendOtp,
  verifyOtp,
  login,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  getStat,
  refresh,
  logout,
} = require('../controllers/user-controller');
const { auth } = require('../middlewares/auth-middleware');

const router = require('express').Router();

router.get('/', auth, getUsers);
router.get('/stats', getStat);
router.get('/refresh', refresh);
router.post('/logout', auth, logout);
router.route('/send-otp').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);
router.post('/login', login);
router
  .route('/:id')
  .put(auth, updateUser)
  .delete(auth, deleteUser)
  .get(auth, getUser);

module.exports = router;
