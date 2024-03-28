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
 */
router.get("/teachers", isAuth.checkAdmin, controller.getAllTeacher);

/**
 * @swagger
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
 */
router.get("/teachers/:_id", isAuth.checkAdminOrTeacher, controller.getTeacherById);
router.post("/teachers", isAuth.checkAdminOrTeacher, upload.single("image"), Validator.post, validatonResult, controller.addteacher);
router.patch("/teachers", isAuth.checkAdminOrTeacher, upload.single("image"), Validator.update, validatonResult, controller.updateteacher);
router.delete("/teachers", isAuth.checkAdmin, Validator.delete, validatonResult, controller.deleteteacher);
router.patch("/teachers/changepassword/:_id", Validator.changepassvalidation, validatonResult, controller.changepassword);
router.get("/teachers/supervisors", isAuth.checkAdmin, controller.getAllSupervisors);

module.exports = router;