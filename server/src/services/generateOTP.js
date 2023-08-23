const otpGenerator = require("otp-generator");
let otpValue = ''
const generateOTP = () => {
  otpValue =  otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return otpValue;
};

module.exports = {generateOTP,otpValue};