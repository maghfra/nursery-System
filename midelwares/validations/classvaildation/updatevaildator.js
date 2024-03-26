const { body} = require("express-validator");

exports.updateValidator  = [
    body("_id")
        .isInt()
        .withMessage("id should be integer"),
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
]