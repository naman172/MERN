const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    boardOnDisplay: String,
    collabReq: [{boardId:String, title:String, username:String, email:String}],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board"
    }]
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

var User = mongoose.model("User", userSchema);

module.exports = User;