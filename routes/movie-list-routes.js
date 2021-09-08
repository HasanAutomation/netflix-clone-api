const router = require('express').Router();
const {
  createList,
  getList,
  update,
} = require('../controllers/movie-list-controller');
const { auth, admin } = require('../middlewares/auth-middleware');

router.route('/').post(auth, admin, createList).get(auth, getList);
router.route('/:id').put(auth, admin, update);

module.exports = router;
