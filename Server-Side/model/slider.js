import mongoose from "mongoose";
const sliderSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true
        }
    },

);

const sliderdata = mongoose.model("slider", sliderSchema)
export default sliderdata;
