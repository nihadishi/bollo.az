const expressAsyncHandler = require("express-async-handler");
const {otpValue} = require('./generateOTP')
const verifyOTP = expressAsyncHandler(async (req, res) => {
  const { numericOTP } = req.body;
  console.log(numericOTP);
  console.log("generated:",otpValue);
  const isVerified = isverifiedOTP(numericOTP, otpValue);
  if (isVerified) {
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
});
const isverifiedOTP = (numericOTP, otpValue) => {
  return numericOTP && otpValue && numericOTP === otpValue;
};

module.exports = { verifyOTP };