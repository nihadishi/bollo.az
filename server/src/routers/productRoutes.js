const express = require("express");
const router = express.Router();
const {addProduct,uploadProductImage, getProducts,getProductsbyID,getProductsbyEmail} = require('../controllers/productController')
router.post("/add",uploadProductImage, addProduct );
router.get("/", getProducts);
router.get("/id/:id", getProductsbyID);
router.get("/email/:email", getProductsbyEmail);
module.exports = router;