const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const addressSchema = new mongoose.Schema(
    {
        city: String,
        street: String,
        building: Number,
    },
    { _id: false }
);

const schema = new mongoose.Schema({
    _id: Number,
    fullName: String,
    age: { type: Number, min: 2, max: 11 },
    level: { type: String, enum: ["PREKG", "KG1", "KG2"] },
    address: addressSchema,
});
schema.plugin(AutoIncrement, { inc_field: '_id' });

module.exports = mongoose.model("children", schema);
