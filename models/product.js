var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    "name" : String,
    "price" : Number,
    "description" : String,
    "category" : String,
    "numberOfMeals" : Number,
    "set" : Boolean,
    "image" : String
});



// models
module.exports = mongoose.model("web322_products",productSchema);