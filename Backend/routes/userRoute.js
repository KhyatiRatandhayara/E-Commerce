import express from 'express';
import invalidUrl from "../controllers/commonController.js";
import {registerUser,signInUser,logoutUser,authChecker} from "../controllers/userController.js";
import {createProduct} from "../controllers/productController.js";
import checkUsernameOrEmailExist from "../middleware/verifySignup.js";

const router = express.Router();

  //Authentication
router.post('/register',checkUsernameOrEmailExist, registerUser);

router.post('/login', signInUser);

router.get('/authchecker', authChecker);

router.post('/addproduct', createProduct);

router.post('/logout', logoutUser);

router.get('*', invalidUrl);

export default router;