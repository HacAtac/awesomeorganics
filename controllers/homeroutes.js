const router = require("express").Router();
const { Product, User, Cart, Dynamic } = require("../models/");
const db = require("../models");
const { withAuth } = require("../middleware/protect.js");
//import my hero.jpg image from public/img/hero.jpg

router.get("/", (req, res) => {
  Dynamic.findAll({
    // include: [User],
  })
    .then((dbDynamicData) => {
      const heroImage = "../public/img/hero.jpg";

      // Check if the user is logged in by checking the session
      const isLoggedIn = req.session && req.session.user_id;
      const username = isLoggedIn ? req.session.username : null;
      res.render("index", { isLoggedIn, username, heroImage });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get all products from database
router.get("/products", (req, res) => {
  Product.findAll({
    // include: [User],
  })
    .then((dbProductData) => {
      const products = dbProductData.map((post) => post.get({ plain: true }));

      // Check if the user is logged in by checking the session
      const isLoggedIn = req.session && req.session.user_id;
      const username = isLoggedIn ? req.session.username : null;
      res.render("products", { isLoggedIn, username, products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//sequelize findByPk method
router.get("/product/:id", (req, res) => {
  Product.findByPk(req.params.id)
    .then((dbProductData) => {
      const product = dbProductData.get({ plain: true });
      res.render("single-product", { product });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  res.render("registration");
});

router.get("/register", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  res.render("index");
});

router.get("/cart", withAuth, async (req, res) => {
  try {
    const UserId = req.session.user_id;
    const username = req.session.username;

    // Retrieve cart items for the logged-in user, including product details
    const cartItemsData = await Cart.findAll({
      where: { UserId },
      include: [Product], // Include product details for each cart item
    });

    // Convert the cart items data to plain JSON objects
    const cartItems = cartItemsData.map((item) => item.get({ plain: true }));

    // Calculate the total cost of the cart
    const total = cartItems.reduce(
      (acc, item) => acc + item.Product.price * item.quantity,
      0
    );

    res.render("cart", { isLoggedIn: true, username, cartItems, total });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/contact_me", (req, res) => {
  // Check if the user is logged in by checking the session
  const isLoggedIn = req.session && req.session.user_id;
  const username = isLoggedIn ? req.session.username : null;
  res.render("contact", { isLoggedIn, username });
});

module.exports = router;
