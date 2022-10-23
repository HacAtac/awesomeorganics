const router = require("express").Router();
const users = require("./usersroutes"); //this is the users route
const products = require("./productsroutes"); //this is the products route
const dynamic = require("./dynamicroutes"); //this is the dynamic route

router.use("/users", users);
router.use("/products", products);
router.use("/dynamic", dynamic);

module.exports = router;
