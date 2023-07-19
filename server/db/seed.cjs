const db = require('./dbConnection.cjs');
const User = require('./models/User.cjs');

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const credentials = [
    { username: 'patty', password: 'thepassword' },
    { username: 'anastasia', password: 'sock' },
  ];

  const [patty, anastasia] = await Promise.all(
    credentials.map((credential) => User.create(credential)),
  );

  console.log('DB re-seeded');

  return {
    users: {
      patty,
      anastasia,
    },
  };
};

syncAndSeed();
