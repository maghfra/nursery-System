const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    _id:Number,
    name: String,
    supervisor: {
        type: mongoose.Schema.Types.ObjectId, ref: "teachers"
    },
    children: [{
        type: Number, ref: "children"
    }],
});
//schema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model("classes", schema);
