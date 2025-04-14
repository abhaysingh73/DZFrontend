import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SalesOrderPdf from './SalesOrderPdf';

const OrderDetails = () => {
  const { orderNumber } = useParams(); // To get the orderNumber from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/salesOrder/${orderNumber}`); // Adjust the URL as needed
        setOrder(response.data.order);
      } catch (err) {
        setError('Error fetching order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderNumber]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    // Adding header
    doc.text('Order Details Receipt', 20, 20);
    doc.text(`Order Number: ${'SO-' + order.orderNumber}`, 20, 30);
    doc.text(`Payment Method: ${order.paymentMethod}`, 20, 40);
    doc.text(`Payment Status: ${order.paymentStatus}`, 20, 50);
    doc.text(`Order Status: ${order.orderStatus}`, 20, 60);
    doc.text(`Order Date: ${new Date(order.orderDate).toLocaleDateString()}`, 20, 70);
    doc.text(`Shipping Date: ${new Date(order.shippingDate).toLocaleDateString()}`, 20, 80);
    doc.text(`Delivery Date: ${new Date(order.deliveryDate).toLocaleDateString()}`, 20, 90);

    // Adding items table
    doc.autoTable({
      head: [['Product', 'Quantity', 'Unit Price', 'Total Price', 'Discount']],
      body: order.items.map(item => [
        item.name,
        item.quantity,
        item.unitPrice,
        item.totalPrice,
        `${item.discount}%`,
      ]),
      startY: 100,
      theme: 'grid',
    });

    // Adding summary
    doc.text(`Total Amount: $${order.totalAmount}`, 20, doc.lastAutoTable.finalY + 10);
    doc.text(`Discount: $${order.discount}`, 20, doc.lastAutoTable.finalY + 20);
    doc.text(`Tax: $${order.tax}`, 20, doc.lastAutoTable.finalY + 30);
    doc.text(`Shipping Cost: $${order.shippingCost}`, 20, doc.lastAutoTable.finalY + 40);

    // Save the PDF
    doc.save('order-details.pdf');
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`
      Order Details:
      Order Number: ${'SO-' + order.orderNumber}
      Payment Method: ${order.paymentMethod}
      Payment Status: ${order.paymentStatus}
      Order Status: ${order.orderStatus}
      Total Amount: $${order.totalAmount}
    `);
    const url = `https://wa.me/?text=${message}`;
    window.open(url, '_blank');
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!order) return <div>No order details found.</div>;
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">Order Details - {'SO-' + order.orderNumber}</h2>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title text-info">Customer Information</h5>
          <div className="row mb-3">
            <div className="col-md-6">
              <p><strong>Order Number:</strong> {'SO-' + order.orderNumber}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Order Status:</strong> {order.orderStatus}</p>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <p><strong>Shipping Date:</strong> {new Date(order.shippingDate).toLocaleDateString()}</p>
              <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title text-info">Sales Executive Info</h5>
          <div className="row mb-3">
            <div className="col-md-6">
              <p><strong>Name:</strong>{ order?.createdBy?.name} </p>
              <p><strong>Email Id:</strong> { order?.createdBy?.email}</p>
              <p><strong>Email Id:</strong> { order?.createdBy?.role === "sales_executive" ? "Sales Executive": 
              (order?.createdBy?.role === "admin" ? "Admin" : "-") }</p>
              {/* <p><strong>Sale Date:</strong> -</p> */}
            </div>
            <div className="col-md-6">
              {order.images && order.images.length > 0 && (
                <div className="text-center mb-4">
                  <img
                    src={`http://localhost:5000${order?.images[0]}`}
                    alt="Sales Executive"
                    className="img-fluid"
                    style={{ maxWidth: '150px' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {order.note && (<div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title text-info">Notes</h5>
          <div className="row mb-3">
            <div className="col-md-6">
              <p><strong>{ order.note}</strong></p>
            </div>
          </div>
        </div>
      </div>)}


      <div className="mt-4">
        <h5 className="text-secondary">Items:</h5>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr className="table-primary">
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice}</td>
                <td>{item.totalPrice}</td>
                <td>{item.discount}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h5 className="text-secondary">Order Summary</h5>
        <div className="row">
          <div className="col-md-6">
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Discount:</strong> ₹{order.discount}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Tax:</strong> ₹{order.tax}</p>
            <p><strong>Shipping Cost:</strong> ₹{order.shippingCost}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-start">
        <button className="btn btn-primary"
          // onClick={generatePDF}
          onClick={openModal}
        >
          Download as PDF
        </button>
        <button className="btn btn-success ml-3" onClick={shareOnWhatsApp}>
          Share on WhatsApp
        </button>
      </div>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="itemModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title" id="itemModalLabel">Preview</h6>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>X</button>
              </div>
              <div className="modal-body">
                <div>
                  <SalesOrderPdf
                    orderNumber={'SO-' + order.orderNumber}
                    orderDate={new Date(order.orderDate).toLocaleDateString()}
                    supplierName={'supplier'}
                    items={order.items}
                    discount={order.discount}
                    tax={order.tax}
                    shippingFee={order.shippingFee || 0}
                    totalAmount={order.finalAmount}
                  />
                </div>
              </div>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div> */}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrderDetails;
