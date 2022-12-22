import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { remove, increment, decrement } from "../Slice/storeSlice"
import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"


export default function Cart() {

    const selector = useSelector((state) => state.cart);
    console.log("selector", selector)

    const dispatch = useDispatch();
    const handleRemove = (product) => {
        dispatch(remove(product));
    }
    return (
        <>
            <div style={{ marginTop: "5rem", marginBottom: "4rem" }}>
                <div className="row d-flex justify-content-center align-items-center">
                    {
                        selector.map((product) => {

                            return (
                                <>
                                    <Card style={{ width: '22rem', border: "none" }} className="mx-2 mt-4 card_style">
                                        <Card.Img variant="top" src={product.image} style={{ height: "11rem" }} />
                                        <Card.Body>
                                            <Card.Title>{product.productname}</Card.Title>
                                            <Card.Text>
                                                Price : ₹ {product.price}
                                            </Card.Text>
                                            <Card.Text>
                                                Rating : {product.rating}
                                            </Card.Text>
                                            <Card.Text>
                                                Description : {product.description}
                                            </Card.Text>
                                            <div className="button_div d-flex justify-content-center">
                                            </div>
                                            <button className="btn" onClick={() => handleRemove(product._id)}>Remove</button>
                                            <Link to={`/checkout/${product._id}`}><button className="order-online">Checkout</button></Link>
                                            <button className="btn">
                                                <button
                                                    className="btn"
                                                    onClick={() => dispatch(decrement(product._id))}
                                                >-</button>
                                                {product.quantity}
                                                <button
                                                    className="btn"
                                                    onClick={() => dispatch(increment(product._id))}
                                                >+</button>
                                            </button><br />
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}