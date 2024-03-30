const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("./../controller/teachercontroller");
const Validator = require("../midelwares/validations/teacherValidator");
const validatonResult = require("./../midelwares/validations/resultvaildation");
const isAuth = require("../midelwares/authMW");

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
 *   name: Teachers
 *   description: API endpoint to manage teachers
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Retrieve all teachers
 *     description: Retrieve a list of all teachers.
 *     tags: [Teachers]
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
 *                 $ref: '#/components/schemas/Teacher'
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *   post:
 *     summary: Add a new teacher
 *     description: Add a new teacher to the system.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       "200":
 *         description: Teacher added successfully
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 * 
 *  
 *   
 * 
 * /teachers/supervisors:
 *   get:
 *     summary: Retrieve all supervisors
 *     description: Retrieve a list of all supervisors.
 *     tags: [Teachers]
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
 *                 $ref: '#/components/schemas/Teacher'
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 * 
 * /teachers/{_id}:
 *   get:
 *     summary: Retrieve a teacher by ID
 *     description: Retrieve a teacher's details by its ID.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the teacher to retrieve.
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
 *   patch:
 *     summary: Update a teacher's information
 *     description: Update a teacher's information in the system.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the teacher to update his info.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       "200":
 *         description: Teacher updated successfully
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *   delete:
 *     summary: Delete a teacher
 *     description: Delete a teacher from the system.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the teacher to delete.
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Teacher deleted successfully
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 * 
 * /teachers/changepassword/{_id}:
 *   patch:
 *     summary: Change password for a teacher
 *     description: Change password for a specific teacher identified by ID.
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the teacher to change password for
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentpassword:
 *                 type: string
 *                 description: The current password of the teacher.
 *               password:
 *                 type: string
 *                 description: The new password for the teacher.
 *               confirmpassword:
 *                 type: string
 *                 description: Confirm the new password for the teacher.
 *             required:
 *               - currentpassword
 *               - password
 *               - confirmpassword
 *     responses:
 *       "200":
 *         description: Password changed successfully
 *       "400":
 *         description: Bad request. Invalid input data.
 *       "401":
 *         description: Unauthorized. User is not authenticated.
 *       "403":
 *         description: Forbidden. User does not have permission to change password.
 *       "404":
 *         description: Teacher not found.
 */

router
    .route("/teachers")
    .all(isAuth)
    .get(isAuth.checkAdmin, controller.getAllTeacher)
    .post(isAuth.checkAdminOrTeacher,upload.single('image'), Validator.post, validatonResult, controller.addteacher)
    
//change password endpoint     
router.patch("/teachers/changepassword/:_id",Validator.changepassvalidation,validatonResult, controller.changepassword);
//get all seupervisors
router.route("/teachers/supervisors").get(isAuth.checkAdmin, controller.getAllSupervisors);
// get teacher by id
router
.route("/teachers/:_id")
.all(isAuth)
.get(isAuth.checkAdminOrTeacher, controller.getTeacherById)
.patch(isAuth.checkAdminOrTeacher,upload.single('image'), Validator.update, validatonResult, controller.updateteacher)
.delete(isAuth.checkAdmin, Validator.delete, validatonResult, controller.deleteteacher)

module.exports = router;