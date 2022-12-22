import express from "express";
const router = express.Router();

import {Addimage,list} from '../controller/slidercontroller'
import { upload } from '../Middleware/uploadfile'

router.post("/Addimage",upload.single('image'),Addimage);
router.get("/list",list)




export default router;