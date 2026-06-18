const axios = require('axios');
const Joke = require('../models/Joke');

exports.getAllJokes = async (req, res, next) => {
  try {
    const jokes = await Joke.find().populate('author', 'name email');
    res.json(jokes);
  } catch (error) {
    next(error);
  }
};

exports.getJokeById = async (req, res, next) => {
  try {
    const joke = await Joke.findById(req.params.id).populate('author', 'name email');

    if (!joke) {
      return res.status(404).json({ error: 'Joke not found' });
    }

    res.json(joke);
  } catch (error) {
    next(error);
  }
};

exports.fetchExternalJoke = async (req, res, next) => {
  try {
    const apiUrl = process.env.JOKE_API_URL;
    if (!apiUrl) {
      return res.status(400).json({
        error: 'External joke API URL is not configured. Set JOKE_API_URL in .env to use this feature.',
      });
    }

    const headers = {};
    if (process.env.JOKE_API_KEY) {
      headers.Authorization = `Bearer ${process.env.JOKE_API_KEY}`;
    }

    const response = await axios.get(apiUrl, { headers });
    const data = response.data;

    const jokeData = {
      setup: data.setup || data.joke || 'No setup provided',
      punchline: data.punchline || data.delivery || 'No punchline provided',
      category: data.category || 'general',
      author: req.user._id,
    };

    const joke = await Joke.create(jokeData);
    res.status(201).json(joke);
  } catch (error) {
    next(error);
  }
};

exports.createJoke = async (req, res, next) => {
  try {
    const { setup, punchline, category } = req.body;

    if (!setup || !punchline) {
      return res.status(400).json({ error: 'Setup and punchline are required' });
    }

    const joke = await Joke.create({
      setup,
      punchline,
      category: category || 'general',
      author: req.user._id,
    });

    res.status(201).json(joke);
  } catch (error) {
    next(error);
  }
};

exports.updateJoke = async (req, res, next) => {
  try {
    const joke = await Joke.findById(req.params.id);

    if (!joke) {
      return res.status(404).json({ error: 'Joke not found' });
    }

    if (joke.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You can only update your own jokes' });
    }

    joke.setup = req.body.setup || joke.setup;
    joke.punchline = req.body.punchline || joke.punchline;
    joke.category = req.body.category || joke.category;

    await joke.save();
    res.json(joke);
  } catch (error) {
    next(error);
  }
};

exports.deleteJoke = async (req, res, next) => {
  try {
    const joke = await Joke.findById(req.params.id);

    if (!joke) {
      return res.status(404).json({ error: 'Joke not found' });
    }

    if (joke.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You can only delete your own jokes' });
    }

    await joke.deleteOne();
    res.json({ message: 'Joke deleted successfully' });
  } catch (error) {
    next(error);
  }
};
