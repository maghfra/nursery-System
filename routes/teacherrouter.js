const express = require ("express");
const router = express.Router();
const multer= require("multer");
const path= require("path");
const controller = require("./../controller/teachercontroller");
const Validator = require("../midelwares/validations/teacherValidator");
const validatonResult= require("./../midelwares/validations/resultvaildation")
const isAuth = require("../midelwares/authMW")


//upload image to mongodb
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "./../images"));
    },
    filename:(req,file,cb) => {
        let finalName = new Date().toLocaleDateString().replace(/\//g, "_") + "_" + file.originalname;
            cb(null, finalName);
    }
});
const fileFilter= (request, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error("file should be Image only."));
    }
}

const upload=multer({storage,fileFilter});

router
    .route("/teachers")
    .all(isAuth)
    .get(isAuth.checkAdmin, controller.getAllTeacher)
    .post(isAuth.checkAdminOrTeacher,upload.single('image'), Validator.post, validatonResult, controller.addteacher)
    .patch(isAuth.checkAdminOrTeacher,upload.single('image'), Validator.update, validatonResult, controller.updateteacher)
    .delete(isAuth.checkAdmin, Validator.delete, validatonResult, controller.deleteteacher)
//change password endpoint     
router.patch("/teachers/changepassword/:_id",Validator.changepassvalidation,validatonResult, controller.changepassword);
//get all seupervisors
router.route("/teachers/supervisors").get(isAuth.checkAdmin, controller.getAllSupervisors);
// get teacher by id
router.route("/teachers/:_id").get(isAuth.checkAdminOrTeacher, controller.getTeacherById);

module.exports = router;