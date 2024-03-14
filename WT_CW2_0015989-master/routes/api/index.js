// Importing the required module
const express = require("express");

// Importing the ticket router
const ticketRouter = require("./ticket");

// Creating a new router instance
const router = express.Router();

// Defining route handling
router.use("/ticket", ticketRouter);

// Exporting the router instance
module.exports = router;
