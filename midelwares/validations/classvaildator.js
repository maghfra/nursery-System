const {param, body } = require("express-validator");
const Class = require("./../../model/classmodel")
exports.post= [
  body("name")
    .isString()
    .withMessage("Name should be a string")
    .custom(async (value, { req }) => {
      // Check if the name already exists in the database
      const existingName = await Class.findOne({ name: value });
      if (existingName) {
        throw new Error("Name already exists");
      }
      return true;
    }),
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
  param("_id").isInt().withMessage("Id Shoud be Number")
]