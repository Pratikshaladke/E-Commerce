import mongoose from "mongoose";
import order from '../model/order';

// ........................addOrder.........................
export const AddOrder = async (req, res) => {
    try {
        const orderData = new order(
            {
                userid: req.body.userid,
                productname: req.body.productname,
                price: req.body.price,
                productId: req.body.productId,
                fullname: req.body.fullname,
                email: req.body.email,
                address: req.body.address,
                quantity: req.body.quantity,
                mode: req.body.mode,
                total: req.body.total,

            }
        );
        const orderdata = await orderData.save();
        if (orderdata) {
            res.send({ status: true, message: "data ordered", result: orderdata })
        }
    }
    catch (e) {
        res.send({ status: false, message: 'no result found', result: e })
    }
}

// ........................orderDetaibyid......................
export const orderDetailByid = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await order.findById({ _id: id });
        if (results) {
            res.send({ status: true, message: "success", result: results })
        }
    }
    catch (e) {
        res.send({ status: false, message: "no results found", result: e })
    }
}

// ........................updateOrder........................
export const UpdateOrder = async (req, res) => {
    try {
        order.updateOne({ _id: req.body.id },
            { $set: { pay: "Paid" } },
            { new: true },
            (err, updatedlist) => {
                if (err) {
                    res.send({ status: 404, message: "Failed", result: err })
                } else {
                    res.send({ status: 200, message: "Updated Successfully", result: updatedlist })
                }
            })
    }
    catch (e) {
        res.send({ status: false, messgae: "No Results Found", Result: e });
    }
}

// ........................orderList.........................
export const orderList = async (req, res) => {
    //find                         
    let orderdetails = await order.find({})

    res.send({ status: "200", message: "successfull added order list ", result: orderdetails })
}

// ...........................cancelorder.......................
export const orderDelete = async (req, res) => {
    try {
        var id = req.params.id;
        const result = await order.deleteOne({ _id: mongoose.Types.ObjectId(id) })
        if (result) {
            res.send({ status: true, message: "Order Cancell", result: result })
        }
        else {
            res.send({ status: false, message: "something went wrong" })
        }
    } catch (e) {
        return res.send({ status: false, message: "error", result: e })
    }
}
