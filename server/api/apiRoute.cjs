const express = require('express');
const router = express.Router();

router.use('/user', require('./user/userRoute.cjs'));
router.use('/auth', require('./auth/authRoute.cjs'));

module.exports = router;
