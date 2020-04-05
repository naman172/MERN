const mongoose = require("mongoose")

var boardSchema = new mongoose.Schema({
    title: String,
    users:[{username:String, email:String}],
    owner: {id:String, email:String},
    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }],
    inUse: Boolean,
    opLog: [{action:String, text:String, timeStamp:String}]
});

var Board = mongoose.model("Board", boardSchema);

module.exports = Board;