const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jokeRoutes = require('./routes/jokeRoutes');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jokes', jokeRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'Joke Management System API is running.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
