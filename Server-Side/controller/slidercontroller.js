import slider from '../model/slider'

export const Addimage = async (req, res) => {
    const sliderData = new slider(
        {
            image: req.file.filename
        }
    );
    const newimage = await sliderData.save();
    res.send({ status: true, message: "successfull", result: newimage })

}

export const list = async (req, res) => {
    const result = await slider.find();

    if (result) {
        res.send({
            status: true,
            message: "images added successfully",
            result: result,
        });
    }
};