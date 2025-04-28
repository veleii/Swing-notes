import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = (req, res, db) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });

    const newUser = {
      username,
      password: hashedPassword,
    };

    db.users.insert(newUser, (err, doc) => {
      if (err)
        return res.status(500).json({ message: "Server error", error: err });
      res.status(201).json({ message: "User created", user: doc });
    });
  });
};

export const login = (req, res, db) => {
  const { username, password } = req.body;

  db.users.findOne({ username }, (err, user) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare passwords
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({ message: "Server error", error: err });
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({ token, message: "Login successful" });
    });
  });
};
