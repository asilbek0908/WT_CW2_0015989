const fs = require("fs");

// Importing tickets data from the database file path stored in global.data_db
const tickets = require(global.data_db);

// Defines a TicketService object
const ticket_service = {
  // Method to retrieve all tickets
  getAll() {
    return tickets;
  },

  // Method to retrieve a ticket by its ID
  getById(id) {
    return tickets.find((t) => t.id == id);
  },

  // Method to create a new ticket
  create(req, res) {
    // Generates a random ID for the new ticket
    let new_id = genRandId(4);

    // Extracts ticket data from the request body
    const ticket = req.body;

    // Creates a new ticket object with the generated ID and the ticket data
    const new_ticket = {
      id: new_id,
      ticket: ticket,
    };

    // Adds the new ticket to the tickets array
    tickets.push(new_ticket);

    // Writes the updated tickets data to the file
    writeToFile(tickets);

    // Returns the newly created ticket
    return new_ticket;
  },

  // Method to update an existing ticket
  update(id, updateData) {
    // Finds the index of the ticket with the specified ID
    const ticketIndex = tickets.findIndex((t) => t.id == id);

    // If the ticket with the specified ID is not found, returns null
    if (ticketIndex === -1) {
      return null;
    }

    // Merge the updateData with the existing ticket data
    tickets[ticketIndex].ticket = {
      ...tickets[ticketIndex].ticket,
      ...updateData,
    };

    // Write the updated tickets data to the file
    writeToFile(tickets);

    // Return the updated ticket
    return tickets[ticketIndex];
  },

  // Method to delete a ticket by its ID
  delete(id) {
    // Find the index of the ticket with the specified ID
    const index = tickets.findIndex((t) => t.id == id);

    // Remove the ticket from the tickets array
    tickets.splice(index, 1);

    // Write the updated tickets data to the file
    writeToFile(tickets);
  },
};

// Function to write the tickets data to the file
let writeToFile = async (tickets) => {
  await fs.writeFileSync(
    global.data_db,
    JSON.stringify(tickets, null, 4),
    "utf8"
  );
};

// Function to generate a random ID
let genRandId = (count) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < count; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Export the ticket_service object to make it accessible to other modules
module.exports = ticket_service;
