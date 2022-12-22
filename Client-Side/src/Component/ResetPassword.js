import React from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react';
import { setPassword } from '../services/auth.services';
import { useLocation } from 'react-router';
import {Container} from 'react-bootstrap'

export default function Setpassword() {

    const location = useLocation();
    let queryPath = location.search;
    const params = new URLSearchParams(queryPath);
    const searchKeyData = params.get("userId") ? params.get("userId") : "";
    console.log(searchKeyData);
    const tokensearch = params.get("token") ? params.get("token") : "";
    console.log(tokensearch);

    const [input, setInput] = useState({
        password: "",
        confirm_password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((previousValue) => ({
            ...previousValue,
            [name]: value
        }));
    };

    const reset = async () => {
        await setPassword(input.password, input.confirm_password, searchKeyData, tokensearch)
    }

    return (
        <>
        <Container>
                        <section className="login_section " width="100px">
                <div className="container col-md-6" >
                    <div className="row">
                        {/* <div className="col-lg-6"> */}
                        <div className="col-lg-8 offset-lg-2">
                            <div className="login_card" width="100px" height="70px">
                                <div className="login_form text-center" width="50px">
                                    <input placeholder="New Password" name="password" onChange={(e) => handleChange(e)} /><br />
                                    <input placeholder="Confirm Password" name="confirm_password" onChange={(e) => handleChange(e)} /><br />
                                    <Link to="/userlogin" className="active">
                                        <button type="button" className="btn btn-primary w-100 theme-btn mx-auto" onClick={reset} >Reset </button></Link>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </Container>

        </>
    )
}