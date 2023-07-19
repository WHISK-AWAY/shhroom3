const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const SECRET = process.env.JWT;

const dbConfig = {
  logging: false,
};

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/shh_db',
  dbConfig
);

const User = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  publicKey: Sequelize.STRING,
});

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

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const credentials = [
    { username: 'patty', password: 'thepassword' },
    { username: 'anastasia', password: 'sock' },
  ];

  const [patty, anastasia] = await Promise.all(
    credentials.map((credential) => User.create(credential))
  );

  console.log('DB re-seeded');

  return {
    users: {
      patty,
      anastasia,
    },
  };
};

module.exports = { syncAndSeed, db, User };
