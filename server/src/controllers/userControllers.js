const User = require("../models/userSchema.js");
const {hashPassword, comparePassword} = require('../auth/Auth.js')
const test = (req, res) => {
  res.json("test is running working");
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {}
};
const registerUser = async (req, res) => {
  try {
    const { fullname, region, number, email, password } = req.body;
    if (!(fullname && region && number && email && password)) {
      return  res.json({
          error: "Invalid Input",
        })
        .status(400);
    }
    //password validation yazacam

    const exist = await User.findOne({ email: email });
    if (exist) {
      return res.json({
        error: "Email is taken already",
      });
    }
    const hashedPassword = await hashPassword(password)

    const user = await User.create({
      fullname,
      region,
      number,
      email,
      password: hashedPassword,
    });
    return res.json(user).status(200);
  } catch (error) {
  }
};
module.exports = {
  test,
  registerUser,
};
