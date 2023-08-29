const Customer = require("../models/customerSchema.js");
const multer = require("multer");
const path = require("path");

const addCustomer = (req,res)=>{
    const { shopForm } = req.body;
    console.log(shopForm);
}
const updateCustomer = (req,res)=>{

}

module.exports = {addCustomer, updateCustomer}