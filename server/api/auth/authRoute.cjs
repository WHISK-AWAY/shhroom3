const express = require('express');
const router = express.Router();

const { User } = require('../../db/index.cjs');
const { requireToken } = require('../../middleware.cjs');

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const usernameCheck = await User.findOne({
      where: { username: username.trim().toLowerCase() },
    });
    if (!usernameCheck || usernameCheck === null) {
      return res
        .status(404)
        .send({ message: 'given username does not exist in the database' });
    }

    const authCheck = await User.authenticate({
      username: username.trim().toLowerCase(),
      password,
    });

    if (!authCheck) {
      return res.status(401).send({ message: 'invalid credentials' });
    }

    // console.log(`${username} successfully logged in`);
    res.status(200).json({ token: authCheck });
  } catch (err) {
    next(err);
  }
});

router.get('/', requireToken, (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
