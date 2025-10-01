const express = require("express");
const routerForPost = express.Router();



routerForPost.get("/",(req,res)=>{
    res.send("Get for posts");
})
routerForPost.get("/:id",(req,res)=>{
    res.send("Get for posts id");
})
routerForPost.post("/",(req,res)=>{
    res.send("Post fot posts")
})
routerForPost.delete("/:id",(req,res)=>{
    console.log("Delete for posts")
})

module.exports = routerForPost;