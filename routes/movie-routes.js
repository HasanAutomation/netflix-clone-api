const router = require('express').Router();
const {
  create,
  update,
  deleteMovie,
  getMovie,
  getAllMovies,
  getRandom,
} = require('../controllers/movie-controller');
const { auth, admin } = require('../middlewares/auth-middleware');

router.route('/').post(auth, admin, create).get(auth, getAllMovies);
router.get('/random', auth, getRandom);
router
  .route('/:id')
  .put(auth, admin, update)
  .delete(auth, admin, deleteMovie)
  .get(auth, getMovie);

module.exports = router;
