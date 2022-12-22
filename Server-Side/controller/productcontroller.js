import mongoose from "mongoose";
import product from '../model/product'
const stripe = require('stripe')('sk_test_51LjhGwSFMwSGki3NKRT0rz3S3bqlhg4lXaU8j6luiAXojNBbMOPbWRTasm0BimTDXVtw9dFWQEyMzRN9pws0eZQV00adWsDV8o')


export const AddProduct = async (req, res) => {
  const storeData = new product(
    {
      productname: req.body.productname,
      price: req.body.price,
      rating: req.body.rating,
      description: req.body.description,
      image: req.file.filename
    }
  );
  const newStore = await storeData.save();
  res.send({ status: true, message: "successfull", result: newStore })
}

export const List = async (req, res) => {
  const list = await product.find({})

  for (let key in list) {
    list[key].image = `http://localhost:2000/upload/${list[key].image}`
  }
  res.send({
    status: true,
    message: "store add",
    result: list
  })
}

//Search product----------------------------------------
export const searchProduct = async (req, res) => {
  try {
    const list = await product.find({ productname: { $regex: req.body.input } });
    console.log(list)
    if (list) {
      res.send({ status: true, messgae: "Search Product", Result: list });
    }
  }
  catch (e) {
    console.log(e)
  }
}

export const Delete = async (req, res) => {
  const { _id } = req.params
  try {
    product.deleteOne({ _id: mongoose.Types.ObjectId(_id) },
      (error, result) => {
        if (error) {
          res.send({
            status: 404,
            message: "ERROR",
            result: error
          })
        }
        else {
          res.send({
            status: 200,
            message: "Success",
            result: result
          })
        }
      }
    )
  }
  catch (e) {
    throw e
  }
}


export const payment = async (req, res) => {
  const { productname, price, order_id } = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productname,
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/success/${order_id}`,
    cancel_url: 'http://example.com/cancel'
  });
  console.log("session", session)
  res.send({ status: 200, message: "SUCCESS", result: session })
}


