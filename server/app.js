const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.get("/",(req,res)=>{
    res.json({
        message: "HomePage"
    })
})
app.listen(port,()=>{
    console.log(`${port} is running...`);
})