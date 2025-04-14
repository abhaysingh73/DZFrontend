import React, { useState, useEffect } from "react";
// import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './OnboardForm.css';
import { useUser } from '../../UserContext';
import API from "../../Api";

const OnboardForm = () => {
  const [formData, setFormData] = useState(
    // {
    //   "companyName": "Tech Innovators Ltd.",
    //   "aboutMe": "We are a leading company in technology solutions, specializing in software development, cloud services, and IT consulting.",
    //   "phoneNumber": "9876543210",
    //   "altPhoneNumber": "9876543211",
    //   "email": "contact@techinnovators.com",
    //   "website": "https://www.techinnovators.com",
    //   "address": "123 Tech Street, Silicon Valley, California, USA",
    //   "gstin": "27ABCDE1234F1Z0",
    //   "panNumber": "ABCDE1234F",
    //   "accountName": "Tech Innovators Ltd. Account",
    //   "accountNumber": "1234567890123456",
    //   "ifscCode": "SBIN0001234",
    //   "bankName": "State Bank of India",
    //   "branch": "Silicon Valley Branch",
    //   "contactName": "John Doe",
    //   "contactEmail": "johndoe@techinnovators.com",
    //   "contactPhone": "9988776655",
    //   "companyLogo": "",
    //   "companyBanner": [],
    //   "galleryPictures": [],
    //   "catalogs": []
    // }

    {
      companyName: "",
      aboutMe: "",
      phoneNumber: "",
      altPhoneNumber: "",
      email: "",
      website: "",
      address: "",
      gstin: "",
      panNumber: "",
      accountName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      branch: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      companyLogo: null,
      companyBanner: [],
      galleryPictures: [],
      catalogs: [],
    }
  );
  const [submitBtnTxt, setSubmitBtnTxt] = useState('Submit');

  useEffect(() => {
    if (user) {
      setFormData({
        companyName: user?.companyName || "",
        aboutMe: user?.aboutMe || "",
        phoneNumber: user?.phoneNumber || "",
        altPhoneNumber: user?.altPhoneNumber || "",
        email: user?.email || "",
        website: user?.website || "",
        address: user?.address || "",
        gstin: user?.gstin || "",
        panNumber: user?.panNumber || "",
        accountName: user?.accountName || "",
        accountNumber: user?.accountNumber || "",
        ifscCode: user?.ifscCode || "",
        bankName: user?.bankName || "",
        branch: user?.branch || "",
        contactName: user?.name || "",
        contactEmail: user?.email || "",
        contactPhone: user?.phone || "",
        companyLogo: user?.companyLogo || "",
        companyBanner: user?.companyBanner || [],
        galleryPictures: user?.galleryPictures || [],
        catalogs: user?.catalogs || []
      });
      if (user.status && user.status !== "Registered") {
        setSubmitBtnTxt('Update')
      }
    }

  }, []);


  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // Handle text inputs
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "phoneNumber" || name === "altPhoneNumber" || name === "contactPhone") {
      value = value.replace(/\D/g, '');  // Remove non-numeric characters
      if (value.length > 10) {
        value = value.slice(0, 10);  // Limit to 10 digits
      }
      e.target.value = value;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "companyLogo") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: Array.from(files) });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate non-empty fields
    if (!formData.companyName) newErrors.companyName = "Company name is required.";
    if (!formData.aboutMe) newErrors.aboutMe = "About Me is required.";
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
    if (formData.altPhoneNumber && !/^\d{10}$/.test(formData.altPhoneNumber)) newErrors.altPhoneNumber = "Please enter a valid 10-digit alternate phone number.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.website || !/^https?:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?$/.test(formData.website)) newErrors.website = "Please enter a valid website URL.";
    if (!formData.address) newErrors.address = "Address is required.";
    // if (!formData.gstin || !/^\d{15}$/.test(formData.gstin)) newErrors.gstin = "Please enter a valid GSTIN number.";
    if (!formData.panNumber || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) newErrors.panNumber = "Please enter a valid PAN number.";
    if (!formData.accountName) newErrors.accountName = "Account Name is required.";
    if (!formData.accountNumber || !/^\d{9,18}$/.test(formData.accountNumber)) newErrors.accountNumber = "Please enter a valid account number.";
    if (!formData.ifscCode || !/^[A-Za-z]{4}\d{7}$/.test(formData.ifscCode)) newErrors.ifscCode = "Please enter a valid IFSC code.";
    if (!formData.bankName) newErrors.bankName = "Bank Name is required.";
    if (!formData.branch) newErrors.branch = "Branch is required.";
    if (!formData.contactName) newErrors.contactName = "Contact Name is required.";
    if (!formData.contactEmail || !/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = "Please enter a valid email for the contact person.";
    if (!formData.contactPhone || !/^\d{10}$/.test(formData.contactPhone)) newErrors.contactPhone = "Please enter a valid 10-digit phone number for the contact.";

    // Validate file uploads
    if (!formData.companyLogo) newErrors.companyLogo = "Company logo is required.";
    if (formData.companyBanner.length > 4) newErrors.companyBanner = "You can upload a maximum of 4 images for the banner.";
    if (formData.galleryPictures.length > 10) newErrors.galleryPictures = "You can upload a maximum of 10 images for the gallery.";
    if (formData.catalogs.length > 10) newErrors.catalogs = "You can upload a maximum of 10 catalogs (PDF files).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((file) => {
            formDataToSend.append(key, file);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      // axios
      //   .post("http://localhost:5000/api/onboard/submit", formDataToSend, {
      API.post(`http://localhost:5000/api/onboard/update/${user._id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          console.log("Form Submitted:", response.data);
          toast.success("Form submitted successfully!");
          // debugger
          setUser({...user, status:"Onboarded"});
          navigate('/themes');
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          toast.error("There was an error submitting the form. Please try again.");
        });
    } else {
      toast.error("Form has errors. Please check and try again.");
    }
  };

  return (
    <div className="container">
      <div className="scrollable-container">
        <h2></h2>
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Company Name */}
          <div className="col-md-6">
            <label className="form-label">Company Name*</label>
            <input
              type="text"
              className="form-control"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
            {errors.companyName && <div className="text-danger">{errors.companyName}</div>}
          </div>

          {/* Phone Numbers */}
          <div className="col-md-6">
            <label className="form-label">Phone Number*</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
            {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Alternate Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="altPhoneNumber"
              value={formData.altPhoneNumber}
              onChange={handleChange}
              placeholder="Enter alternate phone number"
            />
            {errors.altPhoneNumber && <div className="text-danger">{errors.altPhoneNumber}</div>}
          </div>

          {/* Email & Website */}
          <div className="col-md-6">
            <label className="form-label">Email*</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Website Link</label>
            <input
              type="url"
              className="form-control"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter website URL"
            />
            {errors.website && <div className="text-danger">{errors.website}</div>}
          </div>
          {/* About Me */}
          <div className="col-md-12">
            <label className="form-label">About Company*</label>
            <textarea
              className="form-control"
              name="aboutMe"
              rows="4"
              value={formData.aboutMe}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
            {errors.aboutMe && <div className="text-danger">{errors.aboutMe}</div>}
          </div>

          {/* Address */}
          <div className="col-12">
            <label className="form-label">Address*</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
            />
            {errors.address && <div className="text-danger">{errors.address}</div>}
          </div>

          {/* GSTIN & PAN Number */}
          <div className="col-md-6">
            <label className="form-label">GSTIN Number</label>
            <input
              type="text"
              className="form-control"
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
              placeholder="Enter GSTIN number"
            />
            {errors.gstin && <div className="text-danger">{errors.gstin}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">PAN Number</label>
            <input
              type="text"
              className="form-control"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="Enter PAN number"
            />
            {errors.panNumber && <div className="text-danger">{errors.panNumber}</div>}
          </div>

          {/* Bank Details */}
          <fieldset className="col-12">
            <legend>Bank Details</legend>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">A/C Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                  placeholder="Enter account name"
                />
                {errors.accountName && <div className="text-danger">{errors.accountName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">A/C Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter account number"
                />
                {errors.accountNumber && <div className="text-danger">{errors.accountNumber}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">IFSC Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  placeholder="Enter IFSC code"
                />
                {errors.ifscCode && <div className="text-danger">{errors.ifscCode}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Enter bank name"
                />
                {errors.bankName && <div className="text-danger">{errors.bankName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Branch</label>
                <input
                  type="text"
                  className="form-control"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Enter branch name"
                />
                {errors.branch && <div className="text-danger">{errors.branch}</div>}
              </div>
            </div>
          </fieldset>

          {/* Contact Person */}
          <fieldset className="col-12">
            <legend>Contact Person</legend>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Enter contact person's name"
                />
                {errors.contactName && <div className="text-danger">{errors.contactName}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="Enter contact person's email"
                />
                {errors.contactEmail && <div className="text-danger">{errors.contactEmail}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="Enter contact person's phone"
                />
                {errors.contactPhone && <div className="text-danger">{errors.contactPhone}</div>}
              </div>
            </div>
          </fieldset>

          {/* File Uploads */}
          <fieldset className="col-12">
            <legend>File Uploads</legend>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Company Logo</label>
                <input
                  className="form-control"
                  type="file"
                  name="companyLogo"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {errors.companyLogo && <div className="text-danger">{errors.companyLogo}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Company Banner (Up to 4 images)</label>
                <input
                  className="form-control"
                  type="file"
                  name="companyBanner"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                />
                {errors.companyBanner && <div className="text-danger">{errors.companyBanner}</div>}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Gallery Pictures (Upload up to 10 images)</label>
                <input
                  className="form-control"
                  type="file"
                  name="galleryPictures"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                />
                {errors.galleryPictures && <div className="text-danger">{errors.galleryPictures}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Catalogs (Upload up to 10 PDFs)</label>
                <input
                  className="form-control"
                  type="file"
                  name="catalogs"
                  onChange={handleFileChange}
                  accept="application/pdf"
                  multiple
                />
                {errors.catalogs && <div className="text-danger">{errors.catalogs}</div>}
              </div>
            </div>
          </fieldset>

          {/* Submit Button */}
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary submitBtn">
              {submitBtnTxt}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardForm;
