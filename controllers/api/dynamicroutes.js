const router = require("express").Router();
const { Dynamic } = require("../../models/");

//TODO create a route to get all products
router.get("/", (req, res) => {
  //Acces our Product model and run .findAll() method)
  Dynamic.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO create a route to get a single product
router.get("/:id", (req, res) => {
  Dynamic.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No product found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO create a route to create a product
router.post("/", async (req, res) => {
  try {
    const dbUserData = await Dynamic.create({
      ...req.body,
    });
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
