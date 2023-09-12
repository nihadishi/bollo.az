const expressAsyncHandler = require("express-async-handler");
const Customer = require("../models/customerSchema.js");
const verifyOTP = expressAsyncHandler(async (req, res) => {
  const { numericOTP, IDCardNumber } = req.body;

  const customer = await Customer.findOne({ idcard: IDCardNumber });
  const isVerified = isverifiedOTP(numericOTP, customer.otpcode);
  if (isVerified) {
    res.json({ verified: true });
    console.log("verified");
  } else {
    res.json({ verified: false });
    console.log("not verified");
  }
});
const isverifiedOTP = (numericOTP, otpValue) => {
  // console.log(numericOTP + "HH" + otpValue);
  return numericOTP && otpValue && numericOTP == otpValue;
};

module.exports = { verifyOTP };