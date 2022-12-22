import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getproductdetail, updatestore } from "../services/auth.services";


function Editcart() {
    let { id } = useParams();
    const navigate = useNavigate();
    // const [data, setData] = useState([]);

    const [input, setInput] = useState({
        title: "",
        price: "",
        category: "",
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((previousValue) => ({
            ...previousValue,
            [name]: value
        }));
    };

    useEffect(() => {
        const test = async (id) => {
            const response = await getproductdetail(id);
            setInput(() => ({
                title: response.data.data.title,
                price: response.data.data.price,
                category: response.data.data.category,
                description: response.data.data.description,
            }))
        }
        test(id);
    }, )

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Run update code here");
        const updateResponse = await updatestore(input,id);
        if (updateResponse.data.status===true) {
            navigate("/cart");
        } else {
            alert("update failed");
        }
        console.log(updateResponse,"updateResponse");
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6" style={{ width: '100%' }}>
                    <form className="form-control" onSubmit={(e) => handleSubmit(e)}>
                        <h3>Add Cart</h3>
                        <br />
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label>ProductName</label>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={input.title}
                                        name="productname"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Description</label>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="author"
                                        value={input.description}
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
                                        value={input.price}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <br />

                              
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Rating </label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" name="price"
                                        value={input.price}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div>
                                    <div>
                                        <button type="submit"
                                            class="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Editcart;