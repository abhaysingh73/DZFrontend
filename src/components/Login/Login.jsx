// import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../Api";
import { useUser } from "../../UserContext";

const Login = () => {
    const { user, fetchUser } = useUser();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            navigate('/home');
        }
    },[user, navigate]);

    const setFormValue = (e, key) => {
        setFormData((prevData) => {
            return { ...prevData, [key]: e.target.value };
        });
    };

    const login = (e) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            API.post("/api/onboard/login", formData)
                .then( async (response) => {
                    if (response.data.success) {
                        localStorage.setItem("accessToken", response.data.accessToken);
                        toast.success('Logged in successfully');
                        await fetchUser();
                        navigate('/home');
                    } else {
                        toast.fail('Login failed');
                    }
                })
                .catch((error) => {
                    toast.error(`Login failed : ${error.message}`)
                });
        }
    };

    return (
        <div
            className="container text-center"
            style={{
                maxWidth: "350px",
                position: "relative",
                top: "70px",
            }}
        >
            <h3>Sign in to AC</h3>
            <div
                style={{
                    border: "1px solid #c8c8c8",
                    borderRadius: "15px",
                    padding: "20px",
                }}
            >
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) => setFormValue(e, "email")}
                        />
                        {/* <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(e) => setFormValue(e, "password")}
                        />
                        <div
                            style={{
                                fontSize: "12px",
                                float: "right",
                            }}
                        >
                            <a href="/">Forgot Password?</a>
                        </div>
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Remember Me
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => login(e)}
                        disabled={
                            formData.email.length === 0 || formData.password.length === 0
                        }
                    >
                        Login
                    </button>
                </form>
            </div>
            <div
                style={{
                    marginTop: "10px",
                    border: "1px solid #c8c8c8",
                    borderRadius: "15px",
                    padding: "20px",
                }}
            >
                New here? <NavLink to="/register">Create an account</NavLink>
            </div>
        </div>
    );
};

export default Login;
