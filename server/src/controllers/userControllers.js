const User = require("../models/userSchema.js");
const {hashPassword, comparePassword} = require('../auth/Auth.js');
const jwt = require("jsonwebtoken");
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
        jwt.sign({email: user.email, id:user._id, fullname: user.fullname},process.env.JWT_KEY,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token', token).json(user)
        });
    }
    else{
        res.json({
            error: "Password is not same with changed token"
        })
    }
  } catch (error) {
    console.log(error);
  }
};

//register
const registerUser = async (req, res) => {
  try {
    const {image, fullname, region, city, number, email, password } = req.body;
    if (!(image && fullname && region && city && number && email && password)) {
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
      image,
      fullname,
      region,
      city,
      number,
      email,
      password: hashedPassword,
    });
    return res.json(user).status(200);
  } catch (error) {
  }
};
////////


const getProfile = async(req,res)=>{
   const {token} = req.cookies
   try {
       if(token){
        jwt.verify(token, process.env.JWT_KEY,{}, async(err,user)=>{
            const send = await User.findOne({email:user.email}).select('-password')
            console.log("back" ,user)
            if(err) throw err;
            res.json(send);
        })
        } 
        else{
            res.json(null);
        }
    } 
    catch (error) {
    res.status(401).json({status:'fail',
        message : 'Invalid token'});
   }
}

const logoutProfile =async (req,res)=>{
    try {
        res.cookie('token','') ;

        res.status(200).json(
            {
                status:'sucess' 
            }
        )
    } catch (error) {
        console.log(error);
    }


}
module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutProfile
};
