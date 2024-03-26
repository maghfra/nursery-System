const { body } = require("express-validator");

exports.post = [
  body("fullName")
    .isAlpha()
    .withMessage("child name should be string")
    .isLength({ max: 10 })
    .withMessage("child name <10"),
  body("age")
    .isInt()
    .withMessage("Age should be Number"),
  body("level")
    .isIn(["PREKG", "KG1", "KG2"])
    .withMessage("You should select one of existed levels"),
  body("address.city")
    .isString()
    .withMessage("Invalid city"),
  body("address.street")
    .isString()
    .withMessage("Invalid street"),
  body("address.building")
    .isNumeric()
    .withMessage("Invalid building")
];

exports.update = [
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

exports.delete = [
  body("_id").isInt().withMessage("Id Shoud be Number"),
]
