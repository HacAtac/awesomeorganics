const User = require("./User");
const Product = require("./Product");
const Cart = require("./Cart");
const Dynamic = require("./Dynamic");
const Contact = require("./Contact");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

Cart.belongsTo(Product, {
  foreignKey: "ProductId",
});

Product.hasMany(Cart, {
  foreignKey: "ProductId",
});

Order.hasMany(OrderItem, {
  foreignKey: "OrderId",
  onDelete: "CASCADE",
});

OrderItem.belongsTo(Order, {
  foreignKey: "OrderId",
});

// Add the association between OrderItem and Product
OrderItem.belongsTo(Product, {
  foreignKey: "ProductId",
  as: "Product",
});

Product.hasMany(OrderItem, {
  foreignKey: "ProductId",
  as: "OrderItems",
});

module.exports = { User, Product, Cart, Dynamic, Contact, Order, OrderItem };
