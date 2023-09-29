const express = require('express');
const router = express.Router();

const { User } = require('../../db/index.cjs');
const { requireToken } = require('../../middleware.cjs');

const { validateNewUserInput } = require('./userValidators.cjs');

// * Create new user
// * Returns JWT if successful
router.post('/', async (req, res, next) => {
  try {
    const { username, password } = validateNewUserInput(req.body);

    const [_, created] = await User.findOrCreate({
      where: { username: username.toLowerCase() },
      defaults: { username: username.toLowerCase(), password },
    });

    if (!created) {
      // User was not created & therefore must already exist
      return res.status(409).json({ message: 'This username already exists.' });
    }

    res
      .status(201)
      .json({
        token: await User.authenticate({
          username: username.toLowerCase(),
          password,
        }),
      });
  } catch (err) {
    next(err);
  }
});

// * Update user's public encryption key in database
router.put('/:userId', requireToken, async (req, res, next) => {
  try {
    // need to store user's public key in the database
    const { publicKey } = req.body;
    const { userId } = req.params;

    await User.update({ publicKey: publicKey }, { where: { id: userId } });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
