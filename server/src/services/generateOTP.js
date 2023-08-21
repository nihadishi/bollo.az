const otpGenerator = require("otp-generator");
let OTP = ''
const generateOTP = () => {
   OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return OTP;
};

module.exports = {generateOTP,OTP};