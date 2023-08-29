const express = require("express");
const router = express.Router();
const {
  addCustomer,
  updateCustomer
} = require("../controllers/customerController");

router.post("/add", addCustomer);
// router.put("/update:id", updateProfile)
module.exports = router;