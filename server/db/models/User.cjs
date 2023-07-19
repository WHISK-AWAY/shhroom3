require('dotenv').config();
const SECRET = process.env.JWT;

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../dbConnection.cjs');

/**
 * User model
 */

const User = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  publicKey: Sequelize.STRING,
});

// * beforeCreate hook
// * receives user object
// * hashes plaintext password before committing to database

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// * authenticate method
// * accepts object containing username & plaintext password
// * returns signed JWT if hashed password matches database record
// * otherwise, throws error
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

// * verifyByToken method
// * accepts JWT
// * returns user object if token is verified
// * otherwise, throws error

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

module.exports = User;
