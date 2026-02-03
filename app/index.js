const express = require("express");
const app = express();

app.get("/helth",(req, res)=>{
 res.status(200).send("helthe is ok!")
})
app.get("/",(req, res)=>{
 res.status(200).send("helthe is ok!testing web 3")
})
app.listen("3000",()=>{
    console.log("listing on 3000");
    
})