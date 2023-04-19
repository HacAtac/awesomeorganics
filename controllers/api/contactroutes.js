const router = require("express").Router();
const { Contact } = require("../../models/");

//TODO: Create POST contact endpoint
router.post("/", (req, res) => {
  Contact.create({
    ...req.body,
  })
    .then((dbUserData) => {
      res.status(200).json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}); // Add closing parenthesis and curly brace here

//TODO: Create GET contacts endpoint
router.get("/", (req, res) => {
const dbUserData = Contact.findAll()
   .then((dbUserData) => {
     if (!dbUserData) {
       res.status(404).json({ message: "No contacts found" });
       return;
     }
        res.status(200).json(dbUserData);
   })
   .catch((err) => {
        res.status(500).json(err);
   });
});

//TODO: Create GET contact by id endpoint

//TODO: Create PUT contact by id endpoint

//TODO: Create DELETE contact by id endpoint

module.exports = router;
