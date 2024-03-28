const express = require("express");
const router = express.Router();
const controller = require("./../controller/childcontroller")
const Validator = require("../midelwares/validations/childvalidatir");
const validatonResult= require("./../midelwares/validations/resultvaildation")
const isAuth = require("../midelwares/authMW")
/**
 * @swagger
 * tags:
 *   name: Children
 *   description: API endpoint to manage children
 */
/**
 * @swagger
 * /child:
 *   get:
 *     summary: Retrieve all children
 *     description: Retrieve a list of all children.
 *     tags: [Children]
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
 *                 $ref: '#/components/schemas/child'
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *   post:
 *     summary: Add a new child
 *     description: Add a new child to the system.
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/child'
 *     responses:
 *       "201":
 *         description: Child created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/child'
 *       "400":
 *         description: Bad request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *   patch:
 *     summary: Update a child
 *     description: Update an existing child in the system.
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/child'
 *     responses:
 *       "200":
 *         description: Child updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/child'
 *       "400":
 *         description: Bad request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *   
 * /child/{_id}:
 *   get:
 *     summary: Retrieve a child by ID
 *     description: Retrieve a child's details by its ID.
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the child to retrieve.
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
 *   delete:
 *     summary: Delete a child
 *     description: Delete an existing child from the system.
 *     tags: [Children]
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

router
    .route("/child")
    .all(isAuth, isAuth.checkAdmin)
    .get(controller.getAllChildren)
    .post(Validator.post, validatonResult, controller.addchild)
    .patch(Validator.update, validatonResult, controller.updatechild)
    
router
.route("/child/:_id")
.get(isAuth,isAuth.checkAdmin,controller.getChildById)
.delete(Validator.delete,validatonResult, controller.deletechild)    
module.exports = router;    