import React, { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useState } from 'react'
import { productlist} from "../services/auth.services";

import { Card } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { add } from "../Slice/storeSlice";

export default function ViewAll() {
    const nav = useNavigate();
    const [show, setShow] = useState([]);
    
    const showForm = () => {
        nav("/addcart")
    }

    useEffect(() => {
        const showList = async () => {
            const result = await productlist()
            const arr = result.data.result;
            setShow(arr);
        }
        showList();
    }, [])




    const dispatch = useDispatch();
    const [product, setProduct] = useState([]);

    const handleAdd = (product) => {
        dispatch(add(product));
    };

    return (
        <div>

            <br />
            <div className="d-flex justify-content-around">

            </div><br />
            <h3>Product List</h3>
            <div className="row d-flex justify-content-center align-items-center">
                {show.map((data) => {
                    return (
                        <>
                            <Card style={{ width: '22rem', border: "none" }} className="mx-2 mt-4 card_style">
                                <Card.Img variant="top" src={data.image} style={{ height: "7rem" }} className="my-3" />
                                <Card.Body>
                                    <Card.Title>{data.productname}</Card.Title>
                                    <Card.Text>
                                        Price : ₹ {data.price}
                                    </Card.Text>
                                    <Card.Text>
                                        Rating: {data.rating}
                                    </Card.Text>
                                    <Card.Text>
                                        Description: {data.description}
                                    </Card.Text>
                                    <button className="siCheckButton" onClick={() => handleAdd(product)} >Add to cart</button>

                                </Card.Body>
                            </Card>
                        </>
                    )
                })
                }
            </div>
        </div>

    )
}

