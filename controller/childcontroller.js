const child = require("./../model/childmodel")

exports.getAllChildren=(request,response,next)=>{
    child.find({})
    .then((data)=>{
        response.status(200).json(data);
    })
    .catch(error=>{
        next(error);
    })
    // response.status(200).json({ data: [] });
};

exports.getChildById=(request,response,next)=>{
    child.findOne({_id:request.params.id})
    .then(data=>{
        if(data == null)
        throw new Error("child not found..!")
    response.status(200).json({message:"found..!",data})
    })
    .catch(error=>{
        next(error)
    })
    // response.status(200).json({ data: request.params });
};

exports.addchild=(request,response,next)=>{
    let object = new child({
        fullName:request.body.fullName,
        age:request.body.age,
        level:request.body.level,
        address:{
            city:request.body.address.city,
            street:request.body.address.street,
            building:request.body.address.building
        }
    })
    object.save()
        .then(data=>{
            response.status(200).json({message:"added",data});
        })
        .catch(error=>{
            next(error);
        })
    //response.status(200).json({data:"added"});
};

exports.updatechild = (request, response, next) => {
    child.updateOne({_id:request.body._id},{
        $set: {
            fullName:request.body.fullName,
        age:request.body.age,
        level:request.body.level,
        address:{
            city:request.body.address.city,
            street:request.body.address.street,
            building:request.body.address.building
        }
        }
    })
    .then(data => {
        if (data == null) {
            throw new Error("Child not found");
        }
        response.status(200).json({ message: "Updated", data});
    })
    .catch(error => {
        next(error);
    });
};

exports.deletechild=(request,response,next)=>{
    child.deleteOne({_id:request.body._id})
    .then(data=>{
        if(data == null)
        throw new Error ("child not found...!")
    response.status(200).json({message:"deleted"})
    })
    .catch(error=>{
        next(error);
    })
    // response.status(200).json({data:"delete"});
};




