import express from 'express';
const app = express();
import bodyParser from 'body-parser';

import user from './route/user';
import product from './route/product'
import slider from './route/slider'
import order from './route/order'

import cors from 'cors'
import { mongoconn } from './db';
mongoconn();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({

    extended: true

}));

app.use("/user",user)
app.use("/product",product)
app.use("/slider",slider)
app.use("/order",order)

app.use("/upload",express.static("uploads"))

export default app;
