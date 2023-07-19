const { User } = require('./db/index.cjs');

async function requireToken(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token.toLowerCase().startsWith('bearer ')) {
      res.status(401).json({ message: 'Authentication failed.' });
    }

    const user = await User.verifyByToken(token.slice(7));

    if (!user?.username) {
      res.status(401).json({ message: 'Authentication failed.' });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { requireToken };
