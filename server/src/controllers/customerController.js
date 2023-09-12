const { log } = require("console");
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
const updateCustomer = async (req, res) => {
  const customerId = req.params.id;
  const { shopForm } = req.body;

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: "Müşteri bulunamadı" });
    }

    customer.name = shopForm.Name;
    customer.surname = shopForm.Surname;
    customer.email = shopForm.Email;
    customer.number = shopForm.Number;
    customer.country = shopForm.Country;
    customer.city = shopForm.City;
    customer.street = shopForm.Street;
    customer.zipcode = shopForm.ZipCode;
    customer.otpcode = "123";

    await customer.save();

    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCustomer = async (req, res) => {
  const customerId = req.params.idcard;
  try {
    const idCardNumbers = await Customer.findOne({ idcard: customerId });
    if (!idCardNumbers) {
      return res.status(200).json(0);
    }
    return res.status(200).json(idCardNumbers);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { addCustomer, updateCustomer,getCustomer };
