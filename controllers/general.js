const express = require('express')
const router = express.Router();
const User = require('../models/User');
const product = require("../models/product");

router.get("/",async (req,res)=>{


    let firstName, lastName, isAdmin=false;
    if(req.session.user){ // session exists
        console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName
        let user = await User.findOne({"email":req.session.user.email}).lean().exec();
        isAdmin = user.isAdmin

    }else{
        console.log("session not exists")
    }

    console.log(req.session.user !== undefined)
    
    product.find({}).lean().exec((err,data)=>{
        data.map(d=>{
            d.link = "/product/productDetail/"+d._id
        })
        res.render("layouts/index", {
            title: "Home Page",
            products:data,
            loggedIn: req.session.user !== undefined,
            firstName : firstName,
            lastName : lastName,
            isAdmin : isAdmin
        })
    });
});

router.get("/contactUs",async(req,res)=>{
    let firstName, lastName, isAdmin=false;
    if(req.session.user){ // session exists
        console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName
        let user = await User.findOne({"email":req.session.user.email}).lean().exec();
        isAdmin = user.isAdmin

    }else{
        console.log("session not exists")
    }

    console.log(req.session.user !== undefined)
    
    product.find({}).lean().exec((err,data)=>{
        data.map(d=>{
            d.link = "/product/productDetail/"+d._id
        })
        res.render("general/contactUs", {
            title: "Home Page",
            products:data,
            loggedIn: req.session.user !== undefined,
            firstName : firstName,
            lastName : lastName,
            isAdmin : isAdmin
        })
    });
});

router.post("/contactUs",(req,res)=>{
    const {firstName, lastName, email, message} = req.body;
    console.log(req.body);
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
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



module.exports = router;