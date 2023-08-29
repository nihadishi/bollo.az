const Customer = require("../models/customerSchema.js");
const multer = require("multer");
const path = require("path");

const addCustomer = (req, res) => {
  const { shopForm } = req.body;
  try {
    if (
      !(
        shopForm.Name &&
        shopForm.Surname &&
        shopForm.IDCardNumber &&
        shopForm.Email &&
        shopForm.Number &&
        shopForm.Country &&
        shopForm.City &&
        shopForm.Street &&
        shopForm.ZipCode
      )
    ) {
      return res
        .json({
          error: "Invalid Input",
        })
        .status(400);
    }
    const customer =  Customer.create({
        name:shopForm.Name,
        surname: shopForm.Surname,
        idcard: shopForm.IDCardNumber,
        email:shopForm.Email,
        number:shopForm.Number,
        country: shopForm.Country,
        city: shopForm.City,
        street: shopForm.Street,
        zipcode: shopForm.ZipCode,
        otpcode:"",
    })
    return res.json(customer).status(200);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateCustomer = (req, res) => {
    
};

module.exports = { addCustomer, updateCustomer };
