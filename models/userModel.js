const NeDB = require("nedb");
const bcrypt = require("bcryptjs");

const db = new NeDB({
  filename: "./db/users.db",
  autoload: true,
});

const createUser = (userData, callback) => {
  bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
    if (err) return callback(err);

    const user = {
      username: userData.username,
      password: hashedPassword,
    };

    db.insert(user, callback);
  });
};

const findUserByUsername = (username, callback) => {
  db.findOne({ username }, callback);
};

module.exports = { createUser, findUserByUsername };
