const Class = require("./../model/classmodel");
const teacher = require("./../model/teachermodel")
const Child = require("./../model/childmodel")

exports.getAllCkasses=(request,response,next)=>{
    Class.find({})
    .then(data=>{
        response.status(200).json(data);
    })
    .catch(error=>{
        next(error);
    })
    //response.status(200).json({ data: [] });
};

exports.getClassById=(request,response,next)=>{
    Class.findOne({_id:request.params._id})
    .then(data=>{
        if(data == null)
        throw new Error("class not found..!")
    response.status(200).json({message:"found..!",data})
    })
    .catch(error=>{
        next(error)
    })
};



exports.addclass = async (request, response, next) => {
    try {
        // Check if the supervisor exists in the database
        const supervisorExists = await teacher.exists({ _id: request.body.supervisor });
        if (!supervisorExists) {
            throw new Error("Supervisor not found");
        }

        // Check if all children exist in the database
        const childrenExist = await Promise.all(request.body.children.map(async (childId) => {
            const exists = await Child.exists({ _id: childId });
            return exists !== null && exists !== undefined; 
        }));
        if (childrenExist.includes(false)) {
            throw new Error("One or more children not found");
        }
        

        let object = new Class({
            _id: request.body._id,
            name: request.body.name,
            supervisor: request.body.supervisor,
            children: request.body.children
        });

        const savedClass = await object.save();
        response.status(200).json({ message: "Class added", data: savedClass });
    } catch (error) {
        next(error);
    }
}
;


exports.updateclass = async (request, response, next) => {
    try {
        // Check if the supervisor exists in the database
        const supervisorExists = await teacher.exists({ _id: request.body.supervisor });
        if (!supervisorExists) {
            throw new Error("Supervisor not found");
        }
        // Check if all children exist in the database
        const childrenExist = await Promise.all(request.body.children.map(async (childId) => {
            const exists = await Child.exists({ _id: childId });
            return exists !== null && exists !== undefined; 
        }));
        if (childrenExist.includes(false)) {
            throw new Error("One or more children not found");
        }
        const updatedClass = await Class.findOneAndUpdate(
            { _id: request.params._id },
            {
                $set: {
                    name: request.body.name,
                    supervisor: request.body.supervisor,
                    children: request.body.children
                }
            },
            { new: true } // To return the updated document
        );
        if (!updatedClass) {
            throw new Error("Class not found");
        }
        response.status(200).json({ message: "Class updated", data: updatedClass });
    } catch (error) {
        next(error);
    }
};


exports.deleteclass=(request,response,next)=>{
    Class.deleteOne({_id:request.params._id})
    .then(data=>{
        if(data == null)
        throw new Error ("class not found...!")
    response.status(200).json({message:"deleted"})
    })
    .catch(error=>{
        next(error);
    })
    // response.status(200).json({data:"delete"});
};


exports.childreninfo =(request,response,next)=>{
    Class.findById(request.params._id)
    .populate("children")
    .then(data=>{
        if(data == null)
        throw new Error ("class not found...!")
    response.status(200).json({message:"retrevied",data})
    })
    .catch(error=>{
        next(error);
    })
    // response.status(200).json({ data: [] });
};


exports.supervisorinfo=(request,response,next)=>{
    Class.findById(request.params._id)
    .populate("supervisor")
    .then(data=>{
        if(data == null)
        throw new Error ("class not found...!")
    response.status(200).json({message:"retrevied",data})
    })
    .catch(error=>{
        next(error);
    })
   // response.status(200).json({ data: [] });
};






