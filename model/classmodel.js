const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    _id:Number,
    name: {
        type: String,
        unique: true
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId, ref: "teachers"
    },
    children: [{
        type: Number, ref: "children"
    }],
});
schema.plugin(AutoIncrement, { id: 'class_counter' });

module.exports = mongoose.model("classes", schema);
