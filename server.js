const express = require("express");
const exphbs = require("express-handlebars");

const product = require("./models/product");

const app = express();

var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static("public"))

app.get("/",(req,res)=>{
    let data = product.getAllProducts();
    res.render("index", {
        title: "Home Page",
        data:data
    })
});

app.get("/contactUs",(req,res)=>{
    res.render("general/contactUs")
});

app.post("/contactUs",(req,res)=>{
    const {firstName, lastName, email, message} = req.body;
    console.log(req.body);
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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")
    const msg = {
        to: `${email}`,
        from: `glee73@myseneca.ca`,
        subject: 'Contact Us Form Submit',
        text: 'and easy to do anywhere, evevn with Node.js',
        html: 
            `Visitor's Full Name ${firstName} ${lastName}
             Visitor's Email Address ${email}
             Visitor's Message ${message}
             `,

    };

    sgMail.send(msg)
    .then(()=>{
        res.redirect("/");
    })
    
    .catch(err=>{
        console.log(`Error ${err}`);
    })
});

app.get("/productListing",(req,res)=>{
    let data = product.getAllPackages();
    res.render("productListing", {
        title: "Product List",
        data:data
    })
});

app.get("/creatAccount",(req,res)=>{
    console.log(req);
});

app.post("/creatAccount",(req,res)=>{
    const {firstName, lastName, email, password} = req.body;

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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")
    const msg = {
        to: 'glee73@myseneca.ca',
        from: `${email}`,
        subject: 'Contact Us Form Submit',
        text: 'and easy to do anywhere, evevn with Node.js',
        html: 
            `Visitor's Full Name ${firstName} ${lastName}
             Visitor's Email Address ${email}
             Visitor's Message ${message}
             `,

    };

    sgMail.send(msg)
    .then(()=>{
        res.redirect("/");
    })
    
    .catch(err=>{
        console.log(`Error ${err}`);
    })
});



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Running web server");

});