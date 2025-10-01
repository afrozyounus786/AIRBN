const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Get for users");
})
router.get("/:id",(req,res)=>{
    res.send("Get for show id");
})
router.post("/",(req,res)=>{
    res.send("Post fot users")
})
router.delete("/:id",(req,res)=>{
    console.log("Delete for users")
})

module.exports = router;