const mongoose = require("mongoose")

var boardSchema = new mongoose.Schema({
    title: String,
    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }]
});

var Board = mongoose.model("Board", boardSchema);

module.exports = Board;