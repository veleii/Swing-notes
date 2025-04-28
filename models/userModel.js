// Eftersom vi använder NeDB behöver vi inte definiera något schema.
const NeDB = require("nedb");
const bcrypt = require("bcryptjs"); // För lösenordshashning

// Skapa en instans av NeDB för användardatabasen
const db = new NeDB({
  filename: "./db/users.db",
  autoload: true,
});

// Funktion för att skapa användare
const createUser = (userData, callback) => {
  // Hasha lösenordet innan vi sparar användaren
  bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
    if (err) return callback(err);

    const user = {
      username: userData.username,
      password: hashedPassword,
    };

    db.insert(user, callback);
  });
};

// Funktion för att hitta en användare baserat på användarnamn
const findUserByUsername = (username, callback) => {
  db.findOne({ username }, callback);
};

module.exports = { createUser, findUserByUsername };
