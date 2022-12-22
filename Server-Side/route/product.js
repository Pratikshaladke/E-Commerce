import express from "express";
const router = express.Router();
import { upload } from '../Middleware/uploadfile'

import{AddProduct,List,Delete,searchProduct,payment} from '../controller/productcontroller'

router.post("/AddProduct",upload.single('image'),AddProduct);
router.get("/list",List);
router.post("/searchProduct",searchProduct);
router.delete("/Delete/:_id",Delete)
router.post("/payment",payment)


export default router;