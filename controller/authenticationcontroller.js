const mongoose = require("mongoose");
const teacherSchema = require("./../model/teachermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = (request, response, next) => {
    teacherSchema.findOne({ email: request.body.email })
        .then(teachers => {
            if (!teachers) {
                throw new Error("Wrong email or password");
            }
            // If email exists, compare passwords
            return bcrypt.compare(request.body.password, teachers.password)
                .then(result => {
                    if (!result) {
                        throw new Error("Wrong email or password");
                    } else {
                        if (teachers._id.toString() === "9905e1d5aba24ed841f6fe52") {
                            console.log("User is an admin");
                            request.role = "admin";
                        } else {
                            console.log("User is a teacher");
                            request.role = "teacher";
                        }
                        let token = jwt.sign(
                            { id: teachers._id, role: request.role },
                            process.env.SECRETKEY,
                            { expiresIn: "24h" }
                        );
                        response.status(200).json({ token: token, "message": "Authorized" });
                    }
                });
        })
        .catch(error => {
            error.status = 401;
            next(error);
        });
}
