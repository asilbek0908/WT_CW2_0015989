// Imports the ticket service
const ticketService = require("../../../services/ticket");

// Defines the ticket controller object
const ticketController = {
  // Handler for getting all tickets
  getAll(req, res) {
    // Return all tickets as JSON
    res.json(ticketService.getAll());
  },

  // Handler for creating a new ticket
  create(req, res) {
    // Creates the ticket and return it with status 201 (Created)
    res.status(201).json(ticketService.create(req, res));
  },

  // Handler for updating a ticket
  update(req, res) {
    // Updates the ticket
    const ticket = ticketService.update(req.params.id, req.body);

    // If ticket exists, returns it; otherwise, return 404 (Not Found)
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).send("Ticket not found");
    }
  },

  // Handler for deleting a ticket
  delete(req, res) {
    // Geting the ticket by ID
    const ticket = ticketService.getById(req.params.id);

    // If ticket exists, deletes it and return 204 (No Content); otherwise, return 404 (Not Found)
    if (ticket) {
      ticketService.delete(req.params.id);
      res.status(204).send("Ticket deleted successfully");
    } else {
      res.status(404).send("Ticket not found");
    }
  },
};

// Exporting the ticket controller object
module.exports = ticketController;
