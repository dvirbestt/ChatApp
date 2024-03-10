const mongoose = require("mongoose");

const Chat = mongoose.model("chat",{
    participentOne: String,
    participentTwo: String,
    messages : Array
})

module.exports = Chat;