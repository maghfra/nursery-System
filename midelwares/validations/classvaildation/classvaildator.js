const { body } = require("express-validator");

exports.insertValidator = [
  body("_id")
    .isInt()
    .withMessage("ID should be an integer"),
  body("name")
    .isString()
    .withMessage("Name should be a string"),
    body("supervisor")
    .isMongoId()
    .withMessage("Supervisor ID should be a valid ObjectId"),
  body("children")
    .isArray({ min: 1 }) 
    .withMessage("Children should be an array with at least one element")
]