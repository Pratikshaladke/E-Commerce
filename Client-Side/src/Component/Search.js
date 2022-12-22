import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchData } from "../services/auth.services";
import { add } from "../Slice/storeSlice";
import { useDispatch } from "react-redux";

export default function Search() {
  const { input } = useParams();

  const [list, setList] = useState([]);
  console.log(list, "list")

  useEffect(() => {
    const api = async () => {
      const res = await searchData(input);
      console.log("res", res.data.Result)
      setList(res.data.Result)
    };
    api();
  }, [input]);

  //add to cart
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);

  const handleAdd = (product) => {
    dispatch(add(product));
  };


  return (
    <>
      <div className="row" id="ads">
        {list.map((data) => {
          let path = `http://localhost:2345/upload/${data.image}`;

          // console.log("data", path);
          return (
            <div className="col-md-4">
              <div className="card rounded">
                <div className="card-image">
                  <span className="card-notify-badge"></span>

                  <img className="img-fluid" src={path} alt="Alternate Text" />
                </div>
                <div className="card-image-overlay m-auto">
                  <span className="card-detail-badge">price ${data.price}</span>
                  <br />
                  <span className="card-detail-badge">
                    rating:{data.rating}
                  </span>
                </div>
                <div className="card-body text-center">
                  <div className="ad-title m-auto">
                    <h5>{data.productName}</h5>
                  </div>
                  <a className="ad-btn" href="#" onClick={() => handleAdd(product)}>
                    Add To Cart
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}