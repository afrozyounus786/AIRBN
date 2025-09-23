const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ListingSchema = new Schema({
    title:{
      type:String,
      required:true
    },
    
    description:String,
       image :{
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGLCWu_Ngs1sF8NJtZand5W1yArr7bPLgwZAyRDw1j0u5vUViklCnPXy9r6tXd633opFJQeQ&s",
        type:String,
        set : (v) => v ===""?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGLCWu_Ngs1sF8NJtZand5W1yArr7bPLgwZAyRDw1j0u5vUViklCnPXy9r6tXd633opFJQeQ&s":v,
    },
    price:Number,
    location:String,
    country:String,
    reviews : [
      {
      type: Schema.Types.ObjectId,
      ref: 'Review'
      }
    ]
});
const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;