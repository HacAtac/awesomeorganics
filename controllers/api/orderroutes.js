const router = require("express").Router();
const { Order, OrderItem, Product } = require("../../models/");
const { withAuth } = require("../../middleware/protect.js");

// Create a new order (Checkout)
router.post("/checkout", withAuth, async (req, res) => {
  try {
    const UserId = req.session.user_id;
    const { items, totalAmount } = req.body;

    // Create a new order
    const newOrder = await Order.create({
      UserId,
      totalAmount,
      paymentStatus: "Unpaid",
    });

    // Create order items
    const orderItems = items.map((item) => ({
      OrderId: newOrder.id,
      ProductId: item.ProductId,
      quantity: item.quantity,
      price: item.price,
    }));
    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all orders for the logged-in user
router.get("/", withAuth, async (req, res) => {
  try {
    const UserId = req.session.user_id;
    const orders = await Order.findAll({
      where: { UserId },
      include: {
        model: OrderItem,
        include: {
          model: Product,
          as: "Product", // Specify the alias here
        },
      },
    });
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a specific order by order ID
router.get("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id },
      include: {
        model: OrderItem,
        include: Product,
      },
    });

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update the payment status of a specific order
router.put("/update-payment/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    const order = await Order.findOne({ where: { id } });

    if (order) {
      order.paymentStatus = paymentStatus;
      await order.save();
      res.status(200).json({ message: "Order payment status updated", order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a specific order by order ID
router.delete("/delete/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Order.destroy({ where: { id } });

    if (result) {
      res.status(200).json({ message: "Order deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
