if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


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

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


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

// Initialize Passport.js middleware
// This is required to initialize Passport in your Express app
app.use(passport.initialize());

// Enable persistent login sessions
// This middleware integrates Passport with express-session
app.use(passport.session());

// Configure the local strategy for authentication
// User.authenticate() is a helper method added by passport-local-mongoose
// It checks the username and password against the database
passport.use(new LocalStrategy(User.authenticate()));

// Serialize user: determines which data of the user object should be stored in the session
// Typically, it stores the user ID in the session cookie
passport.serializeUser(User.serializeUser());

// Deserialize user: retrieves full user details from the session data
// User.deserializeUser() is a helper method that fetches user info from the database using the stored ID
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.get("/demo", async (req, res) => {
  // 1️⃣ Create a new User object with required fields (email and username)
  // Note: We are NOT setting the password here because User.register() handles it
  let fakeUser = new User({
    email: "afrozyounus22@gmail.com",
    username: "afroz1177",
  });

  // 2️⃣ Register the user with a password
  // User.register() is a helper method from passport-local-mongoose
  // It hashes the password automatically and saves the user to the database
  let registeredUser = await User.register(fakeUser, "helloworld");

  // 3️⃣ Send the newly registered user as response
  // This user object will include _id, email, username, but the password is hashed and not visible
  res.send(registeredUser);
});



app.use("/listings",listingRouter);

app.use("/listings/:id/reviews",reviewRouter);//yaha se apna id parameter nhi pass hota routes folder ko  
//To resolve we use mergeParams as true in the review routes
app.use("/" , userRouter);

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong!";
    res.status(statusCode).render("error", { err });
});

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
});
