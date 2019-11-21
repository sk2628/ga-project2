const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dietSchema = new Schema(
    {  
        foodName: { type: String },
        foodDescription: { type: String },
        image: { type: String },
        calories: { type: Number },
        consumeTime: { type: Date, default: Date.now },
        userID: {type: Object},
        user: { type: Schema.Types.ObjectId, ref: "User" }
    },
    {
        timestamps: true
    }
)

const Diet = mongoose.model('Diet', dietSchema);

module.exports = Diet;