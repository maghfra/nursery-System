const express = require("express");
const controller = require("./../controller/authenticationcontroller");
const router = express.Router();
const Validator = require("./../midelwares/validations/loginvaildation")


router
   .route("/login")
   .post(Validator.post,Validator, controller.login);
// router.post("/login",controller.login);

module.exports = router;
