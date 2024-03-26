const teacher = require("./../model/teachermodel");
exports.getAllTeacher=(request,response,next)=>{
    teacher.find({})
    .then((data)=>{
        response.status(200).json(data);
    })
    .catch(error=>{
        next(error);
    })
    //console.log(request.query);
    //console.log(request.params);
    // response.status(200).json({ data: [] });
};

exports.getTeacherById=(request,response,next)=>{
    teacher.findById(request.params._id)
            .then(data=>{
                if(data == null)
                throw new Error("teacher not found..!")
            response.status(200).json({message:"found..!",data})
            })
            .catch(error=>{
                next(error)
            })
    // response.status(200).json({ data: request.params });
};

exports.addteacher=(request,response,next)=>{
    let object = new teacher({
        _id:request.body._id,
        fullname:request.body.fullname,
        password:request.body.password,
        email:request.body.email,
        image:request.body.image,
        isSupervisor:request.body.isSupervisor,
        role:request.body.role
    })
    object.save()
        .then(data => {
            response.status(200).json({message:"added",data});
        })
        .catch(error=>{
            next(error);
        })
    // response.status(200).json({data:"added"});
};

exports.updateteacher=(request,response,next)=>{
    // teacher.updateOne(
    //     {_id:request.body._id},
    //     {
    //         $set:{
    //             fullname:request.body.fullname,
    //             password:request.body.password,
    //             email:request.body.email,
    //             image:request.body.image
    //         }
    //     }
    // )
    teacher.findByIdAndUpdate(request.body._id,{
        $set:{
            fullname:request.body.fullname,
            password:request.body.password,
            email:request.body.email,
            image:request.body.image
        }
    })
    .then(data=>{
        if(data==null)
        throw new Error("teacher not found..!")
    response.status(200).json({message:"updated..!",data})
    })
    .catch(error=>{
        next(error);
    })
    // response.status(200).json({data:"update"});
};
exports.deleteteacher=(request,response,next)=>{
    teacher.findByIdAndDelete(request.body._id)
            .then(data=>{
                if(data == null)
                throw new Error ("teacher not found...!")
            response.status(200).json({message:"deleted"})
            })
            .catch(error=>{
                next(error);
            })
    // response.status(200).json({data:"delete"});
};


exports.getAllSupervisors =(request,response,next)=>{
    teacher.find({isSupervisor: 'supervisor' })
    .then((data)=>{
        response.status(200).json(data);
    })
    .catch(error=>{
        next(error);
    })
    // response.status(200).json({ data: [] });
};



