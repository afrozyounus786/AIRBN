const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/afroz";
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema} = require("./utils/schema.js");
const Review = require ("./models/review.js");
const listing = require("./routes/listings.js");
const review = require("./routes/review.js")
const session = require("express-session");
const flash = require("connect-flash");


const sessionOption = {
    secret: "mysupersecretkey",resave: false,saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};


main().then(() =>{
    console.log("connected to database");
}).catch((err) =>{
    console.log(err);
});


async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get('/',(req,res) =>{
    res.send('my name is afroz');
});


app.use(session(sessionOption));
app.use(flash());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
})


app.use("/listings",listing);

app.use("/listings/:id/reviews",review);//yaha se apna id parameter nhi pass hota routes folder ko  
//To resolve we use mergeParams as true in the review routes

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong!";
    res.status(statusCode).render("error", { err });
});

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
});
