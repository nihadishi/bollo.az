const express = require("express");
const router = express.Router();
const {addProduct,uploadProductImage, getProducts} = require('../controllers/productController')
router.post("/add",uploadProductImage, addProduct );
router.get("/", getProducts);
module.exports = router;