const mongoose = require("mongoose")

var cardSchema = new mongoose.Schema({
    text: String
});

var Card = mongoose.model("Card", cardSchema);

module.exports = Card;