const { body} = require("express-validator");
const teacher = require("./../../model/teachermodel")

const bcrypt = require("bcryptjs");
exports.post = [
    body("_id")
        .isMongoId()
        .withMessage("teacher id should be a valid ObjectId"),
    body("fullname")
        .isString()
        .withMessage("teacher name should be string")
        .isLength({ max: 10 })
        .withMessage("teacher name <10"),
    body("password")
        .isLength({ min: 2 }) 
        .withMessage("password should be at least 8 characters long")
        .matches(/\d/)
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

exports.update = [
    body("_id").isMongoId()
      .withMessage("teacher id should be a valid ObjectId"),
    body("fullname")
      .optional()
      .isString()
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

exports.delete = [
    body("_id").isMongoId().withMessage("teacher id should be a valid ObjectId"),
];

exports.changepassvalidation = [

  (req, res, next) => {
    console.log("Request Body:", req.body);
    console.log("Request Params:", req.params._id);
    next();
},
  body("currentpassword").notEmpty().withMessage("current password required"),
  body("password").notEmpty().withMessage("new password required")
      .custom(async (val, { req }) => {
          
              const user = await teacher.findById(req.params._id) // Change to req.body._id
              if (!user) {
                  throw new Error("There is no teacher with this id");
              }
              
              const isCorrectPassword = await bcrypt.compare(req.body.currentpassword, user.password);
              if (!isCorrectPassword) {
                  throw new Error("Incorrect current password");
              }
              if (val !== req.body.confirmpassword){
                throw new Error("Incorrect confirm password");
              }
              return true;
      }),

  body("confirmpassword").notEmpty().withMessage("confirm password required")
];

 