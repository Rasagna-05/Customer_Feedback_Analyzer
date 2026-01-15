// src/app.js
const express = require('express');
const cors = require('cors');

const feedbackRoutes = require('./routes/feedbackRoutes'); // <- this should point to the file above

const app = express();

app.use(cors());
app.use(express.json()); // to parse JSON request bodies

// simple root route for sanity check
app.get('/', (req, res) => {
  res.json({ message: 'Feedback Hub API is running' });
});

// mount the feedback routes
app.use('/api/feedback', feedbackRoutes);

module.exports = app;
