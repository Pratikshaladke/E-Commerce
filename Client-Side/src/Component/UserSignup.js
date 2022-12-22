import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupuser } from '../services/auth.services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Signup() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        fullname: "",
        mobile: "",
        email: "",
        password: "",
        address: "",
        image: null

    });
    console.log(input, "input")
    const [valid, setValid] = useState({
        fullname: true,
        lastname: true,
        mobile: true,
        email: true,
        password: true,
        address: true,
        fullnameError: "",
        lastnameError: "",
        mobileError: "",
        emailError: "",
        passwordError: "",
        addressError: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((previousValue) => ({
            ...previousValue,
            [name]: value

        }));

    };

    const validatefullname = (fullname) => {
        if (fullname.length === 0) {
            setValid((previousValue) => ({
                ...previousValue,
                fullname: false,
                fullnameError: "Please Enter First Name"
            }))
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                fullname: true,
                fullnameError: ""
            }))
        }
    }

    const validateMobile = (mobile) => {
        if (mobile.length === 0) {
            setValid((previousValue) => ({
                ...previousValue,
                mobile: false,
                mobileError: "Please Enter Mobile Number"
            }))
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                mobile: true,
                mobileError: ""
            }))
        }
    }
    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailIsValid = pattern.test(email);

        if (emailIsValid) {
            setValid((previousValue) => ({
                ...previousValue,
                email: true,
                emailError: ""
            }))
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                email: false,
                emailError: "Please Enter Valid Email"
            }))
        }
    }
    const validatePassword = (password) => {
        if (password.length === 0) {
            setValid((previousValue) => ({
                ...previousValue,
                password: false,
                passwordError: "Please Enter Passoword"
            }))
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                password: true,
                passwordError: ""
            }))
        }
    }

    const validateAddress = (address) => {
        if (address.length === 0) {
            setValid((previousValue) => ({
                ...previousValue,
                address: false,
                addressError: "Please Enter Address"
            }))
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                address: true,
                addressError: ""
            }))
        }
    }


    const onFileChange = (e) => {
        setInput((previous) => ({
            ...previous,
            image: e.target.files[0],
        }))
    }

    const signupUser = async (e) => {
        e.preventDefault();
        const fromdata = new FormData()
        fromdata.append("fullname", input.fullname);
        fromdata.append("mobile", input.mobile);
        fromdata.append("email", input.email);
        fromdata.append("password", input.password);
        fromdata.append("address", input.address);
        fromdata.append("image", input.image);
        try {
            const response = await signupuser(fromdata);
            console.log("submited data==>", response.data)
            if (response.data.status === true) {
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                navigate("/login")
            } else {
                toast.warning(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
        catch (err) {
            console.warn(err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/login")
    }


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-3" style={{ width: '100%', height: '80vh' }}>
                    <form className="form-group" onSubmit={(e) => handleSubmit(e)}>
                        <h3><b>Signup Form</b></h3>
                        <br />
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label>FullName : </label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" name="fullname" onChange={handleChange} onBlur={(e) => validatefullname(e.target.value)} />
                                    {!valid.fullname && <span className="text-danger">{valid.fullnameError}</span>}
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col-md-4">
                                    <label>Mobile</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="mobile" className="form-control" name="mobile" onChange={handleChange}
                                        onBlur={(e) => validateMobile(e.target.value)} />
                                    {!valid.mobile && <span className="text-danger">{valid.mobileError}</span>}
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col-md-4">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="email" className="form-control" name="email" onChange={handleChange}
                                        onBlur={(e) => validateEmail(e.target.value)} />
                                    {!valid.email && <span className="text-danger">{valid.emailError}</span>}
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col-md-4">
                                    <label>Password</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="password" className="form-control" name="password" onChange={handleChange}
                                        onBlur={(e) => validatePassword(e.target.value)} />
                                    {!valid.password && <span className="text-danger">{valid.passwordError}</span>}
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col-md-4">
                                    <label>Address</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text"
                                        className="form-control"
                                        name="address"
                                        onChange={handleChange}
                                        onBlur={(e) => validateAddress(e.target.value)}
                                    />
                                    {!valid.address && <span className="text-danger">{valid.addressError}</span>}
                                </div>
                            </div>
                            <br />

                            <div className="product__field">
                                <label> Image</label>
                                <input type="file" className="product__input" name="image"
                                    onChange={onFileChange}
                                />

                                <br />
                            </div>
                            <div className="row">
                                <div>
                                    <button type="submit" class="btn btn-primary" onClick={signupUser} >SignUp</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}