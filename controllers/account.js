const express = require('express')
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post("/creatAccount", async (req,res)=>{
    const {firstname, lastname, email, password} = req.body;
    
    let user = await User.findOne({'email':email}).exec();
    console.log(user)
    if(user !== null){
        console.log("user exists with "+email)
        res.status(200).send({error:'email exists'});
    }
    else{ // create account
        bcrypt.genSalt(10, (err, salt)=>{
            if(err){
                console.log('bcrypt error: ',err.message);
            }else{
                bcrypt.hash(password,salt, async (err,hash)=>{
                    if(err){console.log("bcrypt hash error",err.message)}
                    else{ // save account
                        var newUser = new User({
                            firstName : firstname,
                            lastName : lastname,
                            email : email,
                            password : hash,
                            cart:[]
                        });
                        await newUser.save((err)=>{
                            if(err){
                                console.log("err",err)
                            }else{
                                const sgMail = require('@sendgrid/mail');
                                sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                                const msg = {
                                    to: `${email}`,
                                    from: 'glee73@myseneca.ca',
                                    subject: 'Contact Us Form Submit',
                                    text: 'and easy to do anywhere, evevn with Node.js',
                                    html: 
                                        `Welcome ${firstname} ${lastname}
                                        Your id is ${email}
                                        Feel free to ask anything.
                                        `,
                    
                                };
                    
                                sgMail.send(msg)
                                .then(()=>{
                                    res.redirect("/");
                                })
                                .catch(err=>{
                                    console.log(`Error ${err}`);
                                })
                            }
                        })  
                    }
                })
            }
        }) 
    }
});

router.post("/login",async (req,res)=>{
    const {email, password} = req.body;

    //var user = await User.deleteMany({});
    var user = await User.findOne({"email":email});
    if(user){
        bcrypt.compare(password, user.password, (err,response)=>{
            if(err){
                console.log("bcrypt error",err.message)
            }else{
                if(response){
                    console.log("match")
                    req.session.user = {
                        "email" : email,
                        "firstName" : user.firstName,
                        "lastName" : user.lastName,
                        "isAdmin" : user.isAdmin,
                        "createdTime" : new Date()
                    }
                    
                    if(user.isAdmin){ // if admin, go this
                        res.redirect("/user/admin_dashboard");
                    }else{
                        res.redirect("/user/user_dashboard");
                    }
                }else{
                    console.log("noMatch")
                    res.render("layouts/index", {
                        title:"Home Page",
                        failedLogin : true
                    })
                }
            }
        })
    }else{
        res.render("layouts/index", {
            title:"Home Page",
            failedLogin : true
        })
    }
});

router.get("/logout", (req,res)=>{
    req.session.destroy();
    res.redirect("/");
})


module.exports=router;