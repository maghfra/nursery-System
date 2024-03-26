const { body} = require("express-validator");
const user = require("./../../../controller/teachercontroller")
exports.insertValidator = [
    body("_id")
        .isMongoId()
        .withMessage("teacher id should be a valid ObjectId"),
    body("fullname")
        .isAlpha()
        .withMessage("teacher name should be string")
        .isLength({ max: 10 })
        .withMessage("teacher name <10"),
    body("password")
        .isLength({ min: 2 }) 
        .withMessage("password should be at least 8 characters long")
        .matches(/\d/) // Password should contain at least one digit
        .withMessage("password should contain at least one digit"),
    body("email")
        .notEmpty()
        .withMessage("email required")
        .isEmail()
        .withMessage("email should be string"),
    body("image")
        .isString()
        .withMessage("image should be string")
];