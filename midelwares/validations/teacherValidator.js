const { body} = require("express-validator");
const teacher = require("./../../model/teachermodel")
const bcrypt = require("bcryptjs");

//insert new teacher
exports.post = [
    body("_id")
        .isMongoId()
        .withMessage("teacher id should be a valid ObjectId")
        .custom(async (value) => {
          const existingTeacher = await teacher.findById(value);
          if (existingTeacher) {
              throw new Error('ID already exists');
          }
          return true;
      }),
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
        .withMessage("email should be string")
        .custom(async (value, { req }) => {
          const existingTeacher = await teacher.findOne({ email: value });
          if (existingTeacher && existingTeacher._id.toString() !== req.body._id) {
              throw new Error('Email already exists');
          }
          return true;
        }),
        (request, response, next) => {
          if (!request.file) {
              return next(new Error('Image is required'));
          }
          return next();
      },
];

// update teacher info
exports.update = [
    body("_id").isMongoId()
      .withMessage("teacher id should be a valid ObjectId")
      .custom(async (value, { req }) => {
        const existingTeacher = await teacher.findOne({ _id: value });
        if (!existingTeacher) {
            throw new Error('Teacher with this ID does not exist');
        } else {
            if (existingTeacher._id.toString() !== req.body._id) {
                throw new Error('Another teacher with this ID already exists');
            }
        }
        return true;
    }),
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
        .matches(/\d/) 
        .withMessage("password should contain at least one digit"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("email should be string")
      .custom(async (value, { req }) => {
        const existingTeacher = await teacher.findOne({ email: value });
        if (existingTeacher && existingTeacher._id.toString() !== req.body._id) {
            throw new Error('Email already exists');
        }
        return true;
      }),
];

//delete teacher
exports.delete = [
    body("_id").isMongoId().withMessage("teacher id should be a valid ObjectId")
    .custom(async (value, { req }) => {
      const existingTeacher = await teacher.findOne({ _id: value });
      if (!existingTeacher) {
          throw new Error('Teacher with this ID does not exist');
      }
    }),
];

// change password
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

 