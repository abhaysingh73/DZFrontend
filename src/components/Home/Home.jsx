import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>

            {/* ✅ Section 1: Welcome */}
            <section className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
                <div className="row w-100 vh-100">
                    {/* Left Side - Image */}
                    <div className="col-md-6 d-flex justify-content-center">
                        <img
                            src="https://cdn2.vectorstock.com/i/1000x1000/89/06/digital-marketing-over-white-background-vector-8538906.jpg"  // Replace with actual image
                            alt="Welcome"
                            className="img-fluid rounded vh-100"
                        />
                    </div>
                    {/* Right Side - Text */}
                    <div className="col-md-6 d-flex flex-column justify-content-center text-center text-md-start">
                        <h1>Welcome to Digital Card Creator</h1>
                        <p className="lead">Easily create and customize your digital business card.</p>
                        <div className="mt-3">
                            <Link to="/onboard" className="btn btn-primary me-3">Get Started</Link>
                            <Link to="/themes" className="btn btn-outline-secondary">Browse Themes</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ Section 2: Steps to Create a Digital Card */}
            <section className="container py-5">
                <h2 className="text-center mb-4">Steps to Create a Digital Business Card</h2>
                <div className="row text-center">
                    <div className="col-md-4">
                        <div className="p-4 border rounded shadow-sm">
                            <h4>1. Fill Your Details</h4>
                            <p>Enter your name, contact info, and business details.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 border rounded shadow-sm">
                            <h4>2. Choose a Theme</h4>
                            <p>Select from a variety of beautiful templates.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 border rounded shadow-sm">
                            <h4>3. Share Your Card</h4>
                            <p>Generate a digital card link and share it easily.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ Section 3: Features */}
            <section className="container-fluid bg-dark text-white py-5">
                <div className="container text-center">
                    <h2>Why Choose Us?</h2>
                    <p className="lead">Create professional digital business cards in minutes!</p>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <h4>✔ Easy to Use</h4>
                            <p>No technical skills required, just fill and go!</p>
                        </div>
                        <div className="col-md-4">
                            <h4>🎨 Customizable</h4>
                            <p>Choose from multiple themes to match your style.</p>
                        </div>
                        <div className="col-md-4">
                            <h4>📱 Mobile Friendly</h4>
                            <p>Works perfectly on all devices, share easily.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ Section 4: Contact Us */}
            <section className="container py-5">
                <h2 className="text-center mb-4">Contact Us</h2>
                <div className="row justify-content-center text-center">
                    <div className="col-md-4">
                        <a href="https://wa.me/9096826542" target="_blank" rel="noopener noreferrer" className="btn btn-success w-100 py-3 mb-3">
                            <i className="bi bi-whatsapp"></i> Chat on WhatsApp
                        </a>
                    </div>
                    <div className="col-md-4">
                        <a href="tel:+919096826542" className="btn btn-primary w-100 py-3 mb-3">
                            <i className="bi bi-telephone"></i> Call Us
                        </a>
                    </div>
                    <div className="col-md-4">
                        <a href="mailto:amitsinghbusinessinfo@gmail.com" className="btn btn-danger w-100 py-3">
                            <i className="bi bi-envelope"></i> Send an Email
                        </a>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;
