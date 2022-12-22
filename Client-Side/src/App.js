import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import Login from './Component/Login';
import Home from './Component/Home';
import { ToastContainer } from 'react-toastify';
import UserSignup from './Component/UserSignup'
import Cart from './Component/Cart'
import AddCart from './Component/AddCartList';
import EditCart from './Component/Editcart'
import ViewAll from './Component/ViewAll';
import Search from './Component/Search';
import Success from './Component/Success';
import Checkoutf from './Component/Checkoutf';
import ForgotPassword from './Component/ForgotPassword'
import ResetPassword from './Component/ResetPassword'


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
       <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usersignup" element={<UserSignup />} />  
        <Route exact path="/addcart" element={<AddCart />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/viewall" element={<ViewAll />} />
        <Route exact path="/edit/:id" element={<EditCart />} />
        <Route exact path="/Search/:input" element={<Search />} />
        <Route exact path="/success/:id" element={<Success />} />
        <Route exact path="/checkout/:id" element={<Checkoutf />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/resetpassword" element={<ResetPassword />} />
       </Routes>

    </div>
  );
}

export default App;
