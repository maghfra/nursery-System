const express = require("express");
const router = express.Router();
const controller = require("./../controller/childcontroller")
const Validator = require("../midelwares/validations/childvalidatir");
const validatonResult= require("./../midelwares/validations/resultvaildation")
const isAuth = require("../midelwares/authMW")

router
    .route("/child")
    .all(isAuth, isAuth.checkAdmin)
    .get(controller.getAllChildren)
    .post(Validator.post, validatonResult, controller.addchild)
    .patch(Validator.update, validatonResult, controller.updatechild)
    .delete(Validator.delete,validatonResult, controller.deletechild)

router.route("/child/:_id").get(controller.getChildById)    
module.exports = router;    