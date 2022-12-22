import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        confirm_password:{
            type:String,
            required:true
        },
        created: {
            type: String,
            default: new Date().toISOString(),
        },
        address:{
            type:String,
            required:true
        },
        image: {
            type: String,
            required: true
        }
    },

);

const userdata = mongoose.model("user", userSchema)
export default userdata;
