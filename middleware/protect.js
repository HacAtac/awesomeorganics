const User = require("../models/User");
//const Order = require("../models/Order");

const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};

const withAdmin = async (req, res, next) => {
  try {
    // Retrieve the user from the database using the user_id from the session
    const user = await User.findByPk(req.session.user_id);
    if (user && user.role === "admin") {
      // User is an admin, proceed to the next middleware or route handler
      next();
    } else {
      // User is not an admin
      res.status(403).json({ message: "Forbidden: Admin role required" });
    }
  } catch (err) {
    // Error occurred while retrieving user or checking role
    res.status(500).json({ message: "Server error" });
  }
};

// const withOrderAuth = async (req, res, next) => {
//   try {
//     // Retrieve the order from the database using the order_id from the request parameters
//     const order = await Order.findByPk(req.params.order_id);
//     if (order && order.user_id === req.session.user_id) {
//       // User is authorized to view this order, proceed to the next middleware or route handler
//       next();
//     } else {
//       // User is not authorized to view this order
//       res
//         .status(403)
//         .json({ message: "Forbidden: Not authorized to view this order" });
//     }
//   } catch (err) {
//     // Error occurred while retrieving order or checking authorization
//     res.status(500).json({ message: "Server error" });
//   }
// };
