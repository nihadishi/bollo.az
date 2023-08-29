const mongoose = require("mongoose");
const {Schema} = mongoose;
const customerSchema = new Schema({
  name:{
    type: String,
    trim:true
  },
  surname:{
    type: String,
    trim:true
  },
  idcard: {
    type: String,
    trim:true
  },
  email: {
    type: String,
    trim:true
  },
  number: {
    type: String,
    trim:true
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  zipcode: {
    type: String,
    trim:true
  },
  otpcode: {
    type: String,
    trim: true
  },
  createdAt: { type: Date, default: Date.now },
});

const CustomerModel = mongoose.model("Customer", customerSchema);


module.exports = CustomerModel;
