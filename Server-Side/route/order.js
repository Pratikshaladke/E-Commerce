import express from "express";
const router = express.Router();

import {AddOrder,orderDetailByid,UpdateOrder,orderList,orderDelete} from '../controller/ordercontroller'

router.post("/AddOrder",AddOrder)
router.get("/orderDetailByid/:id",orderDetailByid)
router.put("/UpdateOrder",UpdateOrder)
router.get("/orderList",orderList)
router.delete("/orderDelete/:id",orderDelete)

export default router;