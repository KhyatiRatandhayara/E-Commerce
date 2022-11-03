import express from 'express';
import invalidUrl from "../controllers/commonController.js";
import {registerUser,signInUser,logoutUser,authChecker} from "../controllers/userController.js";
import {createProduct, getAllProducts, deleteProduct, editProductData} from "../controllers/productController.js";
import checkUsernameOrEmailExist from "../middleware/verifySignup.js";

const router = express.Router();

//Authentication
router.post('/register',checkUsernameOrEmailExist, registerUser);

router.post('/login', signInUser);

router.get('/authchecker', authChecker);

router.post('/logout', logoutUser);

//product routes

router.post('/addproduct', createProduct);

router.get('/allproducts', getAllProducts);

router.get('/editproductdata/:id', editProductData);

router.delete('/deleteproduct/:id', deleteProduct);

router.get('*', invalidUrl);

export default router;