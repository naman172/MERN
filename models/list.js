const mongoose = require("mongoose")

var listSchema = new mongoose.Schema({
    title: String,
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
    }]
});

var List = mongoose.model("List", listSchema);

module.exports = List;