const { body, param, validationResult } = require("express-validator");
const ticketService = require("../../services/ticket");

// Function to validate if ticket with given id exists
const validateId = async (id) => {
  const exists = await ticketService.getById(id);
  if (!exists) {
    throw new Error("Ticket not found");
  }
};

// Validation middleware for event date time format
const validateEventDateTimeFormat = body("eventDateTime")
  .notEmpty()
  .withMessage("Event date and time cannot be empty")
  .matches(
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/,
    "g"
  )
  .withMessage(
    'Please enter a valid date and time in the format "DD/MM/YYYY HH:mm".'
  );

// Validation middleware for contact phone format
const validateContactPhoneFormat = body("contactPhone")
  .notEmpty()
  .withMessage("Contact phone number cannot be empty")
  .matches(/^\+998\d{9}$/)
  .withMessage(
    "Invalid phone number format. It must start with +998 followed by 9 digits."
  );

// Object containing common validation checks for ticket properties
const ticketValidations = {
  eventName: [
    body("eventName")
      .notEmpty()
      .withMessage("Event name cannot be empty")
      .isLength({ min: 8, max: 255 })
      .withMessage("Event name must be between 8 and 255 characters long"),
  ],
  venue: [body("venue").notEmpty().withMessage("Event venue cannot be empty")],
  seat: [body("seat").notEmpty().withMessage("Seat selection cannot be empty")],
  id: [param("id").custom(validateId)],
};

// Validation middleware for adding a ticket
const addTicketValidation = () => [
  ...ticketValidations.eventName,
  validateEventDateTimeFormat,
  ...ticketValidations.venue,
  validateContactPhoneFormat,
  ...ticketValidations.seat,
];

// Validation middleware for updating a ticket
const updateTicketValidation = () => [
  ...ticketValidations.id,
  ...ticketValidations.eventName,
  validateEventDateTimeFormat,
  ...ticketValidations.venue,
  validateContactPhoneFormat,
  ...ticketValidations.seat,
];

// Validation middleware for deleting a ticket
const deleteTicketValidation = () => [...ticketValidations.id];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  addTicketValidation,
  updateTicketValidation,
  deleteTicketValidation,
  handleValidationErrors,
};
