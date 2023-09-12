const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const Customer = require("../models/customerSchema.js");
const nodemailer = require("nodemailer");
let {generateOTP,otpValue} = require("./generateOTP");
dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USERM,
    pass: process.env.USERP,
  },
});
const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email,IDCardNumber } = req.body;
   otpValue = generateOTP();
  const mailOptions = {
    from: process.env.USERM,
    to: email,
    subject: "OTP from Bollo.az",
    text: `Your OTP is: ${otpValue}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    res.json({ message: "Email sent successfully!" });
    const customer = await Customer.findOne({ idcard: IDCardNumber });

    if (!customer) {
      return res.status(404).json({ error: "Müşteri bulunamadı" });
    }
    customer.otpcode = otpValue;

    await customer.save();

    return res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Email sending error." });
  }
});
module.exports = { sendEmail};
