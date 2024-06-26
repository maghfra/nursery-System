const { request, response } = require("express");
const teacher = require("./../model/teachermodel");
const Class = require("./../model/classmodel");
const bcrypt = require("bcryptjs")

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
        fullname:request.body.fullname,
        password:request.body.password,
        email:request.body.email,
        image:request.file.filename,
        isSupervisor:request.body.isSupervisor,
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

exports.updateteacher= async (request,response,next)=>{
    // teacher.updateOne(
    //     {_id:request.params._id},
    //     {
    //         $set:{
    //             fullname:request.body.fullname,
    //             password:request.body.password,
    //             email:request.body.email,
    //             image:request.body.image
    //         }
    //     }
    // )
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        // Find and update the teacher
        const updatedTeacher = await teacher.findByIdAndUpdate(
            request.params._id,
            {
                $set: {
                    fullname: request.body.fullname,
                    email: request.body.email,
                    password: hashedPassword,
                    image: request.body.image
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedTeacher) {
            throw new Error("Teacher not found..!");
        }

        response.status(200).json({ message: "Updated..!", data: updatedTeacher });
    } catch (error) {
        next(error);
    }
};

exports.changepassword= async (request,response,next)=>{
        try {
            // Hash the password 
            const hashedPassword = await bcrypt.hash(request.body.password, 10);
            // Update the document in MongoDB with the hashed password
            const updatedTeacher = await teacher.findByIdAndUpdate(request.params._id, {
                $set: {
                    password: hashedPassword, 
                }
            });
            if (!updatedTeacher) {
                throw new Error("Teacher not found..!");
            }
            response.status(200).json({ message: "Updated..!", data: updatedTeacher });
        } catch (error) {
            next(error);
        }
     
}

exports.deleteteacher = async (request, response, next) => {
    try {
        const teacherId = request.params._id;

        // Check if the teacher is a supervisor in any class
        const supervisorClasses = await Class.find({ supervisor: teacherId });

        if (supervisorClasses.length > 0) {
            // If the teacher is a supervisor in any class
            // Assign a default supervisor to those classes
            const defaultSupervisorId = "9905e1d5aba24ed841f6fe52"; 
            const updatePromises = supervisorClasses.map(async (classObj) => {
                classObj.supervisor = defaultSupervisorId;
                await classObj.save();
            });
            await Promise.all(updatePromises);
        }

        // Delete the teacher
        const deletedTeacher = await teacher.findByIdAndDelete(request.params._id);

        if (!deletedTeacher) {
            throw new Error("Teacher not found...!");
        }
        response.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
        next(error);
    }
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



