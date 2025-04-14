import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import '../../../css/CreateForm.css'; // Import the updated CSS

const CreateForm = () => {
    const [formData, setFormData] = useState({
        item_no: '',
        name: '',
        description: '',
        uom: '',
        price: '',
        category: '',
        sku: '',
        imageUrl: ''
    });

    const [errors, setErrors] = useState({});
    const [addProductResponse, setAddProductResponse] = useState('');
    const fileInputRef = React.useRef();
    const [fileName, setFileName] = useState('');

    const [isLoading, setIsLoading] = useState(false); // Loading state for the file upload

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ['item_no', 'uom', 'price'];
        requiredFields.forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = 'This field is required';
            }
        });

        if (formData.price && isNaN(formData.price)) {
            newErrors.price = 'Price must be a number';
        }

        const specialCharRegex = /[^a-zA-Z0-9\s\-]/;
        Object.keys(formData).forEach((key) => {
            if (specialCharRegex.test(formData[key]) && key !== 'imageUrl' && key !== 'description') {
                newErrors[key] = 'Special characters are not allowed';
            }
        });
        // Validate Image URL (must be a valid URL)
        // const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}([\/\w-]*)*\/?$/i;
        // if (formData.imageUrl && !urlRegex.test(formData.imageUrl)) {
        //     newErrors.imageUrl = 'Please enter a valid URL';
        // }
        return newErrors;
    };

    const addProduct = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        try {
            const response = await axios.post('http://localhost:5000/products', formData);
            setAddProductResponse(response.data.message);
            setFormData({
                item_no: '',
                name: '',
                description: '',
                uom: '',
                price: '',
                category: '',
                sku: '',
                imageUrl: ''
            });
        } catch (err) {
            setAddProductResponse(err?.response?.data?.error || err?.message);
        }
        setTimeout(() => {
            setAddProductResponse('');
        }, 5000);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.xlsx')) {
            setIsLoading(true);
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = async (evt) => {
                const data = new Uint8Array(evt.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const products = XLSX.utils.sheet_to_json(sheet);
                try {
                    await axios.post('http://localhost:5000/products/multi', products);
                    setAddProductResponse('Products uploaded successfully!');
                } catch (error) {
                    console.error('Error adding product:', error);
                    setAddProductResponse('Error uploading products.');
                }
                setIsLoading(false);
                setFileName('');
                fileInputRef.current.value = '';
            };
            reader.readAsArrayBuffer(file);
        } else {
            setAddProductResponse('Please upload a valid Excel file.');
            setIsLoading(false);
            setFileName('');
            fileInputRef.current.value = '';
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Optional: Add drag-over class to highlight the drop area
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.xlsx')) {
            handleFileUpload({ target: { files: [file] } });
        } else {
            setAddProductResponse('Please upload a valid Excel file.');
        }
    };

    return (
        <div className="create-form-container">
            <h2 className="create-form-title">Add New Product</h2>
            <form onSubmit={addProduct}>
                <div className="create-form-group">
                    <label htmlFor="item_no" className="create-form-label">Item No*</label>
                    <input
                        type="text"
                        id="item_no"
                        name="item_no"
                        placeholder="Enter item number"
                        value={formData.item_no}
                        onChange={handleChange}
                        className={`create-form-input ${errors.item_no ? 'error' : ''}`}
                    />
                    {errors.item_no && <span className="error-message">{errors.item_no}</span>}
                </div>
                {/* Item Name */}
                <div className="create-form-group">
                    <label htmlFor="name" className="create-form-label">Item Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter item name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`create-form-input ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                {/* UOM */}
                <div className="create-form-group">
                    <label htmlFor="uom" className="create-form-label">Unit of Measure (UOM)*</label>
                    <input
                        type="text"
                        id="uom"
                        name="uom"
                        placeholder="e.g. PCS, KG, Nos"
                        value={formData.uom}
                        onChange={handleChange}
                        className={`create-form-input ${errors.uom ? 'error' : ''}`}
                    />
                    {errors.uom && <span className="error-message">{errors.uom}</span>}
                </div>

                {/* Description */}
                <div className="create-form-group">
                    <label htmlFor="description" className="create-form-label">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`create-form-input ${errors.description ? 'error' : ''}`}
                    />
                    {errors.description && <span className="error-message">{errors.description}</span>}
                </div>

                {/* Price */}
                <div className="create-form-group">
                    <label htmlFor="price" className="create-form-label">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                        className={`create-form-input ${errors.price ? 'error' : ''}`}
                    />
                    {errors.price && <span className="error-message">{errors.price}</span>}
                </div>

                {/* Category */}
                <div className="create-form-group">
                    <label htmlFor="category" className="create-form-label">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`create-form-input ${errors.category ? 'error' : ''}`}
                    />
                    {errors.category && <span className="error-message">{errors.category}</span>}
                </div>

                {/* SKU */}
                <div className="create-form-group">
                    <label htmlFor="sku" className="create-form-label">SKU</label>
                    <input
                        type="text"
                        id="sku"
                        name="sku"
                        placeholder="Enter SKU"
                        value={formData.sku}
                        onChange={handleChange}
                        className={`create-form-input ${errors.sku ? 'error' : ''}`}
                    />
                    {errors.sku && <span className="error-message">{errors.sku}</span>}
                </div>

                {/* Image URL */}
                <div className="create-form-group">
                    <label htmlFor="imageUrl" className="create-form-label">Image URL</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Enter image URL"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className={`create-form-input ${errors.imageUrl ? 'error' : ''}`}
                    />
                    {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
                </div>

                {/* Submit Button */}
                <div className="create-form-submit-container">
                    <button type="submit" className="create-form-submit">Submit</button>
                </div>
            </form>
            <br></br>

            <h3>Upload Products via Excel</h3>
            <div className="excel-upload-container">
                <div
                    className="file-upload-area"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        id="file-upload"
                        className="file-input"
                    />
                    <button
                        type="button"
                        className="file-upload-btn"
                        onClick={() => fileInputRef.current.click()}
                    >
                        Choose File
                    </button>
                    {fileName && <div className="file-name">{fileName}</div>}
                    {isLoading && <div className="upload-loading">Uploading...</div>}
                </div>
                <a href="http://localhost:5000/excel/Products%20Sample.xlsx" // Replace with actual link when ready
                className="download-template-link"
                target="_blank"
                rel="noopener noreferrer">📥 Download Excel Format</a>
            </div>
            {addProductResponse && <div className="response-message">{addProductResponse}</div>}
        </div>
    );
};

export default CreateForm;
