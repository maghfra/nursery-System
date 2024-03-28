const express = require("express");
const router = express.Router();
const controller = require("./../controller/classcontroller");
const Validator = require("./../midelwares/validations/classvaildator");
const validatonResult = require("./../midelwares/validations/resultvaildation");
const isAuth = require("../midelwares/authMW")

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API endpoint to manage Classes
 */

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Retrieve all classes
 *     description: Retrieve a list of all classes.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/class'
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 */
router.route("/class")
    .all(isAuth, isAuth.checkAdmin)
    .get(controller.getAllCkasses)
    .post(Validator.post, validatonResult, controller.addclass)
    .patch(Validator.update, validatonResult, controller.updateclass)
    .delete(Validator.delete, validatonResult, controller.deleteclass)

router.route("/class/child/:_id").get(controller.childreninfo);
router.route("/class/teacher/:_id").get(controller.supervisorinfo);
/**
 * @swagger
 * /class/{_id}:
 *   get:
 *     summary: Retrieve a class by ID
 *     description: Retrieve a class's details by its ID.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the class to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/class'
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 */
router.route("/class/:_id").get(controller.getClassById);
module.exports = router;
