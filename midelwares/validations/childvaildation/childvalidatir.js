const { body } = require("express-validator");

exports.insertValidator = [
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
