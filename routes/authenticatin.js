const express = require("express");
const controller = require("./../controller/authenticationcontroller");
const router = express.Router();
const Validator = require("./../midelwares/validations/loginvaildation")

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

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
