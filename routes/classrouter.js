const express = require("express");
const router = express.Router();
const controller = require("./../controller/classcontroller");
const { insertValidator } = require("./../midelwares/validations/classvaildation/classvaildator");
const { updateValidator } = require("./../midelwares/validations/classvaildation/updatevaildator");
const validatonResult = require("./../midelwares/validations/resultvaildation");
const isAuth = require("../midelwares/authMW")

router.route("/class")
    .all(isAuth, isAuth.checkAdmin)
    .get(controller.getAllCkasses)
    .post(insertValidator, validatonResult, controller.addclass)
    .patch(updateValidator, validatonResult, controller.updateclass)
    .delete(controller.deleteclass)

router.route("/class/child/:_id").get(controller.childreninfo);
router.route("/class/teacher/:_id").get(controller.supervisorinfo);
router.route("/class/:_id").get(controller.getClassById);
module.exports = router;
