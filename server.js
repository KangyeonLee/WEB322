require('dotenv').config()
const express = require("express");
const exphbs = require("express-handlebars");
var session = require('express-session')
const fileUpload = require('express-fileupload')

const mongoose = require("mongoose");

// connect mongo
const uri = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(uri,{useNewUrlParser: true});

const app = express();
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'gangyeonlee',
    resave: true,
    saveUninitialized: true
}));


app.use(bodyParser.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static("public"))
app.use(fileUpload())


const generalController = require("./controllers/general.js")
const productController = require("./controllers/product.js")
const userController = require("./controllers/user.js")
const accountController = require("./controllers/account.js")

app.use("/",generalController)
app.use("/product",productController)
app.use("/user",userController)
app.use("/account",accountController)


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Running web server");

});