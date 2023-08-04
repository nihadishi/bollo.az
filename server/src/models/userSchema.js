const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  mail: String,
  password: String,
  number: String,
  country: String,
  imagePath: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
