// Importing the required module
const express = require("express");

// Importing the home router
const homeRouter = require("./home");

// Creating a new router instance
const router = express.Router();

// Defining route handling
router.use("/", homeRouter);

// Exporting the router instance
module.exports = router;
