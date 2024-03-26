const { body } = require("express-validator");

exports.updateValidator = [
  body("_id")
    .isMongoId()
    .withMessage("teacher id should be a valid ObjectId"),
  body("fullname")
    .optional()
    .isAlpha()
    .withMessage("teacher name should be string")
    .isLength({ max: 10 })
    .withMessage("teacher name <10"),
    body("password")
      .optional()
      .isLength({ min: 2 }) 
      .withMessage("password should be at least 8 characters long")
      .matches(/\d/) // Password should contain at least one digit
      .withMessage("password should contain at least one digit"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("email should be string"),
  body("image")
    .optional()
    .isString()
    .withMessage("image should be string")
];
