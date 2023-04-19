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

module.exports = router;
