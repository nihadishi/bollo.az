const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const { mongoose } = require("mongoose");
const cookieParse = require("cookie-parser");
const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors')
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);
//db
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database connected... app.js'))
    .catch((err) => console.log('Databse is not connected... app.js', err))

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.use(express.static(path.join(__dirname, "./images")));

app.use('/api/user', require('./src/routers/userRoutes'));
app.use('/api/user/product', require('./src/routers/productRoutes'));

app.listen(port, () => {
    console.log(`${port} is running... app.js`);////////
})