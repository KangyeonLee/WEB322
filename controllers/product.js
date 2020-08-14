
const express = require('express')
const router = express.Router();
const Product = require("../models/product");
const path = require('path');
function isAuthorized(req,res,next){
    
    if(req.session.user && req.session.user.isAdmin){
        return next();
    }else{
        res.redirect("/");
    }
}


router.get("/productListing",async(req,res)=>{
    //let data = product.getAllPackages();let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }
    let data = await Product.find({}).lean().exec();
    res.render("product/productListing", {
        title: "Product List",
        product : data,
        loggedIn: req.session.user !== undefined,
        firstName : firstName,
        lastName : lastName
    })
});

router.get("/productDetail/:id",async (req,res)=>{
    
    let firstName, lastName;
    if(req.session.user){ // session exists
        //console.log("session exists")
        firstName = req.session.user.firstName
        lastName = req.session.user.lastName

    }else{
        //console.log("session not exists")
    }

    let data = await Product.findOne({"_id" : req.params.id}).lean().exec();
    console.log(data)
    res.render("product/productDetail", {
        title: "Product Detail",
        product : data,
        loggedIn: req.session.user !== undefined,
        firstName : firstName,
        lastName : lastName
    })
});


router.post("/addProduct",isAuthorized,async (req,res)=>{
    const {name, price, description, category, numberOfMeals, set} = req.body;
    let file = req.files.image;
    file.mv(`${path.dirname(require.main.filename)}/public/images/productImg/${file.name}`,async function(err){
        if(err){
            console.log(err)

        }
        else{
            var product = new Product({
                name : name,
                price : price,
                description : description,
                category : category,
                numberOfMeals : numberOfMeals,
                set : set === 'on',
                image : "/images/productImg/"+file.name
            });
        
            await product.save((err)=>{
                if(err){
                    console.log("err",err)
                }else{
                    res.redirect("/user/admin_dashboard");
                }
            }) 
        }
    })
})




module.exports=router;