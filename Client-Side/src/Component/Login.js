import { login } from "../services/auth.services";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userlogin } from "../Slice/authSlice";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

export default function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        'email': '',
        'password': '',
    });

    //validation
    const [valid, setValid] = useState({
        email: true,
        password: true,
        emailError: "",
        passwordError: ""
    });


    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex email
        const emailIsvalid = pattern.test(email);
        if (emailIsvalid) {
            setValid((previousValue) => ({
                ...previousValue,
                email: true,
                emailError: "",
            }));
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                email: false,
                emailError: "Please enter your email",
            }));
        }
    };

    const validatePassword = (password) => {
        if (password.length === 0) {
            setValid((previousValue) => ({
                ...previousValue,
                password: false,
                passwordError: "Please enter your password",
            }));
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                password: true,
                passwordError: "",
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(input);
            if (response.data.status === true) {
                dispatch(userlogin(response.data.result));
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_LEFT
                });
                navigate("/");
            } else {
                toast.danger(response.data.message, {
                    position: toast.POSITION.TOP_LEFT
                });
            }
        } catch (e) {
            console.warn(e);
        }
    }



    return (
        <div className="container my-5">
            <div className="row my-5">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form className="form-control " style={{ marginTop: "7rem", marginBottom: "11.3rem" }}
                        onSubmit={(e) => handleSubmit(e)}>
                        <h3><u>Login Form</u></h3>
                        <br />
                        <div className="form-group">

                            <div className="row">
                                <div className="col-md-4">
                                    <label>Email:</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="email"
                                        className="form-control"
                                        placeholder="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={(e) => validateEmail(e.target.value)}
                                    />
                                    {!valid.email && <span className="text-danger">{valid.emailError}</span>}
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col-md-4">
                                    <label>Password:</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="password"
                                        className="form-control"
                                        placeholder="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={(e) => validatePassword(e.target.value)}
                                    />
                                    {!valid.password && <span className="text-danger">{valid.passwordError}</span>}
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <Link to="/forgotpassword">Forgot Password?</Link>
                                <div><br />
                                    <button type="submit"
                                        class="btn btn-dark" >Login</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}