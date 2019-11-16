const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema(
    {  
        personName: String,
        personID: {type: Schema.Types.ObjectId, ref: "Person"}
    },
    {
        timestamps: true
    }
)

const Person = mongoose.model('Diet', personSchema);

module.exports = Person;