const jwt = require("jsonwebtoken");

module.exports = (request,response,next)=>{
    try{
        const token = request.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);
        request.id = decodedToken.id;
        request.role = decodedToken.role;
        console.log(request.role)
        next();
    }catch(error){
        error.status=401;
        error.message="Unauthorized";
        next(error);
    }
}

module.exports.checkAdmin = (request,response,next)=>{
    if(request.role == "admin"){
        next();
    }else{
        let error = new Error("Not Allowed");
        error.status=403;
        next(error);
    }
}

module.exports.checkAdminOrTeacher = (request,response,next)=>{
    if(request.role == "admin" || request.role == "teacher"){
        next();
    }else{
        let error = new Error("Not Allowed");
        error.status=403;
        next(error);
    }
}