const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/afroz";
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema , reviewSchema} = require("../utils/schema.js");
const {isLoggedIn} = require("../middleware.js");


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


router.get("/", async (req,res) =>{
   const allListings = await Listing.find({});
   res.render("listings/index",{allListings});
});

router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new");
});
//Show Route
router.get("/:id",async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");

    if(!listing){
       req.flash("error" , "Listing you requested does not existed"); 
       res.redirect("/listings")
    }

    res.render("listings/show.ejs",{ listing });
});
//create route
router.post("/",isLoggedIn , validateListing , wrapAsync(async (req, res, next) => {
    let result = listingSchema.validate(req.body);
    console.log(result);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success" , "New Listing Created!");
    res.redirect("/listings");
}));

router.get("/:id/edit",isLoggedIn, async (req, res) => {
    let { id } = req.params;
    
    const listing = await Listing.findById(id);

    if(!listing){
       req.flash("error" , "Listing you requested does not existed"); 
       res.redirect("/listings")
    }
    
    res.render("listings/edit", { listing });
});

//Update Route
router.put("/:id",isLoggedIn, async (req, res, next) => {
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

        req.flash("success" , "Listing Updated!");

        res.redirect(`/listings/${updatedListing._id}`);
    } catch (err) {
        next(err);
    }
});


router.delete("/:id",isLoggedIn , async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success" , "Listing Deleted!");
    res.redirect("/listings");
});


module.exports = router;