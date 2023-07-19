// const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const db = require('./dbConnection.cjs');
const User = require('./models/User.cjs');

User.authenticate = async ({ username, password }) => {
  try {
    const user = await User.findOne({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return jwt.sign({ id: user.id }, SECRET);
    }
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  } catch (err) {
    console.log('authentication error:', err);
  }
};

User.verifyByToken = async (token) => {
  try {
    const userId = jwt.verify(token, SECRET);
    const user = await User.findByPk(userId.id, {
      attributes: { exclude: ['password'] },
    });
    if (user) {
      return user; // was user.username
    } else {
      const error = new Error('bad credentials / bad token');
      error.status = 401;
      throw error;
    }
  } catch (err) {
    console.log('verification error: ', err);
  }
};

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});
