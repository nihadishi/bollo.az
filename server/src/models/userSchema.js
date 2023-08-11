const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema({
  image:{
    type: String,
    trim:true
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
  password: {
    type: String,
    trim:true
  },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", userSchema);


module.exports = UserModel;
