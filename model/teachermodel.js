const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const schema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    fullname: String,
    password: String,
    email:{
        type: String,
        unique: true
    },
    image: String,
    isSupervisor: { type: String, enum: ['supervisor', 'teacher'], default: 'teacher' },
    // role: { type: String, enum: ['admin', 'teacher'], default: 'teacher' }
});

schema.pre('save', async function(next){
    this.password=await bcrypt.hash(this.password,10);
    next();
})
module.exports = mongoose.model("teachers", schema);
