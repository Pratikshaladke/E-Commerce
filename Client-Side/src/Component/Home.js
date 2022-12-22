import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react'
import { productlist, sliderImage } from "../services/auth.services";
import 'react-toastify/dist/ReactToastify.css';
import { add } from "../Slice/storeSlice";
import { useDispatch } from "react-redux";
import { Card } from 'react-bootstrap'

export default function Home() {

    const nav = useNavigate();
    const [show, setShow] = useState([]);

    const showForm = () => {
        nav("/addcart")
    }

    //sliderimages
    const [slide, setSlide] = useState([]);
    //sliderlist
    useEffect(() => {
        const imagelist = async () => {
            const result = await sliderImage()
            const arr = result.data.result;
            setSlide(arr);
            console.log(arr, "arr")
        }
        imagelist();
    }, [])

    //productlist
    useEffect(() => {
        const showList = async () => {
            const result = await productlist()
            const arr = result.data.result;
            setShow(arr);
            // console.log(arr)
        }
        showList();
    }, [])

    const dispatch = useDispatch();

    const handleAdd = (product) => {
        dispatch(add(product));
    };

    const [showPerPage] = useState(6)
    const[pagination]  = useState({
        start:0,
        end:showPerPage,
    })
    return (
        <div className="container mt-3">
            <div
                id="carouselExampleControls"
                class="carousel slide"
                data-bs-ride="carousel"
            >
                <div class="carousel-inner">
                    {slide.map((picture) => {
                        let path = `http://localhost:2000/upload/${picture.image}`
                        return (
                            <div class="carousel-item active" >
                                <img src={path} alt="" style={{ height: "60vh", width: "120vh", marginLeft: "5vh" }} />
                            </div>
                        )
                    })}
                </div>
                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                >
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next"
                    type="button"
                    background-color="black"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                >
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden"> Next</span>
                </button>
            </div><br />

            {/* prouductlist */}
            <div className="d-flex justify-content-around">
                <Link to="/viewall"> <button className=" btn btn-outline-info" style={{ position: "center" }}
                    onClick={showForm}> View All
                </button></Link>
            </div><br />

            <div className="row d-flex justify-content-center align-items-center">
                {show.slice(pagination.start,pagination.end).map((product) => {
                    return (
                        <>
                            <Card style={{ width: '22rem', border: "none" }} className="mx-2 mt-4 card_style">
                                <Card.Img variant="top" src={product.image} style={{ height: "10rem" }} className="my-3" />
                                <Card.Body>
                                    <Card.Title>{product.productname}</Card.Title>
                                    <Card.Text>
                                        Price : ₹ {product.price}
                                    </Card.Text>
                                    <Card.Text>
                                        Rating: {product.rating}
                                    </Card.Text>
                                    <Card.Text>
                                        Description: {product.description}
                                    </Card.Text>
                                    <div className="button_div d-flex justify-content-center">
                                    </div>
                                    {/* <Link to="/cart"> */}
                                    <button className="siCheckButton" onClick={() => handleAdd(product)} >Add to cart</button>
                                    {/* </Link> */}
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



