const express = require("express");
const app = express();
const users = require("./routes/users.js")
const post = require("./routes/posts.js");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const sessionOption = {
    secret: "mysupersecretkey",resave: false,saveUninitialized: true
}
app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let { name = "default"} = req.query;
    req.session.name = name;
    if(name === "default"){
        req.flash("error" , "user not register");
    }else{
        req.flash("success" , "user register successfull");
    }
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name: req.session.name});
})


// app.get("/secret",(req,res)=>{
//     res.send("secret succesfull");
// })

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`You sent the request ${req.session.count} times`)
// })

app.listen(8000,()=>{
    console.log("Listening on port 8000");
})