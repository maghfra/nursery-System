const mongoose = require("mongoose");
const teacherSchema = require("./../model/teachermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = (request, response, next) => {
    teacherSchema.findOne({email:request.body.email})
        .then(teachers=>{
            if(teachers == null)
                throw new Error("user not found");
            let result = bcrypt.compare(request.body.password, teachers.password)
            if (!result) 
                throw new Error("Wrong email or password");
            else {
                if(teachers._id == "9905e1d5aba24ed841f6fe52"){
                request.role="admin";
                }
                else
                request.role="teacher";
                let token = jwt.sign(
                    {id:teachers._id, role:request.role}, 
                    process.env.SECRETKEY,
                    {expiresIn: "24h"}
                );
                response.status(200).json({token:token,"message":"Authorized"});
            }
        })
        .catch(error=>{
            error.status=401;
            next(error);
        });
    }
