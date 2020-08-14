const express = require('express')
const router = express.Router();
const Product = require("../models/product");
const User = require('../models/User');

function isAuthorized(req,res,next){
    
    if(req.session.user && req.session.user.isAdmin){
        return next();
    }else{
        res.redirect("/");
    }
}

function isLoggedIn(req,res,next){
    if(req.session.user){
        return next();
    }else{
        res.redirect("/");
    }
}

router.get("/admin_dashboard",isAuthorized,(req,res)=>{
    
    //let data = product.getAllPackages();
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }
    res.render("admin/admin_dashboard", {
        title: "Home Page",
        //data:data,
        loggedIn: req.session.user !== undefined,
        firstName : firstName,
        lastName : lastName,
        isAdmin: true
    })
});


router.get("/admin_edit",isAuthorized,async (req,res)=>{
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }

    let data = await Product.find({}).lean().exec();
    data.map(d=>{
        d.editLink = "/user/admin_edit2/"+d._id;
        d.deleteLink = "/user/admin_delete/"+d._id;
    })
    console.log(data)

    res.render("admin/admin_edit", {
        title: "Admin Page",
        loggedIn: req.session.user !== undefined,
        firstName : firstName,
        lastName : lastName,
        products : data,
        isAdmin: true
    })
});

router.get("/admin_edit2/:id",isAuthorized,async (req,res)=>{
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }

    let data = await Product.findOne({"_id" : req.params.id}).lean().exec();

    res.render("admin/admin_edit_2", {
        title: "Admin Page",
        loggedIn: req.session.user !== undefined,
        firstName : firstName,
        lastName : lastName,
        product : data,
        isAdmin: true
    })
});

router.post("/admin_submitEdit",isAuthorized,async (req,res)=>{
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }
    const {_id, name, price, description, category, numberOfMeals, set, preImage} = req.body;

    console.log(req.body)

    if(req.files && req.files.image){
        file.mv(`${path.dirname(require.main.filename)}/public/images/productImg/${file.name}`,async function(err){
            if(err){
                console.log(err)
            }
            else{
                console.log("move")
                await Product.updateOne({"_id" : _id},{
                    name : name,
                    price : price,
                    description : description,
                    category : category,
                    numberOfMeals : numberOfMeals,
                    set : set,
                    image : "/images/productImg/"+file.name
                }).lean().exec();
            
                res.redirect("/user/admin_edit")
            }
        })
    }else{
        await Product.updateOne({"_id" : _id},{
            name : name,
            price : price,
            description : description,
            category : category,
            numberOfMeals : numberOfMeals,
            set : set,
            image :preImage
        }).lean().exec();
    
        res.redirect("/user/admin_edit")
    }

    
});




router.get("/admin_delete/:id",isAuthorized,async (req,res)=>{
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }

    let data = await Product.findOne({"_id" : req.params.id}).lean().exec();
    if(data){
        await Product.deleteOne({"_id" : req.params.id}).lean().exec();
    }

    res.redirect("/user/admin_edit")
});

router.get("/admin_create",isAuthorized,(req,res)=>{
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }
    res.render("admin/admin_create", {
        title: "Admin Page",
        loggedIn: req.session.user !== undefined,
        firstName : firstName,
        lastName : lastName,
        isAdmin:true
    })
});

// user


router.get("/user_dashboard",isLoggedIn,(req,res)=>{
    
    //let data = product.getAllPackages();
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }
    res.render("user/user_dashboard", {
        title: "Home Page",
        //data:data,
        loggedIn: req.session.user !== undefined,
        firstName : firstName,
        lastName : lastName
    })
});


router.post("/add_to_cart",isLoggedIn,async (req,res)=>{
    const {_id} = req.body; // product ID
    //let data = product.getAllPackages();
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }

    User.findOneAndUpdate({"email":req.session.user.email}, {$push:{"cart":_id}},(err,docs)=>{
        if(err) console.log("err"+err)
        else console.log("good"+docs)
    })

    res.redirect("/user/cart")
});




router.get("/cart",isLoggedIn,async (req,res)=>{
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }

    let data = await User.findOne({"email":req.session.user.email}).lean().exec();
    let product = new Array()
    let total = 0
    for(let id of data.cart){
        let prod = await Product.findOne({"_id":id}).lean().exec();
        prod.deleteLink = "/user/delete_item/"+id;
        product.push(prod)
        total += prod.price
    }

    res.render("user/cart", {
        title: "Home Page",
        //data:data,
        loggedIn: req.session.user !== undefined,
        firstName : firstName,
        lastName : lastName,
        products : product,
        total : total
    })
});

router.get("/delete_item/:id",isLoggedIn,async (req,res)=>{
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }

    let data = await User.findOne({"email":req.session.user.email}).lean().exec();
    const idx = data.cart.indexOf(req.params.id)
    if (idx > -1) data.cart.splice(idx, 1)

    await User.updateOne({"email":req.session.user.email}, {"cart":data.cart},(err,docs)=>{
        if(err) console.log("err"+err)
        else console.log("good"+docs)
    })

    let total = 0
    let product = new Array()
    for(let id of data.cart){
        let prod = await Product.findOne({"_id":id}).lean().exec();
        prod.deleteLink = "/user/delete_item/"+id;
        product.push(prod)
        total += prod.price
    }
    
    res.redirect("/user/cart")
});

router.get("/checkout",isLoggedIn,async (req,res)=>{
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }


    res.render("user/checkOut", {
        title: "Home Page",
        //data:data,
        loggedIn: req.session.user !== undefined,
        firstName : firstName,
        lastName : lastName,
    })
})

router.post("/place_order",isLoggedIn,async (req,res)=>{
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }

    let data = await User.findOne({"email":req.session.user.email}).lean().exec();
    let product = new Array()
    let total = 0
    let message = `Dear ${data.firstName} ${data.lastName}\n `
    for(let id of data.cart){
        let prod = await Product.findOne({"_id":id}).lean().exec();
        message += prod.name +" is ordered\nprice : "+prod.price+"\n"
        product.push(prod)
        total += prod.price
    }
    message += `total price is ${total}`

    console.log(message)

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: `${req.session.user.email}`,
        from: 'glee73@myseneca.ca',
        subject: 'Contact Us Form Submit',
        text: message,
        html: message,

    };

    sgMail.send(msg)
    .then(async ()=>{
        await User.findOneAndUpdate({"email":req.session.user.email},{"cart":[]}).exec();
        res.redirect("/user/user_dashboard")
    })
    .catch(err=>{
        console.log(`Error ${err}`);
    })

})



module.exports=router;