const { default: mongoose } = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema({
  fullname: String,
  region :String,
  number: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", userSchema);


module.exports = {
  UserModel,
};
