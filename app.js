const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const mongoose = require("mongoose");
const dot_env = require("dotenv").config();
const multer= require("multer");
const path= require("path");

//routes

const teacherRoute=require("./routes/teacherrouter");
const childRoute=require("./routes/childrouter")
const classRoute=require("./routes/classrouter")
const loginRoute=require("./routes/authenticatin");
const authMW = require("./midelwares/authMW");

//open sever
const server=express();
//determine port
const port = process.env.PORT|| process.env.portNumber;

//connect to db
mongoose.connect(process.env.DBurl)
        .then(()=>{
            console.log("DB connect...!");
            server.listen(port,()=>{
                console.log("iam listinig...");
            });
        })
        .catch((error) => {
            console.log("DB Problem ..." + error);
        });



//using cors
server.use(cors())

// first MW
// server.use((request,response,next)=>{
//     console.log(request.url,request.method);
//     response.json({data:"hello"});

// });

server.use(morgan('dev'));
//using cors
server.use(cors())

server.get("/nurserySystem", (request, response) => {
    response.json({link: request.url, method: request.method});
});

//endpionts
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/images", express.static(path.join(__dirname, "./images")))
server.use(loginRoute);
server.use(authMW);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);

// Not Found
server.use((request,response)=>{
    response.status(404).json({data:"Not Found"});
});


// Error MW
server.use((error,request,response,next)=>{
    response.status(500).json({data:`Error MW ${error}`})
});


