const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  productimage: {
    type: String,
    unique: false,
  },
  productname: {
    type: String,
  },
  productdescription: {
    type: String,
  },
  productprice:{
    type: String,
  },
  productunit:{
    type: String,
  },
  productcategory:{
    type: String,
  },
  producttype:{
    type: String,
  },
  fullname: {
    type: String,
    unique: false,
    trim: true,
  },
  region: {
    type: String,
    unique: false,
    trim: true,
  },
  city: {
    type: String,
    unique: false,
    trim: true,
  },
  number: {
    type: String,
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    unique: false,
    trim: true,
  },
  userid: {
    type: String,
    unique: false,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
