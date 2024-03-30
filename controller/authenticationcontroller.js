const mongoose = require("mongoose");
const teacherSchema = require("./../model/teachermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.login = async (request, response, next) => {
    try {
        // Find the user by email
        const user = await teacherSchema.findOne({ email: request.body.email });

        if (!user) {
            throw new Error("Wrong email or password");
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(request.body.password, user.password);

        if (!passwordMatch) {
            throw new Error("Wrong email or password");
        }

        // Check if the user is an admin based on email and password
        const isAdmin = user.email === "admin@example.com" && request.body.password === "adminpassword1"; // Adjust as per your actual admin credentials
        
        // Assign role accordingly
        const role = isAdmin ? "admin" : "teacher";

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role },
            process.env.SECRETKEY,
            { expiresIn: "24h" }
        );

        response.status(200).json({ token, message: "Authorized" });
    } catch (error) {
        error.status = 401;
        next(error);
    }
}



exports.register = async (request, response, next) => {
    try {
        let id = request.body._id ? mongoose.Types.ObjectId(request.body._id) : new mongoose.Types.ObjectId();
        let newUser = new teacherSchema({
            _id: id,
            fullname: request.body.fullname,
            email: request.body.email,
            password: request.body.password,
            image: request.file ? request.file.filename : '',
            isSupervisor: request.body.isSupervisor || 'teacher'
        });

        const user = await newUser.save();
        response.status(200).json({ message: "User registered successfully", user });
    } catch (error) {
        if (error.code === 11000) {
            error.status = 409;
            error.message = "User with the provided email already exists.";
        }
        next(error);
    }
};
