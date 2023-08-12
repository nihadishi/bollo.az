const express = require("express");
const router = express.Router();
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutProfile,
  uploadUserImage
} = require("../controllers/userControllers");



// router.get("/", test);
router.post("/register", uploadUserImage, registerUser);
router.post("/login", loginUser);
router.post("/logout",logoutProfile);
router.get("/profile", getProfile);
router.put("profile/:id")
module.exports = router;
