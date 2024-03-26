const express = require("express");
const router = express.Router();
const controller = require("./../controller/teachercontroller");
const {insertValidator} = require("./../midelwares/validations/teachervalidations/teacherValidator");
const {updateValidator} = require("./../midelwares/validations/teachervalidations/updatevalidator");
const validatonResult= require("./../midelwares/validations/resultvaildation")
const isAuth = require("../midelwares/authMW")

router
    .route("/teachers")
    .get(isAuth.checkAdmin, controller.getAllTeacher)
    .post(isAuth.checkAdminOrTeacher, insertValidator, validatonResult, controller.addteacher)
    .patch(isAuth.checkAdminOrTeacher, updateValidator, validatonResult, controller.updateteacher)
    .delete(isAuth.checkAdmin, controller.deleteteacher)

router.route("/teachers/supervisors").get(isAuth.checkAdmin, controller.getAllSupervisors);
router.route("/teachers/:_id").get(isAuth.checkAdminOrTeacher, controller.getTeacherById);

module.exports = router;