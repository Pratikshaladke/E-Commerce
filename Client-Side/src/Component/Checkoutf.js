import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { orderproduct, payment } from "../services/auth.services";
import { useSelector } from "react-redux";

export default function Checkoutf() {

  let { id } = useParams();
  console.log("id", id);
  const [data, setdata] = useState("");
  const userdata = useSelector((state) => (state.cart));
  // console.log(userdata, "userdata");
  
  const userdatas = useSelector((state) => (state.auth.data._id));
  // console.log(userdatas,"userdatas")

  useEffect(() => {
    const show = async () => {
      setdata({
        userid: userdatas,
        productname: userdata[0].productname,
        price: userdata[0].price,
        productId:userdata[0]._id,
      });
    };
    show();
  }, []);

  const buyProduct = async (e, data) => {
    e.preventDefault();
    console.log("payment", data);
    const resp = await orderproduct(
      data.userid, 
      data.productname,
      data.productId,
      data.price
    );
   
    let id = resp.data.result._id;
    const res = await payment(data.productname, data.price, id);
    if (res.data.result) {
      window.location.href = res.data.result.url;
    }
    console.log("res", res);
  };
  return (
    <>
   
      <div>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 my-5">
              <div className="card my-4">
                <img
                  src="https://image.shutterstock.com/image-vector/concepts-online-payment-methods-payments-260nw-1212042409.jpg"
                  className="img-fluid"
                  alt=""
                  width="200px"
                  align-item="center"
                  style={{height:"10rem",width:"20rem"}}
                />
                <div className="card-body text-center">
                  <h5 className="card-productname">{data.productname}</h5>
                  <div className="alert alert-light row plan ">
                    <div className="col-md-12">
                      <div>Price: ${data.price}</div>
                    </div>
                  </div>
                  <div className="row ">
                    <button
                      className="btn btn-primary col-12 buy-now-btn"
                      onClick={(e) => buyProduct(e, data)}
                    >
                      Proceed to payement
                    </button>
                    <Link to="/cart">
                      {" "}
                      <span className="text-secondary h6 d-block">
                        Cancel Order
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}