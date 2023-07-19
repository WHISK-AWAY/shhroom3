const express = require('express');
const router = express.Router();

const { User } = require('../../db/index.cjs');
const { requireToken } = require('../../middleware.cjs');

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    res.send({ token: await User.authenticate({ username, password }) });
  } catch (err) {
    next(err);
  }
});

router.get('/', requireToken, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
