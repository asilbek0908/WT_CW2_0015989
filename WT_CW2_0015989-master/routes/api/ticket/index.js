// Importing required modules
const express = require("express");
const { validationResult } = require("express-validator");
const ticketController = require("../../../controllers/api/ticket");
const {
  addTicketValidation,
  updateTicketValidation,
  deleteTicketValidation,
} = require("../../../validators/ticket");

// Creating a new router instance
const router = express.Router();

// Defining routes and their handlers
router.get("/", (req, res) => {
  // Routing for getting all tickets
  ticketController.getAll(req, res);
});

router.post("/", addTicketValidation(), (req, res) => {
  // Routing for creating a new ticket
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  ticketController.create(req, res);
});

router.put("/:id", updateTicketValidation(), (req, res) => {
  // Routing for updating a ticket by ID
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  ticketController.update(req, res);
});

router.delete("/:id", deleteTicketValidation(), (req, res) => {
  // Routing for deleting a ticket by ID
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  ticketController.delete(req, res);
});

// Exporting the router instance
module.exports = router;
