import express from 'express';
import invalidUrl from "../controllers/commonController.js";
import {registerUser,signInUser} from "../controllers/userController.js";
import checkUsernameOrEmailExist from "../middleware/verifySignup.js";

const router = express.Router();

  //Authentication
router.post('/register',checkUsernameOrEmailExist, registerUser);

router.post('/login', signInUser);

router.get('*', invalidUrl);

export default router;