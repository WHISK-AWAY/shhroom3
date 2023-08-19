require('dotenv').config();
require('./sockets.cjs');
const morgan = require('morgan');
const CLIENT_URL = process.env.CLIENT_URL;
const CLIENT_URL_STAGING = process.env.CLIENT_URL_STAGING;
const approvedOrigins = [CLIENT_URL, CLIENT_URL_STAGING];
const API_PORT = process.env.API_PORT || 3000;

const express = require('express');
const app = express();
const cors = require('cors');
const corsOriginTest = require('./corsOriginTest.cjs');

const { ZodError } = require('zod');
const { fromZodError } = require('zod-validation-error');

// Basic server setup
app.use(express.static('public'));
app.use(express.json());

// CORS setup

app.use(
  cors({
    origin: corsOriginTest,
  }),
);
app.use(morgan('dev'));

// API route entry point
app.use('/api', require('./api/apiRoute.cjs'));

// * Zod validation error handler
app.use((err, req, res, next) => {
  if (err instanceof ZodError) {
    console.error(err);
    const validationError = fromZodError(err);
    return res.status(400).json({ message: validationError.message });
  }
  next(err);
});

function init() {
  console.log('Allowing CORS traffic from ' + approvedOrigins);

  // server.listen(3002, () => {
  //   console.log('WS server listening at', 3002);
  // });
  app.listen(API_PORT, () => {
    console.log('HTTP server listening at', API_PORT);
  });
}

module.exports = app;

init();
