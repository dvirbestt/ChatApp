const mongoose = require("mongoose");

const User = mongoose.model("User",{
    username : {
        type: String,
        required: true,
        
    },
    password : {
        type: String,
        required: true,
        
    },
    role: {
        type: String,
        required: true,
        default : "User"
    }
})


module.exports = User;
