const express = require('express');
const router = express.Router();

const { User } = require('../../db/index.cjs');
const { requireToken } = require('../../middleware.cjs');

router.get('/', (req, res, next) => {
  res.send('Hello, world!');
});

router.put('/:userId', requireToken, async (req, res, next) => {
  try {
    // need to store user's public key in the database
    const { publicKey } = req.body;
    const { userId } = req.params;

    await User.update({ publicKey: publicKey }, { where: { id: userId } });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
