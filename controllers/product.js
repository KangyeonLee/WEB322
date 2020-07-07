
const express = require('express')
const router = express.Router();

const productModel = require("../models/product");


router.get("/list",(req,res)=>{

    res.render("products/productList",{
        title:"Product Listing Page",
        products: productModel.getAllProducts()

    });
});

router.get("/add",(req,res)=>{

    res.render("products/productAdd",{
        title:"Product Add Form"
    });
});


router.post("/add",(req,res)=>{

    //res.render();
});


module.exports=router;