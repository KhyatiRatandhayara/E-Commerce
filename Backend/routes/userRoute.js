import express from 'express';
import invalidUrl from "../controllers/commonController.js";
import {registerUser,signInUser,logoutUser,authChecker} from "../controllers/userController.js";
import {createProduct, getAllProducts, deleteProduct, getEditProductData, EditProduct, uploadProductImage, addToCart, getCartData, removeFromCart} from "../controllers/productController.js";
import checkUsernameOrEmailExist from "../middleware/verifySignup.js";

const router = express.Router();

//Authentication
router.post('/register',checkUsernameOrEmailExist, registerUser);

router.post('/login', signInUser);

router.get('/authchecker', authChecker);

router.post('/logout', logoutUser);

//product routes

router.post('/addproduct', uploadProductImage.single('file'), createProduct);

router.get('/allproducts', getAllProducts);

router.get('/editproductdata/:id', getEditProductData);

router.post('/getcartdata', getCartData);

router.put('/editproduct/:id', EditProduct);

router.delete('/deleteproduct/:id', deleteProduct);

router.post('/addtocart', addToCart);

router.delete('/deletecartproduct/:id', removeFromCart);


router.get('*', invalidUrl);

export default router;