const { body, param, validationResult } = require("express-validator");
const ticketService = require("../../services/ticket");

// Function to validate ticket ID
const validateId = async (id) => {
  const exists = await ticketService.getById(id);
  if (!exists) {
    throw new Error("Ticket not found");
  }
};

// Validation middleware for event date and time format
const validateEventDateTimeFormat = body("eventDateTime")
  .notEmpty()
  .withMessage("Please provide a valid event date and time")
  .matches(
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/,
    "g"
  )
  .withMessage('Date and time should be in the format "DD/MM/YYYY HH:mm"');

// Validation middleware for contact phone format
const validateContactPhoneFormat = body("contactPhone")
  .notEmpty()
  .withMessage("Please provide a contact phone number")
  .matches(/^\+998\d{9}$/)
  .withMessage(
    "Please provide a valid phone number starting with +998 followed by 9 digits"
  );

// Validation middleware for textarea
const validateTextarea = body("description")
  .notEmpty()
  .withMessage("Message cannot be empty")
  .isLength({ max: 1000 })
  .withMessage("Message cannot exceed 1000 characters");

// Object containing various ticket validations
const ticketValidations = {
  eventName: [
    body("eventName")
      .notEmpty()
      .withMessage("Please provide an event name")
      .isLength({ min: 8, max: 255 })
      .withMessage("Event name should be between 8 and 255 characters"),
  ],
  venue: [
    body("venue").notEmpty().withMessage("Please provide an event venue"),
  ],
  seat: [body("seat").notEmpty().withMessage("Please provide a seat")],
  id: [param("id").custom(validateId)],
};

// Middleware for adding a ticket with validations
const addTicketValidation = () => [
  ...ticketValidations.eventName,
  validateEventDateTimeFormat,
  ...ticketValidations.venue,
  validateContactPhoneFormat,
  validateTextarea, // Include the textarea validation here
  ...ticketValidations.seat,
];

// Middleware for updating a ticket with validations
const updateTicketValidation = () => [
  ...ticketValidations.id,
  ...ticketValidations.eventName,
  validateEventDateTimeFormat,
  ...ticketValidations.venue,
  validateContactPhoneFormat,
  validateTextarea, // Include the textarea validation here
  ...ticketValidations.seat,
];

// Middleware for deleting a ticket with validations
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
