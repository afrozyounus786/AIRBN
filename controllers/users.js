const User = require("../models/user");

module.exports.renderSignup = (req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.signup = async(req,res)=>{
    try{
        let { username , email , password} = req.body;
        const newUser = new User({username , email});
        const registeredUser = await User.register(newUser , password);
        console.log(registeredUser);

        req.login(registeredUser , (err)=>{
            if(err){
                next(err);
            }
            req.flash("success" , "Welcome to AIRBN Clone");
            res.redirect("/listings");
        })
    }catch(error){
        req.flash("error" , error.message);
        res.redirect("/signup");
    }
}

module.exports.login = (req,res)=>{
    res.render("./users/login.ejs")
}

module.exports.loginPost = async (req,res)=>{
    req.flash("success" , "Welcome Back to Airbn Clone");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((error)=>{
        if(error){
            return next(error);
        }
        
        req.flash("success" , "You are logged out!");
        res.redirect("/listings");
    })
}