import axios from "axios";
import { getAdminInfo } from './Auth.Header';
const TOKEN = getAdminInfo();

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': TOKEN
    }
}
const API_URL = "http://localhost:2000/";

//----------------------------- Adminlogin ---------------------------------
export const login = async ({ email, password }) => {
    try {
        const response = await axios.post(API_URL + "user/userlogin", {
            email,
            password
        }, axiosConfig)
        if (response.data.status) {
            localStorage.setItem('users', JSON.stringify(response.data));

            return response
        } else {
            return response;
        }

    } catch (e) {
        return null;
    }
}
//.............................ADMINSIGNUP.............
export const signupuser = async (fromdata) => {
   console.log(fromdata,"fromda")
    return await axios.post(API_URL + "user/userSignup",
        
     fromdata
        , axiosConfig)
}

export const addcart = async (fromdata) => {
    return await axios.post(API_URL + "product/AddProduct", fromdata, axiosConfig)
}

export const productlist = async () => {
    console.log(productlist, "list")
    return await axios.get(API_URL + "product/List", axiosConfig)
}

export const deletebook = async (_id) => {
    return await axios.delete(
        API_URL + `product/Delete/${_id}`, axiosConfig)
}

export const getproductdetail = async (_id) => {
    console.log("_id", _id)
    return axios.get(API_URL + `product/productDetailById?_id=${_id}`, axiosConfig)
}

export const updatestore = async (data, _id) => {
    console.log(data);
    return await axios.put(API_URL + "product/UpdateStore", {
        _id,
        productname: data.productname,
        price: data.price,
        rating: data.rating,
        description: data.description
    }, axiosConfig)

}

//productsearch
export const searchData = async (input) => {

    try {
        return await axios.post(API_URL + "product/searchProduct", {input}, axiosConfig)
    }
    catch (e){
      console.log(e)
    }

}

//sliderimages
export const sliderImage = async () => {
    return axios.get(API_URL + "slider/list", axiosConfig)
}

//orderproduct
export const orderproduct = async (userid, productname,productId, price) => {

    try {
      return axios.post(API_URL + "order/AddOrder", { userid, productname,productId, price }, axiosConfig);
    }
    catch (err) {
      console.log(err);
    }

};

//payment
export const payment = async (productname, price,order_id) => {
    try {
      const response = await axios.post(API_URL + "product/payment", { productname, price,order_id }, axiosConfig);

      console.log("response", response)

      return response;

    } catch (e) {

      console.log("Error", e);

    }

}

export const updateOrder = async (id) => {
    return await axios.put(API_URL + "order/UpdateOrder", {
        id,
    }, axiosConfig)
}
  
//--------------------------Forgot password ----------------------
export const Sendmail=async(email)=>
{    console.log(email,"email")

    return await axios.post(API_URL + "user/forgetpassword" 
    ,{email}
    , axiosConfig)
}

//--------------------------Reset Password ----------------------
export const setPassword=async(password,confirm_password,id,token)=>
{    console.log(Sendmail)

    return await axios.post(API_URL + `user/userPasswordReset/${id}/${token}`
    ,{
        password,
        confirm_password}
    , axiosConfig)
}
