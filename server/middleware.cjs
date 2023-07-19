const { User } = require('./db/index.cjs');

async function requireToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    const user = await User.verifyByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { requireToken };
