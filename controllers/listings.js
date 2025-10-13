const Listing = require("../models/listing.js");
const { listingSchema } = require("../utils/schema.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}


module.exports.new = (req, res) => {
    res.render("listings/new");
}

module.exports.show = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews", populate: {
            path: "author"
        }
    }).populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested does not existed");
        res.redirect("/listings")
    }
    res.render("listings/show.ejs", { listing });
}


module.exports.create = async (req, res, next) => {

    let url = req.file.path;
    let filename = req.file.filename;

    let result = listingSchema.validate(req.body);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
    next();
}

module.exports.edit = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested does not existed");
        res.redirect("/listings")
    }

    res.render("listings/edit", { listing });
}

module.exports.update = async (req, res, next) => {
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

        req.flash("success", "Listing Updated!");

        res.redirect(`/listings/${updatedListing._id}`);
    } catch (err) {
        next(err);
    }
}


module.exports.delete = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}