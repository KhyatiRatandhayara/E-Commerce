import multer from "multer";
import Product from "../models/product.js";
import Cart from "../models/cart.js";


 //Configuration for Multer
 const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `images/${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb( new Error('Please upload a valid image file'))
    } else {
      cb(null, true);
    }
};

//Calling the "multer" Function
const uploadProductImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const createProduct = async (req, res) => {
  try {
    const { productname, price, stock, description } = req.body;
    const url = req.protocol + '://' + req.get('host')
    const productFileName = req.file ? req.file.filename : '';
    const newProduct = await Product.create({
      productname,
      price,
      stock,
      description,
      productfile: url + '/public/' + productFileName
    });
    if (newProduct) {
      return res
        .status(200)
        .send({ message: "Product Created Successfully", newProduct });
    }
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const getAllProducts = (req, res) => {
  Product.find((err, products) => {
    if (!err) {
      res.status(200).json(products);
    } else {
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving products" });
    }
  });
};
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  Product.findByIdAndDelete(productId, (err, doc) => {
    if (!err) {
      res.send({
        message: "Product deleted successfully!",
      });
    } else {
      res.status(500).send({ message: "Could not delete Product" });
    }
  });
};
const getEditProductData = async (req, res) => {
  const productId = req.params.id;

  Product.findById(productId, (err, doc) => {
    if (!err) {
      res.status(200).json(doc);
    } else {
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving product id" });
    }
  });
};

const EditProduct = async (req, res) => {
  const productId = req.params.id;
  // const { productname, price, stock, description } = req.body;
  Product.findByIdAndUpdate(
    productId,
    { $set: req.body },
    { new: true },
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("RESULT: " + result);
      res.send("Done");
    }
  );
};

const addToCart = async (req, res) => {
  try {
    const { productId, currentUser } = req.body;
    const userId = currentUser.id;
    const addToCart = await Cart.create({
      product_id : productId,
      user_id : userId
    });

    if (addToCart) {
      return res
        .status(200)
        .send({ message: "Product successfully added to the cart."});
    }
   
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};
const getCartData = async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(userId);
    const cartData = await Cart.find({user_id: userId}).populate('product_id');
   const cartProductDetails = cartData.map((data) =>data.product_id);
    if(cartData){
      return res.status(200).send(cartProductDetails);
    }
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};
const removeFromCart = async (req, res) => {

  const productId = req.params.id;

   Cart.findOneAndDelete({ product_id: productId }, function (err) {
    if(err) res.status(500).send({ message: "Could not remove Product from cart" });
    res.status(200).send({
      message: "Product removed from cart successfully!",
    });
  });
  
};

export {
  createProduct,
  getAllProducts,
  deleteProduct,
  getEditProductData,
  EditProduct,
  uploadProductImage,
  addToCart,
  getCartData,
  removeFromCart
};
