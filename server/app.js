const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const {mongoose}  = require("mongoose");
const port = process.env.PORT || 5000;
const app = express();

//db
mongoose.connect(process.env.DB_URL)
.then(()=>console.log('Database connected... app.js'))
.catch((err)=> console.log('Databse is not connected... app.js',err))

//middleware
app.use(express.json());
// app.use(cors());
app.use('/api', require('./src/routers/userRoutes'));

app.listen(port,()=>{
    console.log(`${port} is running... app.js`);
})