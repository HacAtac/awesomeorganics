const { Product } = require("../models");

const productdata = [
  {
    id: 1,
    name: "Chapstick",
    // category_id: 1,
    description:
      "Handmade chapstick that is 100% organic.  Complete with a touch of love and care. Comes in a variety of scents.",
    quantity: 100,
    price: 3.5,
  },
  {
    id: 2,
    name: "Hand Sanitizer",
    // category_id: 2,
    description:
      "Handmade hand sanitizer that is 100% organic.  Complete with a touch of love and care.",
    quantity: 100,
    price: 15,
  },
  {
    id: 3,
    name: "Beeswax Candle",
    // category_id: 3,
    description: "Handmade beeswax candle that is 100% organic.",
    quantity: 10,
    price: 12,
  },
  {
    id: 4,
    name: "Essential Oils",
    // category_id: 4,
    description: "Handmade essential oils that are 100% organic.",
    quantity: 100,
    price: 35,
  },
  {
    id: 5,
    name: "Moisturizer",
    // category_id: 5,
    description: "Handmade moisturizer that is 100% organic.",
    quantity: 100,
    price: 35,
  },
  {
    id: 6,
    name: "Bundle",
    // category_id: 6,
    description:
      "Buy a bundle of all the products to save money and get your favorite products.",
    quantity: 100,
    price: 35,
  },
];
const seedProducts = () => Product.bulkCreate(productdata);

module.exports = seedProducts;
