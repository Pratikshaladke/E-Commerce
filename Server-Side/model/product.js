import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        // userid:{
        //     type:mongoose.ObjectId,
        //     ref:"shopping"
        // },
        productname: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        description:
        {
            type: String,
            required: true
        },
        image:{
            type:String,
            required:true
        }
    },
);

const productdata = mongoose.model("product", productSchema)
export default productdata;
