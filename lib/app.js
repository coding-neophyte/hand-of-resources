const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/music', require('./controllers/songs'))
app.use('/api/v1/teams', require('./controllers/teams'))
app.use('/api/v1/fighters', require('./controllers/fighters'))
app.use('/api/v1/expenses', require('./controllers/expenses'))
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
