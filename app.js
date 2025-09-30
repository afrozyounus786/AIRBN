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

//Validate Listing
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body); 
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

//Validate Review
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
//Show Route
app.get("/listings/:id",async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
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

//Update Route
app.put("/listings/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid listing ID");
        }

        const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

        if (!updatedListing) {
            return res.status(404).send("Listing not found");
        }

        res.redirect(`/listings/${updatedListing._id}`);
    } catch (err) {
        next(err);
    }
});


app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

//Review Route
app.post("/listings/:id/reviews" ,validateReview, wrapAsync(async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
}));

//Delete Review Route

app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
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
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong!";
    res.status(statusCode).render("error", { err });
});

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
});
