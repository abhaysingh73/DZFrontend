import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
const SalesOverview = () => {
  const navigate = useNavigate();

  const { user } = useUser();

  const [salesOrders, setSalesOrders] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    paymentStatus: '',
    orderStatus: '',
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // For showing the modal
  const [modalItem, setModalItem] = useState(null);
  // Fetch sales orders with filters
  useEffect(() => {
    const fetchSalesOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/salesOrder', {
          params: {
            startDate: filters.startDate || undefined,
            endDate: filters.endDate || undefined,
            paymentStatus: filters.paymentStatus || undefined,
            orderStatus: filters.orderStatus || undefined,
            limit: 10,
            skip: 0,
          },
        });
        setSalesOrders(response.data);
      } catch (error) {
        console.error('Error fetching sales orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesOrders();
  }, [filters]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      paymentStatus: '',
      orderStatus: '',
    });
  };

  // Handle view and edit actions
  const handleView = (orderNumber) => {
    navigate(`/sales-orders/${orderNumber}`);
  };

  const handleEdit = (orderNumber) => {
    // setShowModal(true);
    // setModalItem(order);
    navigate(`/sales-orders-update/${orderNumber}`)
  };

  const closeModal = () => {
    setShowModal(false);
    setModalItem(null);
};
  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Sales Overview</h1>

      {/* Filters */}
      <div className="row mb-3">
        {/* Order Date Range */}
        <div className="col-md-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </div>

        {/* Payment Status */}
        <div className="col-md-3">
          <label className="form-label">Payment Status</label>
          <select
            className="form-select"
            name="paymentStatus"
            value={filters.paymentStatus}
            onChange={handleFilterChange}
          >
            <option value="">All Payment Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Order Status */}
        <div className="col-md-3">
          <label className="form-label">Order Status</label>
          <select
            className="form-select"
            name="orderStatus"
            value={filters.orderStatus}
            onChange={handleFilterChange}
          >
            <option value="">All Order Status</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Reset Button */}
      <div className="text-center mb-3">
        <button className="btn btn-secondary" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>

      {/* Loading indicator */}
      {loading && <div className="text-center my-3">Loading...</div>}

      {/* Sales Orders Table */}
      {!loading && salesOrders.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Total Amount</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Sales Exec</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {salesOrders.map((order) => (
                <tr key={order.orderNumber}>
                  <td>{'SO-' + order.orderNumber}</td>
                  <td>{order.customer.name}</td>
                  <td>₹{order.totalAmount.toFixed(2)}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.paymentStatus}</td>
                  <td style={{maxWidth:'150px',overflow:'auto'}}><b>{order?.createdBy?.name}</b> <br/>{order?.createdBy?.email}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleView(order.orderNumber)}>
                      View
                    </button>
                    {(user?.role === "admin" || order?.createdBy?.email === user?.email) && (
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(order.orderNumber)}>
                      Update
                    </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-center text-muted">No sales orders found.</p>
      )}

      {showModal && modalItem && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="itemModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title" id="itemModalLabel">SO-{modalItem.orderNumber}</h6>
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

export default SalesOverview;
