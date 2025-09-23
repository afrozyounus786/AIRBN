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


const validateListing = (req,res,next) => {
    let { error } = listing.Schema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).jion(",");
        throw new ExpressError(400,errMsg); 
        }else{
            next();
        }
};

const validateReview = (req,res,next) => {
    let { error } = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).jion(",");
        throw new ExpressError(400,errMsg); 
        }else{
            next();
        }
};

app.get("/listings", async (req,res) =>{
   const allListings = await Listing.find({});
   res.render("listings/index",{allListings});
});

app.get("/listings/new",(req,res)=>{
    res.render("listings/new");
});

app.get("/listings/:id",async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{ listing });
});
//create route
app.post("/listings", validateListing , wrapAsync(async (req, res, next) => {
    let result = listingSchema.validate(req.body);
    console.log(result);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
});
app.put("/listings/:id",async(req,res) =>{
    let {id} = req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect("listings/");
});

app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

//Review
//Post Route
app.post("/listings/:id/reviews" ,validateReview, wrapAsync(async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
}));

// app.get("/testListing",async (req,res) =>{
//     let samplelisting = new Listing({
//         title: "my new villa",
//         description:"by the beach",
//         price:12000,
//         location:"mumbai",
//         country:"india"
//     });
//     await samplelisting.save()
//         console.log("sample is running");
//         res.send("succesfull");
// });
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.render("error.ejs");
    // res.status(500).send("Something went wrong!"); 
});

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
});
