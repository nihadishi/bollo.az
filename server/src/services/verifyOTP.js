const expressAsyncHandler = require("express-async-handler");
const {OTP} = require('./generateOTP')
const verifyOTP = expressAsyncHandler(async (req, res) => {
  const { userOTP } = req.body;
  const generatedOTP = OTP; 
  console.log("generated:",generatedOTP);
  const isVerified = isverifiedOTP(userOTP, generatedOTP);
  if (isVerified) {
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
});

const isverifiedOTP = (userOTP, generatedOTP) => {
  return userOTP && generatedOTP && userOTP === generatedOTP;
};

module.exports = { verifyOTP };