const mongoose = require("mongoose");
const teacherSchema = require("./../model/teachermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = (request, response, next) => {
    teacherSchema.findOne({ email: request.body.email })
        .then(teacher => {
            if (!teacher)
                throw new Error("User not found");

            // Compare passwords
            return bcrypt.compare(request.body.password, teacher.password)
                .then(isMatch => {
                    if (!isMatch)
                        throw new Error("Wrong email or password");

                    let role = teacher._id === "9905e1d5aba24ed841f6fe52" ? "admin" : "teacher";

                    // Generate token
                    let token = jwt.sign(
                        { id: teacher._id, role },
                        process.env.SECRETKEY,
                        { expiresIn: "24h" }
                    );
                    response.status(200).json({ token: token, message: "Authorized" });
                });
        })
        .catch(error => {
            error.status = 401;
            next(error);
        });
}
