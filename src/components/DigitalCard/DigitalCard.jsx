import React, { useState } from "react";
import "./DigitalCard.css"

let cardcolor = {
    "background": "",
    "color": ""
}
let thmcolorbg = {
    "color": "",
    "border": ""
}
let thmcolorbgi = {
    "color": "",
    "backgroundColor": "",
    "border": ""
}
const DigitalCard = ({ theme = {
    "card-color": {},
    "thm-color-bg": {},
    "thm-color-bg-i": {}
}, structure = 0 }) => {
    const [showLegalInfo, setShowLegalInfo] = useState(false);
    const [showBankDetails, setShowBankDetails] = useState(false);

    cardcolor = theme["card-color"];
    thmcolorbg = theme["thm-color-bg"];
    thmcolorbgi = theme["thm-color-bg-i"];
    return (
        <div className="">
            {structure == 0 ? (
                <div className="inner">
                    <div className="">
                        <div className="">
                            <div className="card card-profile text-center border-0 card-color" style={cardcolor}>
                                {/* Carousel */}
                                <div id="slider" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner" style={{ maxHeight: "200px" }}>
                                        <div className="carousel-item active">
                                            <img
                                                src="http://localhost:5000/tmp/documents/Company Banners/companyname_banner_2.png"
                                                className="d-block w-100"
                                                alt="slide 1"
                                            />
                                        </div>
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
                                        <i className="fas fa-chevron-left i" style={{ filter: "drop-shadow(0 0 1px #fff)" }}></i>
                                        <span className="visually-hidden">Prev</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
                                        <i className="fas fa-chevron-right i" style={{ filter: "drop-shadow(0 0 1px #fff)" }}></i>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>

                                {/* Profile Info */}
                                <div className="card-block pb-1" style={{ zIndex: 0 }}>
                                    <img
                                        className="img-fluid rounded-circle shadow border mx-3 mb-3"
                                        src="http://localhost:5000/tmp/documents/Company Logos/companyname_companyLogo.png"
                                        style={{
                                            marginTop: "-21px",
                                            width: "36%",
                                            border: "none !important",
                                            boxShadow: "0px 2px 13px -7px #7b7b7b !important",
                                        }}
                                        alt="Company Logo"
                                    />
                                    <h4 className="card-title mb-1">COMPANY NAME</h4>
                                    <h6 className="card-subtitle my-1"></h6>
                                </div>

                                {/* Action Buttons */}
                                <div className="d-flex justify-content-between flex-wrap px-1 mt-2">
                                    <ActionButton
                                        href="http://localhost:5000/tmp/documents/vCards/companyname.vcf"
                                        iconClass="fa-solid fa-credit-card"
                                        label="Save Card"
                                    />
                                    <ModalButton iconClass="fas fa-qrcode" label="QR Code" modalId="#qrcodemodal" />
                                    <ModalButton iconClass="fas fa-file-alt" label="About" modalId="#aboutMdl" />
                                    <ModalButton iconClass="fas fa-images" label="Gallery" />
                                    <ModalButton iconClass="fas fa-file" label="Catalog" modalId="#dlFiles" />
                                    <ModalButton iconClass="fas fa-share-alt" label="Share" modalId="#shareModal" />
                                </div>

                                <div className="seperator"></div>

                                {/* Address */}
                                <div className="card-body p-2 p-sm-3">
                                    <div className="card-text d-flex mb-3">
                                        <a className="btn rounded-circle thm-color-bg p-1 pt-2 me-2 pulse" href="https://www.google.com/maps?q=Colaba%20Mumbai"
                                            target="_blank" rel="noopener noreferrer" style={{ width: 42, height: 42, ...thmcolorbg }}>
                                            <i className="fas fa-map-marker" style={{ fontSize: 24, lineHeight: 1 }}></i>
                                        </a>
                                        <p className="text-start mb-0" style={{ flex: 1 }}>Colaba Mumbai</p>
                                    </div>

                                    {/* Collapsible Sections */}
                                    <div id="acCard">
                                        <div className="d-flex justify-content-center mx-0">
                                            <CollapsibleButton iconClass="fas fa-info" label="Legal Info" isOpen={showLegalInfo} toggle={() => setShowLegalInfo(!showLegalInfo)} />
                                            <CollapsibleButton iconClass="fas fa-money-bill-wave" label="Bank Details" isOpen={showBankDetails} toggle={() => setShowBankDetails(!showBankDetails)} />
                                        </div>

                                        {showLegalInfo && (
                                            <div className="card-subtitle py-2">
                                                <h6 className="d-inline-block my-1 p-1 rounded" style={{ borderColor: "#fff" }}>GSTIN: 27ABCDE1234F1Z0</h6>
                                                <h6 className="d-inline-block my-1 p-1 rounded" style={{ borderColor: "#fff" }}>PAN No.: ABCDE1234F</h6>
                                            </div>
                                        )}

                                        {showBankDetails && (
                                            <div className="card-text py-2">
                                                <p className="py-2">
                                                    <small>A/C Name - </small> ACCOUNT NAME <br />
                                                    <small>A/C No. -</small> 1234567890123456 <br />
                                                    <small>IFSC Code - </small> SBIN0001234 <br />
                                                    <small>Bank Name - </small> State Bank of India <br />
                                                    <small>Branch - </small> Colaba Branch
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Contact Section */}
                                <ContactSection />

                                {/* Social Actions */}
                                <SocialActions />
                            </div>
                        </div>
                    </div>
                </div>) :
                structure == 1 ?
                    (
                        <div className="inner2">
                            <div className="">
                                <div className="">
                                    <div className="">
                                        <div className="card card-profile text-center border-0 card-color" style={cardcolor}>
                                            {/* Carousel Section */}
                                            <div id="slider" className="carousel slide" data-bs-ride="carousel">
                                                <div className="carousel-inner" style={{ maxHeight: "200px" }}>
                                                    <div className="carousel-item active">
                                                        <img
                                                            src="http://localhost:5000/tmp/documents/Company Banners/companyname_banner_2.png"
                                                            className="d-block w-100"
                                                            alt="slide 1"
                                                        />
                                                    </div>
                                                </div>
                                                <button className="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
                                                    <i className="fas fa-chevron-left i" style={{ filter: "drop-shadow(0 0 1px #fff)" }}></i>
                                                    <span className="visually-hidden">Prev</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
                                                    <i className="fas fa-chevron-right i" style={{ filter: "drop-shadow(0 0 1px #fff)" }}></i>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>

                                            {/* Contact Information */}
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h4 className="mb-0">COMPANY NAME</h4>
                                                <img
                                                    className="img-fluid rounded-circle shadow border"
                                                    src="http://localhost:5000/tmp/documents/Company Logos/companyname_companyLogo.png"
                                                    width="60"
                                                    alt="Company Logo"
                                                />
                                            </div>

                                            <div className="mt-3">
                                                <p className="mb-1">
                                                    <i className="fas fa-map-marker-alt"></i> Colaba, Mumbai
                                                </p>
                                                <p className="mb-1">
                                                    <i className="fas fa-envelope"></i> contact@email.com
                                                </p>
                                                <p className="mb-1">
                                                    <i className="fas fa-phone-alt"></i> +9999999999
                                                </p>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="d-flex justify-content-center mt-3">
                                                <a href="https://api.whatsapp.com/send?phone=9999999999" className="btn btn-custom me-2" style={thmcolorbg}>
                                                    <i className="fab fa-whatsapp"></i> WhatsApp
                                                </a>
                                                <a href="tel:+9999999999" className="btn btn-custom me-2" style={thmcolorbg}>
                                                    <i className="fas fa-phone-alt"></i> Call
                                                </a>
                                                <a href="mailto:contact@email.com" className="btn btn-custom" style={thmcolorbg}>
                                                    <i className="fas fa-download"></i> Save Card
                                                </a>
                                            </div>

                                            <div className="seperator"></div>

                                            {/* Services Section */}
                                            <h5 className="text-white mt-3">Our Services/Products</h5>
                                            <ul className="list-group text-dark">
                                                <li className="list-group-item">Service 1</li>
                                                <li className="list-group-item">Service 2</li>
                                                {/* <li className="list-group-item">Service 3</li> */}
                                            </ul>

                                            <div className="seperator"></div>

                                            {/* Collapsible Sections */}
                                            <div className="accordion" id="infoAccordion">
                                                {/* About Section */}
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="aboutHeading">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#aboutCollapse" style={thmcolorbgi}>
                                                            About Us
                                                        </button>
                                                    </h2>
                                                    <div id="aboutCollapse" className="accordion-collapse collapse" data-bs-parent="#infoAccordion">
                                                        <div className="accordion-body">
                                                            <p>ABOUT the company</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Legal Info Section */}
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="legalHeading">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#legalCollapse" style={thmcolorbgi}>
                                                            Legal Information
                                                        </button>
                                                    </h2>
                                                    <div id="legalCollapse" className="accordion-collapse collapse" data-bs-parent="#infoAccordion">
                                                        <div className="accordion-body">
                                                            <p>GSTIN: 27ABCDE1234F1Z0</p>
                                                            <p>PAN No.: ABCDE1234F</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Bank Details Section */}
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="bankHeading">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bankCollapse" style={thmcolorbgi}>
                                                            Bank Details
                                                        </button>
                                                    </h2>
                                                    <div id="bankCollapse" className="accordion-collapse collapse" data-bs-parent="#infoAccordion">
                                                        <div className="accordion-body">
                                                            <p>A/C Name: ACCOUNT NAME</p>
                                                            <p>A/C No.: 1234567890123456</p>
                                                            <p>IFSC Code: SBIN0001234</p>
                                                            <p>Bank: State Bank of India</p>
                                                            <p>Branch: Colaba Branch</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="seperator"></div>

                                            {/* Social Icons */}
                                            <div className="d-flex justify-content-center">
                                                <a href="#" className="card-link btn mx-1 rounded pulse thm-color-bg" style={thmcolorbg}>
                                                    <i className="fas fa-share-alt"></i>
                                                </a>
                                                <a href="#" className="card-link btn mx-1 rounded pulse thm-color-bg" style={thmcolorbg}>
                                                    <i className="fas fa-qrcode"></i>
                                                </a>
                                                <a href="#" className="card-link btn mx-1 rounded pulse thm-color-bg" style={thmcolorbg}>
                                                    <i className="fas fa-images"></i>
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="inner3">
                            <div className="">
                                <div className="">
                                    <div className="">
                                        <div className="card-container">
                                            {/* Card Header */}
                                            <div id="slider" className="carousel slide" data-bs-ride="carousel">
                                                <div className="carousel-inner" style={{ maxHeight: '300px' }}>
                                                    <div className="carousel-item active">
                                                        <img
                                                            src="http://localhost:5000/tmp/documents/Company Banners/companyname_banner_2.png"
                                                            className="d-block w-100"
                                                            alt="slide 1"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    className="carousel-control-prev"
                                                    type="button"
                                                    data-bs-target="#slider"
                                                    data-bs-slide="prev"
                                                >
                                                    <i
                                                        className="fas fa-chevron-left i"
                                                        style={{ filter: 'drop-shadow(0 0 1px #fff)' }}
                                                    ></i>
                                                    <span className="visually-hidden">Prev</span>
                                                </button>
                                                <button
                                                    className="carousel-control-next"
                                                    type="button"
                                                    data-bs-target="#slider"
                                                    data-bs-slide="next"
                                                >
                                                    <i
                                                        className="fas fa-chevron-right i"
                                                        style={{ filter: 'drop-shadow(0 0 1px #fff)' }}
                                                    ></i>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                            <div className="card-block pb-1 card-header" style={{ zIndex: 0 }}>
                                                <img
                                                    className="companyLogo"
                                                    src="http://localhost:5000/tmp/documents/Company Logos/companyname_companyLogo.png"
                                                    alt="Company Logo"
                                                />
                                                <h2>COMPANY NAME</h2>
                                                <p className="mb-0">Innovating Solutions for a Better Tomorrow</p>
                                            </div>

                                            {/* Card Body */}
                                            <div className="card-body">
                                                {/* Personal Data */}
                                                <div className="PersonalData">
                                                    <span style={{ fontFamily: 'cursive' }}>Abhay Singh</span>
                                                    <span>CEO</span>
                                                </div>

                                                {/* Social Icons */}
                                                <div className="social-icons mb-4">
                                                    <a href="https://api.whatsapp.com/send?phone=9999999999" target="_blank" rel="noopener noreferrer">
                                                        <i className="fab fa-whatsapp"></i>
                                                    </a>
                                                    <a href="tel:+9999999999" target="_blank" rel="noopener noreferrer">
                                                        <i className="fas fa-phone-alt"></i>
                                                    </a>
                                                    <a href="mailto:contact@email.com" target="_blank" rel="noopener noreferrer">
                                                        <i className="fas fa-envelope"></i>
                                                    </a>
                                                    <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
                                                        <i className="fab fa-linkedin"></i>
                                                    </a>
                                                    <a href="https://twitter.com/username" target="_blank" rel="noopener noreferrer">
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                    <a href="https://facebook.com/username" target="_blank" rel="noopener noreferrer">
                                                        <i className="fab fa-facebook"></i>
                                                    </a>
                                                    <a href="https://abc.com" target="_blank" rel="noopener noreferrer">
                                                        <i className="fa-solid fa-globe"></i>
                                                    </a>
                                                </div>
                                                <h4>About Us <i className="fa-solid fa-circle-plus" data-bs-target="#aboutMdl" data-bs-toggle="modal"></i></h4>
                                                <p>
                                                    We are a forward-thinking company with a focus on technology and innovation, creating solutions that make
                                                    a difference.
                                                </p>

                                                {/* Testimonials */}
                                                <div className="testimonial">
                                                    <p>"Their services have been instrumental in transforming our workflow. Highly recommend!" - Client A</p>
                                                </div>

                                                {/* Collapsible Sections */}
                                                <div className="collapsible" onClick={() => toggleContent('mission')}>Mission & Vision</div>
                                                <div className="content" id="mission">
                                                    <p>
                                                        Our mission is to drive growth and success for our clients by offering cutting-edge solutions. Our
                                                        vision is to be the leading provider of technological innovations.
                                                    </p>
                                                </div>

                                                {/* Company Services */}
                                                <div className="companyServices">
                                                    <div className="d-flex justify-content-between flex-wrap px-1 mt-2">
                                                        <div className="d-flex flex-column mb-1">
                                                            <a
                                                                id="CardDownloadBtn"
                                                                href="http://localhost:5000/tmp/documents/vCards/companyname.vcf"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="card-link btn mx-1 rounded pulse thm-color-bg"
                                                                style={{ lineHeight: '1', padding: '0.39rem' }}
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                data-bs-html="true"
                                                                title="<p class='mb-0'>Save Contact Details<br>in Your Phone</p>"
                                                            >
                                                                <i
                                                                    className="fa-solid fa-credit-card align-bottom"
                                                                    style={{ fontSize: '24px', padding: '1.5px 0' }}
                                                                ></i>
                                                            </a>
                                                            <span className="text-center" style={{ fontSize: '10px' }}>Save Card</span>
                                                        </div>

                                                        <div className="d-flex flex-column mb-1">
                                                            <button
                                                                className="card-link btn mx-1 rounded pulse thm-color-bg"
                                                                data-bs-target="#qrcodemodal"
                                                                data-bs-toggle="modal"
                                                                style={{ padding: '0.39rem' }}
                                                            >
                                                                <i className="fas fa-qrcode align-bottom" style={{ fontSize: '27px', padding: '0 1.68px' }}></i>
                                                            </button>
                                                            <span className="text-center" style={{ fontSize: '10px' }}>QR Code</span>
                                                        </div>

                                                        <div className="d-flex flex-column mb-1">
                                                            <button
                                                                className="card-link btn mx-1 rounded pulse thm-color-bg"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#contactModal"
                                                                style={{ padding: '0.39rem' }}
                                                            >
                                                                <i className="fas fa-file-alt align-bottom" style={{ fontSize: '27px', padding: '0 3.325px' }}></i>
                                                            </button>
                                                            <span className="text-center" style={{ fontSize: '10px' }}>Contact Us</span>
                                                        </div>

                                                        <div className="d-flex flex-column mb-1">
                                                            <button
                                                                id="galleryImg"
                                                                className="card-link btn mx-1 rounded pulse thm-color-bg"
                                                                style={{ padding: '0.39rem' }}
                                                            >
                                                                <i
                                                                    className="fas fa-images align-bottom"
                                                                    style={{ fontSize: '24px', padding: '1.5px 0' }}
                                                                ></i>
                                                            </button>
                                                            <span className="text-center" style={{ fontSize: '10px' }}>Gallery</span>
                                                        </div>

                                                        <div className="d-flex flex-column mb-1">
                                                            <a
                                                                href="#"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#dlFiles"
                                                                target="_blank"
                                                                className="card-link btn mx-1 rounded pulse thm-color-bg"
                                                                style={{ padding: '0.39rem' }}
                                                            >
                                                                <i
                                                                    className="fas fa-file align-bottom"
                                                                    style={{ fontSize: '27px', padding: '0 3.325px' }}
                                                                ></i>
                                                            </a>
                                                            <span className="text-center" style={{ fontSize: '10px' }}>Cataloge</span>
                                                        </div>

                                                        <div className="d-flex flex-column mb-1">
                                                            <button
                                                                className="card-link btn mx-1 rounded pulse thm-color-bg"
                                                                data-bs-target="#shareModal"
                                                                data-bs-toggle="modal"
                                                                style={{ padding: '0.39rem' }}
                                                            >
                                                                <i
                                                                    className="fas fa-share-alt align-bottom"
                                                                    style={{ fontSize: '27px', padding: '0 1.68px' }}
                                                                ></i>
                                                            </button>
                                                            <span className="text-center" style={{ fontSize: '10px' }}>Share</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Contact Form Modal */}
                                                {/* <button className="btn mt-3" data-bs-toggle="modal" data-bs-target="#contactModal">Contact Us</button> */}
                                            </div>

                                            {/* Card Footer */}
                                            <div className="card-footer">
                                                <p className="d-inline-block my-1 p-1 rounded">
                                                    <strong>Address:</strong> Colaba, Mumbai
                                                </p>
                                                <p className="d-inline-block my-1 p-1 rounded">
                                                    <a href="https://goo.gl/maps/xyz" target="_blank" className="text-primary">
                                                        View on Map
                                                    </a>
                                                </p>

                                                <p className="d-inline-block my-1 p-1 rounded">
                                                    <strong>GSTIN: </strong>27ABCDE1234F1Z0
                                                </p>
                                                <p className="d-inline-block my-1 p-1 rounded">
                                                    <strong>PAN No.:</strong> ABCDE1234F
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
        </div >
    );
};

const ActionButton = ({ href, iconClass, label }) => (
    <div className="d-flex flex-column mb-1">
        <a href={href} target="_blank" rel="noopener noreferrer" className="card-link btn mx-1 rounded pulse thm-color-bg" style={{ padding: "0.39rem", ...thmcolorbg }}>
            <i className={iconClass} style={{ fontSize: 24 }}></i>
        </a>
        <span className="text-center" style={{ fontSize: 10 }}>{label}</span>
    </div>
);

const ModalButton = ({ iconClass, label, modalId }) => (
    <div className="d-flex flex-column mb-1">
        <button className="card-link btn mx-1 rounded pulse thm-color-bg" data-bs-toggle="modal" data-bs-target={modalId} style={{ padding: "0.39rem", ...thmcolorbg }}>
            <i className={iconClass} style={{ fontSize: 27 }}></i>
        </button>
        <span className="text-center" style={{ fontSize: 10 }}>{label}</span>
    </div>
);

const CollapsibleButton = ({ iconClass, label, isOpen, toggle }) => (
    <div className="d-flex flex-column">
        <button type="button" onClick={toggle} className="card-link btn rounded-circle pulse thm-color-bg mx-2 mx-sm-3" style={{ padding: "0.39rem", ...thmcolorbg }}>
            <i className={iconClass} style={{ fontSize: 30 }}></i>
        </button>
        <span className="text-center" style={{ fontSize: 10 }}>{label}</span>
    </div>
);

const ContactSection = () => (
    <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center thm-color-bg-i py-0 px-1" style={thmcolorbgi}>
            <span>CONTACT PERSON</span>
            <span>
                <a href="tel:+9999999999"><i className="fas fa-phone i py-1 m-1" style={{ fontSize: 21 }}></i></a>
                <a href="mailto:contact@email.com"><i className="fas fa-at i py-1 m-1" style={{ fontSize: 21 }}></i></a>
            </span>
        </li>
    </ul>
);
const SocialActions = () => (
    <div className="d-flex justify-content-center p-2 py-3">
        <ActionButton href="https://api.whatsapp.com/send?phone=9999999999" iconClass="fab fa-whatsapp" label="WhatsApp" />
        <ActionButton href="tel:+9999999999" iconClass="fas fa-phone-alt" label="Call" />
        <ActionButton href="mailto:contact@email.com" iconClass="fas fa-envelope" label="Email" />
        <ModalButton iconClass="fas fa-comment-alt" label="Inquiry" modalId="#inquiry" />
        <ActionButton href="https://www.website.com" iconClass="fas fa-globe" label="Website" />
    </div>
);

export default DigitalCard;
