const router = require("express").Router();
const { Cart, Product } = require("../../models/");
const { Products } = require("../../models/");
const { withAuth } = require("../../middleware/protect.js");

// Create a new item in the cart (Add to cart)
router.post("/add", withAuth, async (req, res) => {
  try {
    const { ProductId, quantity } = req.body;
    const UserId = req.session.user_id;

    //check DB for product availability
    const productData = await Product.findByPk(ProductId);
    const productAvailability = productData.dataValues.quantity;
    if (productAvailability < quantity) {
      res
        .status(400)
        .json({ message: `Only ${productAvailability} available` });
      return;
    }

    // Check if the cart item already exists
    const existingCartItem = await Cart.findOne({
      where: { UserId, ProductId },
    });

    if (existingCartItem) {
      // Update the quantity of the existing cart item
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      res
        .status(200)
        .json({ message: "Cart item updated", cartItem: existingCartItem });
    } else {
      // Create a new cart item
      const newCartItem = await Cart.create({ UserId, ProductId, quantity });
      res
        .status(201)
        .json({ message: "Cart item added", cartItem: newCartItem });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all cart items for the logged-in user
router.get("/", withAuth, async (req, res) => {
  try {
    const UserId = req.session.user_id;
    const cartItems = await Cart.findAll({
      where: { UserId },
      include: Products,
    });
    res.status(200).json(cartItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update the quantity of a specific cart item
router.put("/update/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const UserId = req.session.user_id;

    // Find the cart item to update
    const cartItem = await Cart.findOne({ where: { id, UserId } });

    if (cartItem) {
      // Update the quantity
      cartItem.quantity = quantity;
      await cartItem.save();
      res.status(200).json({ message: "Cart item updated", cartItem });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove a specific item from the cart
router.delete("/remove/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const UserId = req.session.user_id;

    // Delete the cart item
    const result = await Cart.destroy({ where: { id, UserId } });

    if (result) {
      res.status(200).json({ message: "Cart item removed" });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
