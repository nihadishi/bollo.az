const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema({
  fullname:{
    type: String,
  },
  region: {
    type: String,
  },
  number: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", userSchema);


module.exports = UserModel;
