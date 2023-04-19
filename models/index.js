const User = require("./User");
const Product = require("./Product");
const Cart = require("./Cart");
const Dynamic = require("./Dynamic");
const Contact = require("./Contact");

Cart.belongsTo(Product, {
  foreignKey: "ProductId",
});

Product.hasMany(Cart, {
  foreignKey: "ProductId",
});

module.exports = { User, Product, Cart, Dynamic, Contact };
