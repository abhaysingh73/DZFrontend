import React, { useState, useEffect } from 'react';
import './SalesOrderForm.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import CaptureImage from './CaptureImage';
import { Autocomplete, TextField } from "@mui/material";
import PendingPayments from './PendingPayments';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../UserContext";

const getDefaultDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split('T')[0];
};
function formatNumber(number) {
    return (number).toLocaleString('en-IN');
}
const SalesOrderForm = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [customerName, setCustomerName] = useState('');
    const [customerMobile, setCustomerMobile] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(getDefaultDeliveryDate());
    const [shippingAddress, setShippingAddress] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [items, setItems] = useState([{ itemName: '', quantity: 1, unitPrice: '', totalPrice: '', stock: '', productId: '', discount: 0, totalPriceWoDisc: 0, image: '', description: '' }]);
    const [inventory, setInventory] = useState([]); // To store inventory data
    const [customers, setCustomers] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // To manage dropdown visibility
    const [filteredItems, setFilteredItems] = useState([]); // To store filtered items for autocomplete
    const [currentItem, setCurrentItem] = useState(0);
    const [totalWoDiscount, setTotalWoDiscount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0); // Discount amount (can be calculated or input by user)
    const [taxRate, setTaxRate] = useState(10); // Tax rate in percentage
    const [taxAmount, setTaxAmount] = useState(0); // The calculated tax amount
    const [shippingFee, setShippingFee] = useState(20);
    const [total, setTotal] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);
    const [showModal, setShowModal] = useState(false); // For showing the modal
    const [modalItem, setModalItem] = useState(null); // To store the item details for the modal
    const [imageData, setImageData] = useState(null);
    const [pendingPayments, setPendingPayments] = useState([]);
    const [advancePayment, setAdvancePayment] = useState(0);
    const [saleStatus, setSaleStatus] = useState('completed');
    const [note, setNote] = useState('');

    const calculateTotal = () => {
        const calculatedTaxAmount = (total) * (taxRate / 100);
        const calculatedFinalTotal = total + calculatedTaxAmount + shippingFee;
        setTaxAmount(calculatedTaxAmount);
        setFinalTotal(calculatedFinalTotal);
        return {
            taxAmount: calculatedTaxAmount,
            finalTotalAmount: calculatedFinalTotal,
        };
    };

    useEffect(() => {
        const { taxAmount, finalTotalAmount } = calculateTotal();
        setTaxAmount(taxAmount); // Update the tax amount
        setFinalTotal(finalTotalAmount); // Update the final total
    }, [total, discountAmount, taxRate, shippingFee]);

    useEffect(() => {
        setCurrentItem(items.length - 1);
    }, [items]);

    useEffect(() => {
        // Fetch inventory data (for auto-complete) from backend
        axios.get('http://localhost:5000/products')
            .then((response) => {
                setInventory(response.data.products); // Assuming you have a field 'products'
            })
            .catch((error) => {
                console.error('Error fetching inventory:', error);
            });

        axios.get('http://localhost:5000/salesOrder/customers')
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching customers:', error);
            });
    }, []);


    const addItem = () => {
        setItems([...items, { itemName: '', quantity: 1, unitPrice: '', totalPrice: '', stock: '', productId: '', discount: '0', totalPriceWoDisc: '0', image: '', description: '' }]);
    };
    const handleItemChange = (index, field, value = 0) => {
        let updatedItems = [...items];

        if (field === "remove") {
            updatedItems = updatedItems.filter((_, ind) => ind !== index);
            setItems(updatedItems);
            recalculateTotal(updatedItems);
            return;
        }

        let numericValue = Number(value);
        if (isNaN(numericValue)) numericValue = 0;

        if (field === "discount") {
            numericValue = Math.max(0, Math.min(100, numericValue));
        }

        updatedItems[index][field] = numericValue;

        const item = updatedItems[index];
        const baseTotal = item.quantity * item.unitPrice;

        item.totalPriceWoDisc = baseTotal;
        item.totalPrice = field === "discount" && numericValue > 0
            ? baseTotal - (baseTotal * numericValue / 100)
            : baseTotal;

        setItems(updatedItems);
        recalculateTotal(updatedItems);
    };
    
    const recalculateTotal = (updatedItems) => {
        let newTotal = updatedItems.reduce((acc, item) => acc + item.totalPrice, 0);
        setTotal(newTotal - 0);

        let newTotalWoDicount = updatedItems.reduce((acc, item) => acc + (item.totalPriceWoDisc - 0), 0);
        setTotalWoDiscount(newTotalWoDicount - 0);

        let discount = updatedItems.reduce((acc, item) => acc + (item.totalPriceWoDisc - item.totalPrice), 0);
        setDiscountAmount(discount - 0);
    };
    const handleItemNameChange = (index, value) => {
        const updatedItems = [...items];
        updatedItems[index].itemName = value;
        setItems(updatedItems);
        // Filter the inventory based on the value typed in
        if (value) {
            const filtered = inventory.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
            setFilteredItems(filtered);
            setIsDropdownVisible(true); // Show the dropdown
        } else {
            setFilteredItems([]);
            setIsDropdownVisible(false);
        }
    };

    const handleItemSelect = async (index, selectedItem) => {
        const updatedItems = [...items];
        const existingItemIndex = items.findIndex(item => item.itemName === selectedItem.name);
        if (existingItemIndex !== -1) {
            updatedItems[existingItemIndex].quantity = (updatedItems[existingItemIndex].quantity - 0) + 1;
            updatedItems[existingItemIndex].totalPrice = updatedItems[existingItemIndex].quantity * updatedItems[existingItemIndex].unitPrice;
            setItems(updatedItems);
            handleItemChange(existingItemIndex, 'quantity', updatedItems[existingItemIndex].quantity);
        } else {
            updatedItems[index].itemName = selectedItem.name;
            updatedItems[index].unitPrice = selectedItem.price; // Use price from inventory
            updatedItems[index].stock = selectedItem.quantityInStock;
            updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].unitPrice;
            updatedItems[index].productId = selectedItem._id;
            updatedItems[index].image = selectedItem?.images?.[0];
            updatedItems[index].description = selectedItem?.description;
            setItems(updatedItems);
            handleItemChange(index, 'quantity', 1);
        }
        calculateTotal();
        setIsDropdownVisible(false); // Hide the dropdown after selection
    };

    const handleBlur = (index) => {
        const updatedItems = [...items];
        updatedItems[index].itemName = "";
        setItems(updatedItems);
        setTimeout(() => {
            setIsDropdownVisible(false);
        }, 200);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!imageData) {
            toast.error('Please take a picture to submit');
            return false;
        }
        const isCompleted = saleStatus === "completed";
        if (isCompleted && advancePayment > finalTotal) {
            toast.error('Advance Payment cannot be more than final amount');
            return;
        }
        const customerInfo = {
            name: customerName,
            email: customerEmail,
            phone: customerMobile,
            shippingAddress: {
                street: shippingAddress,
                city: '',
                postalCode: '',
                country: ''
            },
            billingAddress: {
                street: billingAddress,
                city: '',
                postalCode: '',
                country: ''
            }
        };
        const commonData = {
            customerId: customerName ? undefined : 'defaultCustomerId',
            customer: customerInfo,
            shippingDate: expectedDeliveryDate,
            deliveryDate: expectedDeliveryDate,
            images: [imageData],
            note,
            createdBy: user?._id
        };
        if (isCompleted) {
            const paymentStatus = Number(advancePayment).toFixed(2) === Number(finalTotal).toFixed(2)
                ? 'completed'
                : 'pending';

            const order = {
                ...commonData,
                items: items.map(({ productId, quantity, unitPrice, discount }) => ({
                    productId,
                    quantity,
                    unitPrice,
                    discount
                })),
                shippingCost: shippingFee,
                paymentStatus,
                orderStatus: 'pending',
                paymentMethod: 'offline',
                discount: discountAmount,
                tax: taxAmount,
                advancedPayment: advancePayment - 0,
            };

            // console.log('Order:', order);
            axios.post('http://localhost:5000/salesOrder', order)
                .then(response => {
                    const orderNumber = response?.data?.order?.orderNumber;
                    toast.success(`Sales Order created successfully! ${orderNumber ? 'Order Number: ' + orderNumber : ''}`);
                    refreshForm();
                    setTimeout(() => navigate('/sales-overview'), 200);
                })
                .catch(error => {
                    console.error('Error creating sales order:', error);
                    toast.error('There was an error creating the sales order');
                });
        } else {

            axios.post('http://localhost:5000/salesOrder/salesAttemptData', commonData)
                .then(() => {
                    toast.success(`Saved successfully!`);
                    refreshForm();
                    setTimeout(() => navigate('/sales-overview'), 200);
                })
                .catch(error => {
                    console.error('Error saving details:', error);
                    toast.error('There was an error saving the details');
                });
        }

    };

    const refreshForm = () => {
        setCustomerName('');
        setCustomerMobile('');
        setCustomerEmail('');
        // setOrderDate('');
        setExpectedDeliveryDate('');
        // setShippingMethod(shippingMethods[0].id); // Default to first shipping method
        setShippingAddress('');
        setBillingAddress('');
        setItems([{ itemName: '', quantity: '', unitPrice: '', totalPrice: '', stock: '', productId: '', discount: 0, totalPriceWoDisc: 0, image: '', description: '' }]); // Reset to default empty item
        // setTotalAmount(0); // Reset total amount
        setInventory([]); // Clear inventory data
        // setCustomers([]); // Clear customer data
        setIsDropdownVisible(false); // Hide the dropdown
        setFilteredItems([]); // Clear filtered items
        setCurrentItem(0); // Reset to the first item
        setTotalWoDiscount(0);
        setDiscountAmount(0); // Reset discount amount
        setTaxRate(10); // Reset to the default tax rate
        setTaxAmount(0); // Reset tax amount
        setShippingFee(20); // Reset shipping fee
        setFinalTotal(0); // Reset final total
        setImageData(null);
    };

    const openModal = (item) => {
        setModalItem(item); // Set the item details to be displayed in the modal
        setShowModal(true); // Open the modal
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
        setModalItem(null); // Clear the modal item details
    };

    const handleCustomerChange = (event, value) => {
        if (value) {
            setCustomerEmail(value.email);
            setCustomerName(value.name);
            setCustomerMobile(value.phone);
            setBillingAddress(value.billingAddress.city + " " + value.billingAddress.country + " " + value.billingAddress.street);
            setShippingAddress(value.shippingAddress.city + " " + value.shippingAddress.country + " " + value.shippingAddress.street);

            if (value?._id) {
                axios.get('http://localhost:5000/salesOrder/pending-payments/' + value?._id)
                    .then((response) => {
                        setPendingPayments(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching pending payments:', error);
                    });
            }
        }
    };

    const nameChanged = (event) => {
        const name = event.target.value;
        setCustomerName(name);
    }
    const handleMobileNumber = (event) => {
        if (event.target.value?.length > 10) {
            event.target.value = event.target.value.slice(0, 10);
        }
    }

    const handleDiscountValidation = (event) => {
        event.target.value = event.target.value.replaceAll('-', '');
        if (event.target.value < 0) {
            event.target.value = 0;
        }
        if (event.target.value > 99) {
            event.target.value = 99;
        }
        if (user?.role !== 'admin' && event.target.value > 18) {
            event.target.value = 18;
        }
    }
    const handleQuantityValidation = (event) => {
        event.target.value = event.target.value.replaceAll('-', '');
        if (!event.target.value || event.target.value <= 0) event.target.value = 1;
        if (event.target.value < 1) {
            event.target.value = 1;
        }
    }
    return (
        <div className='create-sales'>
            <PendingPayments payments={pendingPayments} />
            <div>
                <input
                    type="radio"
                    id="completed"
                    name="saleStatus"
                    value="completed"
                    checked={saleStatus === 'completed'}
                    onChange={() => setSaleStatus('completed')}
                />
                <label htmlFor="completed">Sale</label>&nbsp;&nbsp;&nbsp;
                <input
                    type="radio"
                    id="noSaleDeclined"
                    name="saleStatus"
                    value="no_sale_declined"
                    checked={saleStatus === 'no_sale_declined'}
                    onChange={() => setSaleStatus('no_sale_declined')}
                />
                <label htmlFor="noSaleDeclined">No Sale</label>
            </div>

            <div className="sales-order-form">
                <form onSubmit={handleSubmit}>
                    {/* Customer Info */}
                    <div className="form-section">
                        <label>Customer Name:</label>
                        {/* <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required /> */}
                        <Autocomplete
                            freeSolo
                            disableClearable
                            options={customers}
                            getOptionLabel={(option) =>
                                typeof option === "string"
                                    ? option
                                    : `${option.name} (${option.phone || "No Phone"})`
                            }
                            onChange={handleCustomerChange}
                            filterOptions={(options, { inputValue }) =>
                                inputValue.length > 0 ?
                                    options.filter((option) =>
                                        option.name.toLowerCase().includes(inputValue.toLowerCase())
                                    ) : []
                            }
                            renderInput={(params) => <TextField {...params} onChange={nameChanged} required autoComplete='' />}
                            noOptionsText="" // Hides "No options" message
                        />
                    </div>
                    <div className="form-section">
                        <label>Customer Mobile:</label>
                        <input type="number" value={customerMobile} onChange={(e) => setCustomerMobile(e.target.value)} onInput={(e) => handleMobileNumber(e)} required />
                    </div>
                    <div className="form-section">
                        <label>Customer Email:</label>
                        <input type="text" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                    </div>

                    {/* <div className="form-section">
                        <label>Order Date:</label>
                        <input
                            type="date"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                            required
                        />
                    </div> */}

                    <div className="form-section">
                        <label>Expected Delivery Date:</label>
                        <input
                            type="date"
                            value={expectedDeliveryDate}
                            onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-section">
                        <label>Shipping Address:</label>
                        <textarea
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-section">
                        <label>Billing Address:</label>
                        <textarea
                            value={billingAddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                            required
                        />
                    </div>
                    {saleStatus === "completed" && (<div className="form-section">
                        <label>Advance Payment:</label>
                        <input
                            type='number'
                            value={advancePayment}
                            onChange={(e) => setAdvancePayment(e.target.value)}
                            required
                        />
                    </div>)}

                    {saleStatus !== "completed" && (
                        <div>
                            <div className="form-section">
                                <label>Additional Notes:</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder='Add notes here//'
                                />
                            </div>

                            <CaptureImage setImageData={setImageData} />
                        </div>
                    )}

                    {saleStatus === "completed" && (<div><div className="items-table">
                        <h3>Items</h3>
                        <table className="desktop-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Info</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Discount %</th>
                                    <th className='itemTotalCoumn'>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <input type="text" placeholder="Item Name" value={item.itemName} onChange={(e) => handleItemNameChange(index, e.target.value)} onBlur={() => handleBlur(index)} required disabled={index < currentItem} />
                                            {isDropdownVisible && currentItem === index && (
                                                <div className="autocomplete-dropdown-1">
                                                    {filteredItems.map((itemOption) => (
                                                        <div
                                                            key={itemOption.id}
                                                            className="autocomplete-item"
                                                            onClick={() => handleItemSelect(index, itemOption)}
                                                        >
                                                            {itemOption.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {item.image && (
                                                <img src={item?.image} alt="Item Preview" style={{ width: '30px', height: '30px', cursor: 'pointer' }}
                                                    onClick={() => openModal(item)} />
                                            )}
                                        </td>
                                        <td>
                                            <input type="number" placeholder="Quantity" value={item.quantity}
                                                onChange={(e) => {
                                                    handleItemChange(index, 'quantity', e.target.value)
                                                }}
                                                onBlur={(e) => handleQuantityValidation(e)}

                                                required
                                            />
                                        </td>
                                        <td>
                                            ₹ {formatNumber((item.unitPrice || 0) - 0)}
                                            {/* <input type="number" placeholder="Unit Price" value={item.unitPrice} readOnly /> */}
                                        </td>
                                        <td><input type="number" placeholder="Discount %" onChange={(e) => {
                                            handleDiscountValidation(e)
                                            handleItemChange(index, 'discount', e.target.value)
                                        }} /></td>
                                        <td className='itemTotalCoumn'>₹ {formatNumber((item.totalPrice || 0).toFixed(2) - 0)}</td>
                                        <td><button className='trashBtn' type="button" onClick={() => handleItemChange(index, 'remove', 0)} disabled={items.length < 2}><i className="fas fa-trash-alt"></i></button></td></tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mobile-view">
                            {items.map((item, index) => (
                                <div className="mobile-item" key={index}>
                                    <div className="mobile-item-row">
                                        <strong className="label">Name:</strong>
                                        <span className="value">
                                            <input type="text" placeholder="Item Name" value={item.itemName} onChange={(e) => handleItemNameChange(index, e.target.value)} onBlur={() => handleBlur(index)} required disabled={index < currentItem} />
                                            {isDropdownVisible && currentItem === index && (
                                                <div className="autocomplete-dropdown-1">
                                                    {filteredItems.map((itemOption) => (
                                                        <div
                                                            key={itemOption.id}
                                                            className="autocomplete-item"
                                                            onClick={() => handleItemSelect(index, itemOption)}
                                                        >
                                                            {itemOption.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </span>
                                    </div>
                                    {item.image && (
                                        <div className="mobile-item-row">
                                            <strong className="label">Info:</strong>
                                            <div className="image-container">
                                                <img
                                                    src={item?.image}
                                                    alt="Item Preview"
                                                    onClick={() => openModal(item)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="mobile-item-row">
                                        <strong className="label">Quantity:</strong>
                                        <span className="value"><input type="number" placeholder="Quantity" value={item.quantity}
                                            onChange={(e) => {
                                                handleItemChange(index, 'quantity', e.target.value)
                                            }}
                                            onBlur={(e) => handleQuantityValidation(e)}
                                            required
                                        /></span>
                                    </div>
                                    <div className="mobile-item-row">
                                        <strong className="label">Price:</strong>
                                        <span className="value">₹ {formatNumber((item.unitPrice || 0) - 0)}</span>
                                    </div>
                                    <div className="mobile-item-row">
                                        <strong className="label">Discount %:</strong>
                                        <span className="value"><input type="number" placeholder="Discount %" onChange={(e) => {
                                            handleDiscountValidation(e)
                                            handleItemChange(index, 'discount', e.target.value)
                                        }} /></span>
                                    </div>
                                    <div className="mobile-item-row">
                                        <strong className="label">Total:</strong>
                                        <span className="value">₹ {formatNumber((item.totalPrice || 0).toFixed(2) - 0)}</span>
                                    </div>
                                    <button
                                        className="trashBtn"
                                        type="button"
                                        onClick={() => handleItemChange(index, 'remove', 0)}
                                        disabled={items.length < 2}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className='addItemDiv'>
                            <button className="addItemBtn" type="button" onClick={addItem} disabled={items[items.length - 1]?.itemName === ''}>
                                <i className="fa-solid fa-plus"></i> Add Item
                            </button>
                        </div>

                        <br></br>
                        <div className="form-section">
                            <label>Additional Notes:</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder='Add notes here//'
                            />
                        </div>

                        <CaptureImage setImageData={setImageData} />
                    </div>

                        <div className="total-section">
                            <h3 className='heading-1'>Summary</h3>

                            <div className="total-details">
                                <div className="total-detail">
                                    <label>Subtotal:</label>
                                    {/* <span>₹{total}</span> */}
                                    ₹{formatNumber(totalWoDiscount?.toFixed(2) - 0)}
                                </div>

                                {discountAmount > 0 ? (<div className="total-detail">
                                    <label>Discount:</label>
                                    <span>-₹{discountAmount?.toFixed(2)}</span> {/* Display discount value */}
                                </div>) : ""}

                                <div className="total-detail">
                                    <label>Tax ({taxRate}%):</label>
                                    <span>₹{formatNumber(taxAmount?.toFixed(2) - 0)}</span> {/* Display calculated tax */}
                                </div>

                                <div className="total-detail">
                                    <label>Shipping Fee:</label>
                                    <span>₹{shippingFee?.toFixed(2)}</span> {/* Optional shipping fee */}
                                </div>

                                <div className="total-detail total-amount">
                                    <label><strong>Total:</strong></label>
                                    <span><strong>₹{formatNumber(finalTotal?.toFixed(2) - 0)}</strong></span> {/* Final total after tax, discount, etc. */}
                                </div>
                            </div>
                        </div></div>)}
                    {saleStatus === "completed" && (<button type="submit">Create Sales Order</button>)}
                    {saleStatus !== "completed" && (<button type="submit">Submit</button>)}
                </form>
            </div>
            {showModal && modalItem && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="itemModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title" id="itemModalLabel">{modalItem.itemName}</h6>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <img src={modalItem.image || ''} alt="Item" className="img-fluid" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                                    {/* <p><strong>Name:</strong> {modalItem.name}</p> */}
                                    <p><strong>Price:</strong> ₹{modalItem.unitPrice}</p>
                                    <p><strong>Stock:</strong> {modalItem.stock}</p>
                                    <p><strong>Description:</strong> {modalItem.description || 'No description available.'}</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesOrderForm;
