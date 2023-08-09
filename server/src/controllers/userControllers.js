const User = require("../models/userSchema.js");
const {hashPassword, comparePassword} = require('../auth/Auth.js')
const test = (req, res) => {
  res.json("test is running working");
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check user's existing
    const user = await User.findOne({email})
    if(!user){
        return res.json({
            error: 'No user aviable, please sign up'
        })
    }

    //Check password
    const compPassword = await comparePassword(password,user.password)
    if(compPassword){
        res.json('password match')
    }
  } catch (error) {
    console.log(error);
  }
};


//register
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
////////
module.exports = {
  test,
  registerUser,
  loginUser
};
