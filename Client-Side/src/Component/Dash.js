import React, { useState, useEffect } from "react";
import { storelist, searchProduct } from "../service/authservice";
import "./Product.css";
import { add } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import Navbar from "../component/Navbar"
export default function Product() {
  const dispatch = useDispatch();



 const [product, setProduct] = useState([]);



 useEffect(() => {
    const showList = async () => {
      const result = await storelist();
      console.log(result, "result");
      const arr = result.data.result;
      console.log(arr);
      setProduct(arr);
    };
    showList();
  }, []);
  console.log(product);



 const handleAdd = (product) => {
    dispatch(add(product));
  };
  // const[searchdata,setsearchdata] = useState([])
  // console.log(searchdata, "<=== search Data")



 const searchHandler = async (e) => {
    const response = await searchProduct(e);
    console.log(response.data.result, "response");
    setProduct(response.data.result);
  };



 return (
    <>
      <Navbar/>
      <form class="d-flex" style={{ backgroundSize: "10rem" }}>
        <input
          class="form-control"
          type="search"
          placeholder="Search"
          onChange={(e) => searchHandler(e.target.value)}
          aria-label="Search"
        />
      </form>
      <div className="productwrapper">
        {product.map((product) => {
          let path = `http://localhost:9898/upload/${product.image}`;
          console.log(path);
          return (
            <div className="card" key={product.id}>
              <img
                style={{ width: "15rem", height: "7rem" }}
                src={path}
                alt=""
              />
              <h4>{product.title}</h4>
              <h5>{product.price}</h5>
              <h5>{product.rating}</h5>
              <h5>{product.description}</h5>
              <button onClick={() => handleAdd(product)} className="btn">
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}