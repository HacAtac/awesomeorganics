const router = require("express").Router();
const { Product, User, Cart, Dynamic } = require("../models/");
const db = require("../models");
//import my hero.jpg image from public/img/hero.jpg

router.get("/", (req, res) => {
  Dynamic.findAll({
    // include: [User],
  })
    .then((dbDynamicData) => {
      // we need to get the dbDynamicData and get the heroImage from the object and save it to a variable
      // then we need to pass that variable to the homepage
      //const heroImage = dbDynamicData[0].heroImage;
      const heroImage = "../public/img/hero.jpg";

      res.render("index", { heroImage });
      console.log("dynamic", heroImage);
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

      res.render("products", { products });
      console.log("products", products);
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

router.get("/contact_me", (req, res) => {
  res.render("contact");
});

router.get("/privacy", (req, res) => {
  res.render("privacy");
});

router.get("/welcomeuser", (req, res) => {
  res.render("welcomeuser");
});

//admin page
router.get("/admin", (req, res) => {
  res.render("admin");
});

//router.get for the a href product 1 inside the productinfo1.handlebars

//TODO after login

module.exports = router;
