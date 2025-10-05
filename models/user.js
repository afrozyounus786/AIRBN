const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    }
})

userSchema.plugin(passportLocalMongoose);// the use of this plugin is it automatically add the username , hashing and salting

module.exports = mongoose.model("user" , userSchema);