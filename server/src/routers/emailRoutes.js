const express = require("express");
const router = express.Router();
const { sendEmail } = require("../services/sendEmail");
const {verifyOTP} = require("../services/verifyOTP")
router.post("/sendEmail", sendEmail);
router.post("/verify",verifyOTP );

module.exports = router;//