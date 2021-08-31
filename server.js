require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/db');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5500;

// middlewares
app.use(express.json());
app.use(cookieParser());

// connect database
connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to netflix rest services');
});

// Mount routes
app.use('/api/users', require('./routes/user-routes'));
app.use('/api/movies', require('./routes/movie-routes'));
app.use('/api/movie-list', require('./routes/movie-list-routes'));

// Listen server
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
