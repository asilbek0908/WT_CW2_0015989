// Importing the required module
const express = require("express");

// Importing the home controller
const homeController = require("../../../controllers/web/home");

// Creating a new router instance
const router = express.Router();

// Defining route handling
router.get("/", homeController.index); // Route for the home page
router.get("/add", homeController.add); // Route for adding a new item
router.get("/update", homeController.update);
router.get("/update/:id", homeController.update); // Route for updating an item with specific ID

// Exporting the router instance
module.exports = router;
