first phase 

1. setting up database
2. Restfull api CRUD operation
//app.js
Create a folder name majjor project 
npm init 
npm i express
npm i ejs
npm i mongoose
create a app.js

create a app.listen on port 

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
});

create a api app.get send response

app.get('/',(req,res) =>{
    res.send('my name is afroz');
});


connect the database

main().then(() =>{
    console.log("connected to database");
}).catch((err) =>{
    console.log(err);
});


async function main() {
    await mongoose.connect(MONGO_URL);
}

show dbs in mongoose
connect mongoose with the data base

2. listings Models
// models/listing.js

Create a listing model
require the listing
Create a send response 

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

3. Initialize database

create a folder init
create data.js for sample data

create a index.js
mongose require
require data
require listing

connect the database 

Initialize the database


4. Basic CRUD operation 

Index Route GET

app.get("/listings", async (req,res) =>{
   const allListings = await Listing.find({});
   res.render("listings/index",{allListings});
});

Set up ejs

require path from "path"
create a folder view inside it listings
create index.ejs


Show route Read

in show.ejs