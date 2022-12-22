import { useState } from 'react'
import { Link } from 'react-router-dom';
import { addcart } from '../services/auth.services';
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCartList() {

   const navigate = useNavigate();
   const [input, setInput] = useState({
        productname: "",
        price: "",
        rating:"",
        description: "",
        image: null
    });

    // const [category, setcategory] = useState("");

    const [valid, setValid] = useState({
        productname: true,
        price: true,
        rating:true,
        description: true,
        productnameError: "",
        priceError: "",
        ratingError:"",
        descriptionError: "",
  
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((previousValue) => ({
            ...previousValue,
            [name]: value
        }));

    };

    const validateproductname = (productname) => {
        if (productname.length === 0) {
            setValid((previousValue) => ({
                ...previousValue,
                productname: false,
                productnameError: "Please Enter Your productname"
            }))
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                productname: true,
                productnameError: ""
            }))
        }
    }

    const validatedescription = (description) => {
        if (description.length === 0) {
            setValid((previousValue) => ({
                ...previousValue,
                description: false,
                descriptionError: "Please Enter description Name"
            }))
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                description: true,
                descriptionError: ""
            }))
        }
    }
    const validatePrice = (price) => {
        if (price.length === 0) {
            setValid((previousValue) => ({
                ...previousValue,
                price: false,
                priceError: "Please Enter Price"
            }))
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                price: true,
                priceError: ""
            }))
        }
    }

    const onFileChange = (e) => {
        setInput((previous) => ({
            ...previous,
            image: e.target.files[0],
        }))
    }
    console.log("input data==>",input)

    const AddCart = async (e) =>
     {
            e.preventDefault();
            const fromdata = new FormData()
            fromdata.append("productname", input.productname);
            fromdata.append("description", input.description);
            fromdata.append("rating", input.rating);
            fromdata.append("price", input.price);
            fromdata.append("image", input.image);
            try {
                const response = await addcart(fromdata);
                console.log("submited data==>",response.data)
                if (response.data.status === true) {
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    navigate("/cart")
                } else {
                    toast.warning(response.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            }
            catch (err) {
                console.warn(err)
            }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6" style={{width: '100%'}}>
                    <form className="form-control" onSubmit={(e) => handleSubmit(e)}>
                        <h3>Add Product</h3>
                        <br />
                        <br/>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label>productname</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" name="productname"
                                        onChange={handleChange}
                                        onBlur={(e) => validateproductname(e.target.value)} />
                                    {!valid.productname &&
                                        <span className="text-danger">{valid.productnameError}</span>}
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-4">
                                    <label>description</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" name="description"
                                        onChange={handleChange}
                                        onBlur={(e) => validatedescription(e.target.value)} />
                                    {!valid.description &&
                                        <span className="text-danger">{valid.descriptionError}</span>}
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Rating</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" name="rating"
                                        onChange={handleChange}
                                 
                                       />
                                </div>
                            </div>
                            <br />
                            
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Price $ </label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" name="price"
                                        onChange={handleChange}
                                        onBlur={(e) => validatePrice(e.target.value)} />
                                    {!valid.price &&
                                        <span className="text-danger">{valid.priceError}</span>}
                                </div>
                            </div>
                            <br />

                            <div className="product__field">
                                    <label>Image</label>
                                    <input type="file" className="product__input" name="image"
                                    onChange={onFileChange}/>
                                    <br />
                                </div>
                            <div className="row">
                                <div>
                                    <button type="submit" class="btn btn-primary"
                                        onClick={AddCart}>Save</button>
                                    <Link class="btn btn-primary" to="/dashboard" role="button">Back</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

