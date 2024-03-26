const express = require("express");
const router = express.Router();
const controller = require("./../controller/teachercontroller");
const Validator = require("../midelwares/validations/teacherValidator");
const validatonResult= require("./../midelwares/validations/resultvaildation")
const isAuth = require("../midelwares/authMW")

router
    .route("/teachers")
    .all(isAuth)
    .get(isAuth.checkAdmin, controller.getAllTeacher)
    .post(isAuth.checkAdminOrTeacher, Validator.post, validatonResult, controller.addteacher)
    .patch(isAuth.checkAdminOrTeacher, Validator.update, validatonResult, controller.updateteacher)
    .delete(isAuth.checkAdmin, Validator.delete, validatonResult, controller.deleteteacher)

router.route("/teachers/supervisors").get(isAuth.checkAdmin, controller.getAllSupervisors);
router.route("/teachers/:_id").get(isAuth.checkAdminOrTeacher, controller.getTeacherById);

module.exports = router;