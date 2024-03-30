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
 *   post:
 *     summary: Add a new class
 *     description: Add a new class to the system.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/class'
 *     responses:
 *       "201":
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/class'
 *       "400":
 *         description: Bad request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *   
 *   
 * 
 * /class/child/{_id}:
 *   get:
 *     summary: Retrieve children information of a class
 *     description: Retrieve information about children belonging to a specific class by class ID.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the class to retrieve children information.
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/child'
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 * 
 * /class/teacher/{_id}:
 *   get:
 *     summary: Retrieve supervisor information of a class
 *     description: Retrieve information about the supervisor of a specific class by class ID.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the class to retrieve supervisor information.
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
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
 *   patch:
 *     summary: Update a class
 *     description: Update an existing class in the system.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the child to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/class'
 *     responses:
 *       "200":
 *         description: Class updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/class'
 *       "400":
 *         description: Bad request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *   delete:
 *     summary: Delete a class
 *     description: Delete an existing class from the system.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the child to delete.
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Teacher deleted successfully
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 */

router.route("/class")
    .all(isAuth, isAuth.checkAdmin)
    .get(controller.getAllCkasses)
    .post(Validator.post, validatonResult, controller.addclass)
    
    

router.route("/class/child/:_id").get(controller.childreninfo);
router.route("/class/teacher/:_id").get(controller.supervisorinfo);
router
    .route("/class/:_id")
    .all(isAuth, isAuth.checkAdmin)
    .get(controller.getClassById)
    .patch(Validator.update, validatonResult, controller.updateclass)
    .delete(Validator.delete, validatonResult, controller.deleteclass)
module.exports = router;
