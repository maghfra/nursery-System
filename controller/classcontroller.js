const Class = require("./../model/classmodel");

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

exports.addclass=(request,response,next)=>{
    let object = new Class({
        _id:request.body._id,
        name: request.body.name,
        supervisor: request.body.supervisor,
        children: request.body.children
    })
    object.save()
    .then(data=>{
        response.status(200).json({message:"added",data})
    })
    .catch(error=>{
        next(error)
    })
    //response.status(200).json({data:"added"});
};


exports.updateclass=(request,response,next)=>{
    Class.updateOne({_id:request.body._id},{
        $set: {
        _id:request.body._id,
        name: request.body.name,
        supervisor: request.body.supervisor,
        children: request.body.children
        }
    })
    .then(data => {
        if (data == null) {
            throw new Error("Class not found");
        }
        response.status(200).json({ message: "Updated", data});
    })
    .catch(error => {
        next(error);
    });

    //response.status(200).json({data:"update"});
    
};


exports.deleteclass=(request,response,next)=>{
    Class.deleteOne({_id:request.body._id})
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






