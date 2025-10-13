const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


const listingController = require("../controllers/listings.js");

router
    .route("/")
    .get(wrapAsync(listingController.index))//Index
    .post(isLoggedIn, upload.single('listing[image]'), validateListing , wrapAsync(listingController.create))//Create
    .delete(isLoggedIn, isOwner, listingController.delete);//Delete


//New
router.get("/new", isLoggedIn, listingController.new);

router
    .route("/:id")
    .get(listingController.show)//Show Route
    .put(isLoggedIn, isOwner, listingController.update);//Update



//Edit
router.get("/:id/edit", isLoggedIn, isOwner, listingController.edit);


module.exports = router;