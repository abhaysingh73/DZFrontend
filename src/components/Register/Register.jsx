import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate, NavLink } from 'react-router-dom';
import "./Register.css";

const RegistrationPage = () => {
    const contactNameRef = useRef(null);
    const [formData, setFormData] = useState({
        contactName: '',
        companyName: '',
        email: '',
        services: ['order_mgmt','digital_card'],
        role: ''
        // , password: '' 
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        contactNameRef.current.focus();
    }, []);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'services') {
            let updatedServices = [...formData.services];
            if (checked) {
                updatedServices.push(value);
            } else {
                updatedServices = updatedServices.filter(service => service !== value);
            }
            setFormData({ ...formData, services: updatedServices });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.contactName) newErrors.contactName = "Full name cannot be blank.";
        if (!formData.companyName) newErrors.companyName = "Company name cannot be blank.";
        if (!formData.email) newErrors.email = "Email cannot be blank.";
        // if (!formData.password) newErrors.password = "Password cannot be blank.";
        if (formData.services.includes("order_mgmt") && !formData.role) {
            newErrors.role = "Role is required for Order Management.";
        }
        if (formData.services.length === 0){
            newErrors.services = "Please select atleast one service to continue."
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            formData.name = formData.contactName;
            axios
                .post("http://localhost:5000/api/onboard/submit", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log("Form Submitted:", response.data);
                    toast.success("Registered successfully! Please use the password sent to your registered email id to login.");
                    navigate('/login');
                })
                .catch((error) => {
                    if (error?.response?.data?.error?.indexOf("email_1 dup key") > -1) {
                        toast.error("Email already registered");
                    } else if (error?.message) {
                        toast.error(`Error - ${error.message}`);
                    } else {
                        toast.error("There was an error submitting the form. Please try again.");
                    }
                });
        } else {
            toast.error("Form has errors. Please check and try again.");
        }
    };

    const isOrderMgmtSelected = formData.services.includes("order_mgmt");

    return (
        <div className="container-fluid vh-100">
            <div className="row h-100">
                <div className="col-lg-6 d-none d-lg-block bg-primary text-white">
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <h1 className="text-center">Welcome to AC</h1>
                    </div>
                </div>

                <div className="col-lg-6 d-flex justify-content-center bg-light">
                    {/* align-items-center */}
                    <div className="w-75">
                        <div className="loginRedirect">Already have an account? <NavLink to="/login">Sign In</NavLink></div>
                        <br></br>
                        <h2 className="text-center mb-4">Sign up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="contactName" className="form-label">Full Name</label>
                                <input ref={contactNameRef} type="text" className="form-control" id="contactName" placeholder="Enter your full name" name="contactName"
                                    value={formData.contactName} onChange={handleChange} />
                                {errors.contactName && <div className="text-danger">{errors.contactName}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="companyName" className="form-label">Company Name</label>
                                <input type="text" className="form-control" id="companyName" placeholder="Enter your company name" name="companyName"
                                    value={formData.companyName} onChange={handleChange} />
                                {errors.companyName && <div className="text-danger">{errors.companyName}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" name="email"
                                    value={formData.email} onChange={handleChange} />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Create a password" name="password"
                                    value={formData.password} onChange={handleChange} />
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                            </div> */}

                            {/* Service Selection */}
                            <div className="mb-3">
                                <label className="form-label">Choose Services</label>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="digital_card"
                                        name="services"
                                        value="digital_card"
                                        checked={formData.services.includes("digital_card")}
                                        onChange={handleChange}
                                        className="form-check-input"
                                    />
                                    <label htmlFor="digital_card" className="form-check-label">Digital Card</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="order_mgmt"
                                        name="services"
                                        value="order_mgmt"
                                        checked={formData.services.includes("order_mgmt")}
                                        onChange={handleChange}
                                        className="form-check-input"
                                    />
                                    <label htmlFor="order_mgmt" className="form-check-label">Order Management</label>
                                </div>
                                {errors.services && <div className="text-danger">{errors.services}</div>}
                            </div>

                            {/* Role Field (Conditional) */}
                            {isOrderMgmtSelected && (
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Your Role</label>
                                    <select
                                        className="form-select"
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled={true}>Select Your Role</option>
                                        <option value="sales_executive">Sales Executive</option>
                                        <option value="analyst">Analyst</option>
                                        <option value="admin">Admin / Boss</option>
                                    </select>
                                    {errors.role && <div className="text-danger">{errors.role}</div>}
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary w-100">Continue</button>
                        </form>
                        By creating an account, you agree to the <a href='/t&c'>Terms of Service.</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
