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
router.get("/:id", (req, res) => {
const dbUserData = Contact.findByPk(req.params.id)
    .then((dbUserData) => {
     if(!dbUserData){
     res.status(404).json({ message: `No contact found with id ${req.params.id}`});
    }
    res.status(200).json(dbUserData);
    })
.catch((err) => {
    res.status(500).json(err);})
});

//TODO: Create PUT contact by id endpoint
router.put("/:id", (req, res) => {
const dbUserData = Contact.findByPk(req.params.id)
    .then((dbUserData) => {
     if(!dbUserData){
     res.status(404).json({ message: `No contact found with id ${req.params.id}`});
    }
    dbUserData.update(req.body);
    res.status(200).json({ message: `Contact ${req.params.id} updated`, data: dbUserData}
    );
    })
.catch((err) => {
    res.status(500).json(err);})
});

//TODO: Create DELETE contact by id endpoint
router.delete("/:id", (req, res) => {
  const dbUserData = Contact.findByPk(req.params.id)
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: `No contact found with id ${req.params.id}` });
        return; // Exit the function to prevent further execution
      }
      dbUserData.destroy();
      res.status(200).json({ message: `Contact ${req.params.id} deleted` }); // Add closing parenthesis here
    })
    .catch((err) => {
      res.status(500).json(err);
    }); // Remove the extra closing brace and parenthesis here
});


module.exports = router;
