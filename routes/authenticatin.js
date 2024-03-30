const express = require("express");
const controller = require("./../controller/authenticationcontroller");
const router = express.Router();
const Validator = require("./../midelwares/validations/loginvaildation")
const multer = require("multer");
const path = require("path");

//upload image to mongodb
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, path.join(__dirname, "./../images"));
   },
   filename: (req, file, cb) => {
     let finalName =
       new Date().toLocaleDateString().replace(/\//g, "_") +
       "_" +
       file.originalname;
     cb(null, finalName);
   },
 });
 const fileFilter = (request, file, cb) => {
   if (
     file.mimetype == "image/png" ||
     file.mimetype == "image/jpg" ||
     file.mimetype == "image/jpeg"
   ) {
     cb(null, true);
   } else {
     cb(new Error("file should be Image only."));
   }
 };
 
 const upload = multer({ storage, fileFilter });

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with provided credentials.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The full name of the user.
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The profile image of the user (optional).
 *     responses:
 *       "200":
 *         description: User registered successfully
 *       "400":
 *         description: Bad request. Invalid input data.
 *       "409":
 *         description: Conflict. User with the provided email already exists.
 */

router
   .route("/register")
   .post(upload.single('image'), controller.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate user credentials and generate a token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       "200":
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The authentication token.
 *                 message:
 *                   type: string
 *                   description: A message indicating successful authorization.
 *       "401":
 *         description: Unauthorized - Invalid email or password
 */

// Your login controller function code here

router
   .route("/login")
   .post(Validator.post,Validator, controller.login);
// router.post("/login",controller.login);




module.exports = router;
