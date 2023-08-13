const mongoose = require("mongoose");
const {Schema} = mongoose;
const productSchema = new Schema({
  productimage:{
    type: String,
  },
  productname:{
    type: String,
  },
  productdescription:{
    type: String,
  },
  fullname:{
    type: String,
    trim:true
  },
  region: {
    type: String,
    trim:true
  },
  city: {
    type: String,
    trim:true
  },
  number: {
    type: String,
    trim:true
  },
  email: {
    type: String,
    unique: true,
    trim:true
  },
  userid: {
    type: String,
    trim:true
  },
  createdAt: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model("Product", productSchema);


module.exports = ProductModel;
