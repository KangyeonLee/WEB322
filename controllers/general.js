const express = require('express')
const router = express.Router();

router.get("/",(req, res)=> {
    res.render("general/home",{
        title: "Home page"
    });
});

router.get("/contact-us",(req,res)=>{
    res.render("general/contactUs", {
        
        title:"Contact page"
    });
});

router.post("/contact-us",(req, res)=>{

    const {firstName, lastName, email, message} = req.body;

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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'")
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

module.exports = router;