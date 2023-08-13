const User = require("../models/userSchema.js");
const { hashPassword, comparePassword } = require('../auth/Auth.js');
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const test = (req, res) => {
  res.json("test is running working");
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check user's existing
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({
        error: 'No user aviable, please sign up'
      })
    }

    //Check password
    const compPassword = await comparePassword(password, user.password)
    if (compPassword) {
      jwt.sign({ email: user.email, id: user._id, fullname: user.fullname }, process.env.JWT_KEY, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(user)
      });
    }
    else {
      res.json({
        error: "Password is not same with changed token"
      })
    }
  } catch (error) {
    console.log(error);
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body);
    return cb(null, 'images/profilephotos')
  },
  filename: (req, file, cb) => {
    console.log(file);
    return cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage });

const uploadUserImage = upload.single('image')
//register

const registerUser = async (req, res) => {
  try {

    
    const { fullname, region, city, number, email, password } = req.body;
    console.log("BODY", req.body);
    if (!(
      fullname && region && city && number && email && password)) {
      return res.json({
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
      image: req.file.filename,
      fullname,
      region,
      city,
      number,
      email,
      password: hashedPassword,
    });
    return res.json(user).status(200);
  } catch (error) {
    console.log(error);
  }
};
////////


const getProfile = async (req, res) => {
  const { token } = req.cookies
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, {}, async (err, user) => {
        const send = await User.findOne({ email: user.email }).select('-password')
        console.log("back", user)
        if (err) throw err;
        res.json(send);
      })
    }
    else {
      res.json(null);
    }
  }
  catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid token'
    });
  }
}

const updateProfile = async (req,res) =>{
  const { token } = req.cookies;
  try {
    console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, {}, async (err, user) => {
        if (err) {
          return res.status(401).json({
            status: 'fail',
            message: 'Invalid token'
          });
        }

        const userId = user.id;
        const { fullname, city,number } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { fullname, city, number },
          { new: true } 
        ).select('-password');

        res.status(200).json(updatedUser);
      });
    } 
    else {
      res.status(401).json({
        status: 'fail',
        message: 'Token not found'
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
const logoutProfile = async (req, res) => {
  try {
    res.cookie('token', '');

    res.status(200).json(
      {
        status: 'sucess'
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
  logoutProfile,
  uploadUserImage,
  updateProfile
};