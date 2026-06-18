const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema(
  {
    setup: { type: String, required: true, trim: true },
    punchline: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: 'general' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Joke = mongoose.model('Joke', jokeSchema);
module.exports = Joke;
