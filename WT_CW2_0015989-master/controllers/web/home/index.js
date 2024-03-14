// Importing the ticket service
const ticketService = require("../../../services/ticket");

// Defining the home controller object
const homeController = {
  // Handler for rendering the index page
  index: async (req, res) => {
    // Rendering the home page
    res.render("home/home");
  },

  // Handler for rendering the add page
  add: async (req, res) => {
    // Rendering the list page in "Add" mode
    res.render("home/list", { mode: "Add" });
  },

  // Handler for rendering the update page
  update: async (req, res) => {
    // Geting the event data by ID
    const eventData = await ticketService.getById(req.params.id);

    // Rendering the list page in "Update" mode with event data
    res.render("home/list", { mode: "Update", eventData: eventData });
  },
};

// Exporting the home controller object
module.exports = homeController;
