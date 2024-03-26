const { body } = require("express-validator");

exports.post= [
  body("name")
    .isString()
    .withMessage("Name should be a string"),
    body("supervisor")
    .isMongoId()
    .withMessage("Supervisor ID should be a valid ObjectId"),
  body("children")
    .isArray({ min: 1 }) 
    .withMessage("Children should be an array with at least one element")
];

exports.update  = [
  body("fullname")
      .optional()
      .isAlpha()
      .withMessage("name should be string")
      .isLength({ max: 10 })
      .withMessage("name <10"),
  body("supervisor")
      .optional()
      .isMongoId()
      .withMessage("Supervisor ID should be a valid ObjectId"),
  body("children")
      .optional()
      .isArray()
      .withMessage("Enter an array of children")
];

exports.delete = [
  body("_id").isInt().withMessage("Id Shoud be Number")
]