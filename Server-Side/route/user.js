import express from "express";
const router = express.Router();

import {userSignup,userlogin,forgetpassword,userPasswordReset} from '../controller/usercontroller'
import { upload } from '../Middleware/uploadfile'

router.post("/userSignup",upload.single('image'),userSignup);
router.post("/userlogin",userlogin);
router.post("/forgetpassword",forgetpassword)
router.post("/userPasswordReset/:id/:token",userPasswordReset)


export default router;