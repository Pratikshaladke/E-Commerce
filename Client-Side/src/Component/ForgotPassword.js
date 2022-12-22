import React, { useState } from 'react'
import { Sendmail } from '../services/auth.services';

export default function Forgot() {

    const [input, setInput] = useState({
        email: " ",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((previousValue) => ({
            ...previousValue,
            [name]: value
        }));
    };

    const resetpassword = async () => {
        console.log(input.email, "input")
        await Sendmail(input.email)
    }
    return (
        <>

            <section className="login_section " width="100px">
                <div className="container col-md-6" >
                    <div className="row">
                        <div className="col-lg-6 offset-lg-2">
                            <div className="forgotform">
                                <div className="login_form text-center">
                                    <form >
                                        <h4>Forgot Password</h4> <hr />
                                        <input className="w-100" placeholder="Enter your email" name="email" onChange={(e) => handleChange(e)} /><br /><br />
                                        <button className="btn btn-primary w-100  " type="button" onClick={resetpassword} >Send Mail</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}





