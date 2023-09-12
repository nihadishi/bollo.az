const express = require("express");
const router = express.Router();
const {
  addCustomer,
  updateCustomer,
  getCustomer
} = require("../controllers/customerController");

router.post("/add", addCustomer);
router.put("/update/:id",updateCustomer)
router.get("/get/:idcard",getCustomer)
module.exports = router;//