const router = require("express").Router();
const { Op } = require("sequelize");
const { User } = require("../../models/");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    // Check if a user with the given email or username already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
      },
    });

    // If a user with the given email or username already exists, send an error response
    if (existingUser) {
      res.status(400).json({
        message: "User with the provided email or username already exists.",
      });
      return;
    }

    // If no existing user is found, create a new user
    const newUser = await User.create(req.body);

    // Set the user's ID in the session
    req.session.user_id = newUser.id;

    // Send a success response
    res.status(201).json(newUser);
  } catch (err) {
    console.log("Error creating a new user", err);
    res.status(500).json(err);
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    // Find the user by username
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Check the password
    const validPassword = user.checkPassword(req.body.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }
    // Set the user's ID in the session
    req.session.user_id = user.id;
    req.session.username = user.username;
    // Send a success response
    res.status(200).json({ user });
  } catch (err) {
    console.log("Error logging in a user", err);
    res.status(500).json(err);
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  if (req.session.user_id) {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        // Send an error response if there was an issue destroying the session
        res
          .status(500)
          .json({ message: "Failed to log out. Please try again." });
      } else {
        // Send a success response with a message
        res.status(200).json({ message: "Logged out successfully." });
      }
    });
  } else {
    // Send a response indicating that the user is not logged in
    res
      .status(400)
      .json({ message: "No active session found. Please log in first." });
  }
});

module.exports = router;
