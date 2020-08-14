var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    "firstName" : String,
    "lastName" : String,
    "email" : String,
    "password" : String,
    "isAdmin" : Boolean,
    "cart" : [String]
});



// models
module.exports = mongoose.model("web322_users",userSchema);