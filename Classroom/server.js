const express = require("express");
const app = express();
const users = require("./routes/users.js")
const post = require("./routes/posts.js");
const cookieparser = require("cookie-parser");

app.use(cookieparser());

app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send("DJ bravo");
})
app.get("/getcookies",(req,res)=>{
    res.cookie("name","Afroz");
    res.send("Cookies send")
})


app.get("/" , (req,res)=>{
    res.send("Afroz Younus");
})



app.use("/users",users);



app.use("/posts",post);


app.listen(8000,()=>{
    console.log("Listening on port 8000");
})