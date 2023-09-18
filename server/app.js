const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const { mongoose } = require("mongoose");
const cookieParse = require("cookie-parser");
const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors')
const frontAdress = "https://bollo-az.vercel.app";
// const frontAdress = "http://localhost:3000";
app.use(
    cors({
        credentials: true,
        origin: frontAdress,
    })
);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", frontAdress);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//db
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database connected... app.js'))
    .catch((err) => console.log('Databse is not connected... app.js', err))

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.use(express.static(path.join(__dirname, "./images")));
app.use('/api/auth', require('./src/routers/emailRoutes'))
app.use('/api/user', require('./src/routers/userRoutes'));
app.use('/api/products', require('./src/routers/productRoutes'));
app.use("/api/customer", require("./src/routers/customerRoutes"));

app.listen(port, () => {
    console.log(`${port} is running... app.js`);
})