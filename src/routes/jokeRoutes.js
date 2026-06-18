const express = require('express');
const {
  getAllJokes,
  getJokeById,
  fetchExternalJoke,
  createJoke,
  updateJoke,
  deleteJoke,
} = require('../controllers/jokeController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllJokes);
router.get('/:id', getJokeById);
router.post('/', authenticate, createJoke);
router.post('/fetch-external', authenticate, fetchExternalJoke);
router.put('/:id', authenticate, updateJoke);
router.delete('/:id', authenticate, deleteJoke);

module.exports = router;
