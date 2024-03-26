const { body } = require("express-validator");

exports.updateValidator = [
  body("fullname")
    .optional()
    .isString()
    .withMessage("teacher name should be string")
    .isLength({ max: 10 })
    .withMessage("teacher name should be less than 10 characters"),
 body("age")
    .optional() 
    .isInt()
    .withMessage("Age should be Number"),
  body("level")
    .optional()
    .isIn(["PREKG", "KG1", "KG2"])
    .withMessage("You should select one of the existing levels"),
  body("address.city")
    .optional()
    .isString()
    .withMessage("Invalid city"),
  body("address.street")
    .optional() 
    .isString()
    .withMessage("Invalid street"),
  body("address.building")
    .optional()
    .isNumeric()
    .withMessage("Invalid building")
];
