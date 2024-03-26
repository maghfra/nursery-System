const express = require("express");
const router = express.Router();
const controller = require("./../controller/childcontroller")
const {insertValidator} = require("./../midelwares/validations/childvaildation/childvalidatir");
const {updateValidator} = require("./../midelwares/validations/childvaildation/updatevalidator");
const validatonResult= require("./../midelwares/validations/resultvaildation")
const isAuth = require("../midelwares/authMW")

router
    .route("/child")
    .all(isAuth, isAuth.checkAdmin)
    .get(controller.getAllChildren)
    .post(insertValidator, validatonResult, controller.addchild)
    .patch(updateValidator, validatonResult, controller.updatechild)
    .delete(controller.deletechild)

router.route("/child/:_id").get(controller.getChildById)    
module.exports = router;    