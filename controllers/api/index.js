const router = require("express").Router();
const users = require("./usersroutes"); //this is the users route
const products = require("./productsroutes"); //this is the products route
const dynamic = require("./dynamicroutes"); //this is the dynamic route
const contact = require("./contactroutes"); //this is the contact route
const cart = require("./cartroutes"); //this is the cart route
const order = require("./orderroutes"); //this is the order route

router.use("/auth", users);
router.use("/products", products);
router.use("/dynamic", dynamic);
router.use("/contact", contact);
router.use("/cart", cart);
router.use("/orders", order);

module.exports = router;
