import React, { useState, useRef } from "react";
import axios from "axios";
import Papa from "papaparse";
import { toast } from "react-toastify";

const BulkMail = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emails, setEmails] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef(null);

  // Handle CSV Upload (both click and drag-and-drop)
  const handleFileUpload = (file) => {
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        const emailList = result.data.flat().filter((email) => email.includes("@"));
        if (emailList.length === 0) {
          toast.error("⚠️ No valid emails found in the CSV file.");
          return;
        }
        setEmails(emailList.join(", ")); // Display emails in textarea
        toast.success(`✅ Loaded ${emailList.length} emails from CSV.`);
      },
      skipEmptyLines: true,
    });
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Validation
  const validateInputs = () => {
    if (!message.trim()) {
      toast.error("⚠️ Message is required.");
      return false;
    }

    const emailList = emails.split(",").map((email) => email.trim()).filter(Boolean);
    if (emailList.length === 0) {
      toast.error("⚠️ At least one email ID is required.");
      return false;
    }

    return true;
  };

  // Handle Send Emails
  const handleSendEmails = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    const emailList = emails.split(",").map((email) => email.trim());

    try {
      const res = await axios.post("http://localhost:5000/send-bulk-email", {
        subject,
        message,
        recipients: emailList,
      });

      if (res.data.error) {
        toast.error(`❌ ${res.data.error}`);
      } else {
        toast.success("✅ Emails sent successfully!");
      }
    } catch (error) {
      console.log(error)
      toast.error("❌ Failed to send emails. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">📧 Bulk Email Sender</h2>

        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message (HTML supported) <span className="text-danger">*</span></label>
          <textarea
            className="form-control"
            placeholder="Enter email message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Drag & Drop Upload Box */}
        <div
          className={`border p-4 text-center ${dragging ? "bg-light" : ""}`}
          style={{ borderStyle: "dashed", cursor: "pointer", backgroundColor: "#f5f4f4" }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            accept=".csv"
            className="d-none"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
          <p className="mb-0">📂 Drag & Drop a CSV file here, or click to upload</p>
        </div>

        <div className="mt-3">
          <label className="form-label">Emails (comma-separated) <span className="text-danger">*</span></label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter emails or upload CSV"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />
        </div>

        <button className="btn btn-success w-100 mt-3" onClick={handleSendEmails} disabled={loading}>
          {loading ? "Sending..." : "🚀 Send Emails"}
        </button>
      </div>
    </div>
  );
};

export default BulkMail;
