import { Link } from 'react-router-dom';
import { useState } from "react";
import { useSelector, } from "react-redux";
import { useDispatch } from "react-redux";
import { userlogout } from '../Slice/authSlice'
import { useNavigate } from "react-router-dom";

function Navbar() {

    const [input, setInput] = useState({
        input: ""
    });

    const dispatch = useDispatch();
    let navigate = useNavigate();
    //logout
    const handellogout = () => {
        dispatch(userlogout());
        localStorage.clear();
        navigate("/");
    }

    //search
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/Search/${input}`)
    }

    //add to cart
    const userdata = useSelector((state) => (state.auth));
    // console.log("userdata nav", userdata)
    const selector = useSelector((state) => state.cart);
    return (

        <header id="header ">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>

                    {/* icon */}
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />


                    <img src="https://images-platform.99static.com//y0rb96b9CUsj6F8lqnkVOPlBuyY=/0x0:999x999/fit-in/500x500/99designs-contests-attachments/109/109048/attachment_109048124"
                        className="img-fluid" alt="Sample image" width="70px" height="4 %" style={{ marginLeft: "-3em", width: "5%", height: "2%" }} />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* search */}
                    <form className="d-flex"
                        style={{ marginLeft: "3rem" }}
                        onSubmit={(e) => handleSubmit (e)}>
                        <input className="form-control me-2"
                            type="search" placeholder="Search "
                            aria-label="Search" name="search"
                            onChange={(e) => { setInput(e.target.value) }}
                        />
                        <button type="submit" className="btn btn-outline-info">Search</button>
                    </form>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Link</Link>
                            </li>
                        </ul>
                        <nav className="navbar navbar-expand-lg navbar-dark ">
                            <div className="container">

                                <button className="navbar-toggler" type="button"
                                    data-toggle="collapse" data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className='text-right'>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav ml-auto " >
                                            {userdata.isLoggedIn ? (
                                                <div>
                                                    <Link to="/"> <button className="btn btn-outline-info"><i class="fa fa-home"></i></button></Link>&nbsp;
                                                    <Link to="/cart"> <button className="btn btn-outline-info" ><i class="fa fa-shopping-cart"></i>{selector.length}</button></Link>&nbsp;

                                                    <button className="btn btn-outline-info"
                                                        onClick={handellogout}><i class="fa fa-sign-out"></i></button>
                                                </div>
                                            ) : (
                                                <div>

                                                    <Link to="/login"><button className="btn btn-outline-info" ><i class="fa fa-sign-out"></i>Login</button></Link>&nbsp;
                                                    <Link to="/usersignup"> <button className="btn btn-outline-info" >Signup</button></Link>&nbsp;

                                                </div>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </nav>

                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Navbar;

