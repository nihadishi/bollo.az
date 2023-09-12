const Product = require("../models/productSchema.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body);
    return cb(null, "images/products");
  },
  filename: (req, file, cb) => {
    console.log(file);
    return cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const uploadProductImage = upload.single("productimage");

const addProduct = async (req, res) => {
  try {
    const {
      productname,
      productdescription,
      productprice,
      productunit,
      productcategory,
      producttype,
      productexpirationdate,
      fullname,
      region,
      city,
      number,
      email,
      userid,
    } = req.body;
    console.log(req.body);
    if (
      !(
        productname &&
        productdescription &&
        productprice &&
        productunit &&
        productcategory &&
        producttype &&
        fullname &&
        region &&
        city &&
        number &&
        email &&
        userid
      )
    ) {
      return res
        .json({
          error: "Invalid Input",
        })
        .status(400);
    }
    const product = Product.create({
      productimage: req.file.filename,
      productname,
      productdescription,
      productprice,
      productunit,
      productcategory,
      producttype,
      productexpirationdate,
      fullname,
      region,
      city,
      number,
      email,
      userid
    });
    return res.json(product).status(200);//
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProducts = async(req,res)=>{
  try {
    const products = await Product.find(); // Tüm ürünleri çek
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getProductsbyID = async(req,res)=>{
  const productID = req.params.id;
  
  try {
    const product = await Product.findById(productID); // Tekil bir ürünü ID'ye göre çek
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Ürün bulunamadı' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getProductsbyEmail = async(req,res)=>{
  const productEmail = req.params.email;
  try{
    const products = await Product.find({ email: productEmail.toLowerCase() });
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ error: 'Ürün bulunamadı' });
    }
} catch (error) {
  console.error('Error fetching product:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
}
module.exports = { addProduct,uploadProductImage,getProducts,getProductsbyID,getProductsbyEmail };
