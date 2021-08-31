const router = require('express').Router();
const { createList, getList } = require('../controllers/movie-list-controller');
const { auth, admin } = require('../middlewares/auth-middleware');

router.route('/').post(auth, admin, createList).get(auth, getList);

module.exports = router;
