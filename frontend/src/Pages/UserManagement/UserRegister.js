import React, { useState } from 'react';
import Logo from "./../../Components/NavBar/img/logo.png";

import { IoMdAdd } from "react-icons/io";
function UserRegister() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: '',
        bio: '', // Added bio field
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!formData.email) {
            alert("Email is required");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert("Email is invalid");
            isValid = false;
        }



        if (!isValid) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('User registered successfully!');
                setFormData({ fullname: '', email: '', password: '', phone: '', bio: '' });
                window.location.href = '/'
            } else if (response.status === 409) {
                alert('Email already exists!');
            } else {
                alert('Failed to register user.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className="Auth_container">
                <div className="Auth_innerContainer">
                    <div className="Auth_content">
                        <div className="Auth_content_img_reg"></div>
                    </div>
                    <div className="new_content_reg">
                        <div className='login_content'>
                            <div
                                    className="logoo"
                                    style={{
                                      backgroundImage: `url(${Logo})`,
                                      width: "300px",
                                      height: "100px",
                                      backgroundSize: "contain",
                                      backgroundPosition: "center",
                                      backgroundRepeat: "no-repeat",
                                      margin: "0 auto",
                                    }}
                                  />
                            <p className="Auth_heading">To get your passprt to the NATURE, Please SIGN UP!</p>
                        </div>
                        <br/>
                        <form onSubmit={handleSubmit} className="Auth_form_reg">
                            <div className='from_con_add'>
                                <div className="Auth_formGroup">
                                    <label className="Auth_label">Full Name</label>
                                    <input
                                        className="Auth_input"
                                        type="text"
                                        name="fullname"
                                        placeholder="Full Name"
                                        value={formData.fullname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="Auth_formGroup">
                                    <label className="Auth_label">Email Address</label>
                                    <input
                                        className="Auth_input"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='from_con_add'>
                                <div className="Auth_formGroup">
                                    <label className="Auth_label">Password</label>
                                    <input
                                        className="Auth_input"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="Auth_formGroup">
                                    <label className="Auth_label">Phone</label>
                                    <input
                                        className="Auth_input"
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const re = /^[0-9\b]{0,10}$/;
                                            if (re.test(e.target.value)) {
                                                handleInputChange(e);
                                            }
                                        }}
                                        maxLength="10"
                                        pattern="[0-9]{10}"
                                        title="Please enter exactly 10 digits."
                                        required
                                    />
                                </div>
                            </div>
                            <div className="Auth_formGroup">
                                <label className="Auth_label">Bio</label>
                                <textarea
                                    className="Auth_input"
                                    name="bio"
                                    placeholder="Write something about yourself"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="Auth_button">Register</button>
                            <p className="Auth_signupPrompt">
                                You have an account? <span onClick={() => (window.location.href = '/')} className="Auth_signupLink">Sign now</span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRegister;
