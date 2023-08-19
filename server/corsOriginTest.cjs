require('dotenv').config();
const CLIENT_URL = process.env.CLIENT_URL;
const CLIENT_URL_STAGING = process.env.CLIENT_URL_STAGING;
const approvedOrigins = [CLIENT_URL, CLIENT_URL_STAGING];

function corsOriginTest(origin, cb) {
  if (approvedOrigins.includes(origin)) {
    return cb(null, true);
  } else {
    return cb(new Error('CORS origin not allowed.'));
  }
}

module.exports = corsOriginTest;
