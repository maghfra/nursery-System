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
 * 
 * 
 */
router
    .route("/child")
    .all(isAuth, isAuth.checkAdmin)
    .get(controller.getAllChildren)
    .post(Validator.post, validatonResult, controller.addchild)
    .patch(Validator.update, validatonResult, controller.updatechild)
    .delete(Validator.delete,validatonResult, controller.deletechild)

/**
 * @swagger
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
 */
router.route("/child/:_id").get(controller.getChildById)    
module.exports = router;    