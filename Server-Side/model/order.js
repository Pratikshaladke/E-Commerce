import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
    {
        userid: {
            type: String,
            required: "shopping"
        },
        productname: {
            type: String,
            required: true
        },
        productId: {
            type: String,
            required: false
        },
        price: {
            type: String,
            required: true
        },
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        pay: {
            type: String,
            default: "unpaid"
        },
        mode: {
            type: String,
            default: ["COD", "Online"]
        },
        created: {
            type: String,
            default: new Date().toISOString(),

        }
    }
);
const orderdata = mongoose.model("ordere", orderSchema)
export default orderdata;
