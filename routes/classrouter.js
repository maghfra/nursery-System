const express = require("express");
const router = express.Router();
const controller = require("./../controller/classcontroller");
const Validator = require("./../midelwares/validations/classvaildator");
const validatonResult = require("./../midelwares/validations/resultvaildation");
const isAuth = require("../midelwares/authMW")

router.route("/class")
    .all(isAuth, isAuth.checkAdmin)
    .get(controller.getAllCkasses)
    .post(Validator.post, validatonResult, controller.addclass)
    .patch(Validator.update, validatonResult, controller.updateclass)
    .delete(Validator.delete, validatonResult, controller.deleteclass)

router.route("/class/child/:_id").get(controller.childreninfo);
router.route("/class/teacher/:_id").get(controller.supervisorinfo);
router.route("/class/:_id").get(controller.getClassById);
module.exports = router;
