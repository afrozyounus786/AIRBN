const express = require("express");
const router = express.Router({ mergeParams: true});

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/afroz";
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require ("../models/review.js");
const { listingSchema , reviewSchema} = require("../utils/schema.js");



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


//Review Route
router.post("/" ,validateReview, wrapAsync(async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success" , "New Review Created!");

    res.redirect(`/listings/${listing._id}`);
}));

//Delete Review Route

router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success" , "Review Deleted!");

    res.redirect(`/listings/${id}`);
}));

module.exports = router;