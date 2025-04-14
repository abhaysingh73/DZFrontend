import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const CaptureImage = ({ setImageData }) => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [image, setImage] = useState(null);
    const webcamRef = useRef(null);

    const openCamera = () => {
        setIsCameraOpen(true);
        setImage(null);
        setImageData(null);
    };

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        setImageData(imageSrc);
        setIsCameraOpen(false);
    };

    const retake = () => {
        setImage(null);
        setImageData(null);
        openCamera();
    };

    return (
        <div style={styles.container}>
            {/* Open Camera Button */}
            {!isCameraOpen && !image && (
                <button onClick={openCamera} style={styles.button}>
                    <i className="fa-solid fa-camera"></i> Open Camera
                </button>
            )}

            {/* Webcam Component */}
            {isCameraOpen && (
                <div style={styles.webcamContainer}>
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        videoConstraints={{ facingMode: "user" }}
                        style={styles.webcam}
                    />
                    <button onClick={captureImage} style={styles.button}>
                        📸 Capture
                    </button>
                </div>
            )}

            {/* Preview Image */}
            {image && (
                <div style={styles.previewContainer}>
                    <h3 style={styles.heading}>Preview:</h3>
                    <img src={image} alt="Captured" style={styles.previewImage} />
                    <button onClick={retake} style={styles.button}>🔄 Retake</button>
                </div>
            )}
        </div>
    );
};

// Styling Object
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px",
        fontFamily: "Arial, sans-serif",
        marginTop: "10px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        boxShadow:" 0 4px 8px rgba(0, 0, 0, 0.05)",
    },
    button: {
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        // padding: "10px 20px",
        fontSize: "18px",
        cursor: "pointer",
        borderRadius: "5px",
        // marginTop: "10px",
        transition: "0.3s",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
    },
    webcamContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    webcam: {
        width: "300px",
        height: "225px",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "10px",
    },
    previewContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
    },
    heading: {
        color: "#333",
        marginBottom: "10px",
    },
    previewImage: {
        width: "250px",
        height: "180px",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "10px",
    },
};

export default CaptureImage;
