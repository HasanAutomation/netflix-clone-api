const {
  sendOtp,
  verifyOtp,
  login,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  getStat,
} = require('../controllers/user-controller');
const { auth } = require('../middlewares/auth-middleware');

const router = require('express').Router();

router.get('/', auth, getUsers);
router.get('/stats', getStat);
router.route('/send-otp').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);
router.post('/login', login);
router
  .route('/:id')
  .put(auth, updateUser)
  .delete(auth, deleteUser)
  .get(auth, getUser);

module.exports = router;
