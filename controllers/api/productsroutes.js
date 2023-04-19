const router = require("express").Router();
const { Product } = require("../../models/");

//TODO create a route to get all products
router.get("/", (req, res) => {
  // Access our Product model and run .findAll() method
  Product.findAll()
    .then((dbProductData) => {
      // Check if any products were found
      if (!dbProductData.length) {
        res.status(404).json({ message: "Products Database is Empty" });
        return; // Return to prevent further execution
      }
      // Send the found products as JSON
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO get a single product by id
router.get("/:id", (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbProductData) => {
      // Check if any products were found
      if (!dbProductData) {
        res
          .status(404)
          .json({ message: `No product found with id ${req.params.id}` });
        return; // Return to prevent further execution
      }
      // Send the found products as JSON
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Product.create({
    ...req.body,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO update product route 'put route'
router.put("/:id", (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbProductData) => {
      if (!dbProductData[0]) {
        res.status(404).json({ message: "No product found with this id" });
        return;
      }
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO delete product route 'delet route'
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const deletedProduct = await product.destroy();
      res.status(200).send(deletedProduct);
    } else {
      res.status(404).send({
        message: "Product not found",
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
