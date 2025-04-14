import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesReports = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Call the API to fetch sales data
        axios.get('http://localhost:5000/salesOrder')  // Replace with your actual API endpoint
            .then((response) => {
                setSalesData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error fetching sales data');
                setLoading(false);
            });
    }, []);

    // Function to calculate total sales, profit, etc.
    const calculateMetrics = () => {
        let totalSales = 0;
        let totalProfit = 0;

        salesData.forEach((order) => {
            totalSales += order.totalAmount;

            // Calculate profit (Total Amount - Discount - Tax - Shipping Cost)
            totalProfit += order.totalAmount - order.discount - order.tax - order.shippingCost;
        });

        return {
            totalSales,
            totalProfit,
            totalOrders: salesData.length,
        };
    };

    const { totalSales, totalProfit, totalOrders } = calculateMetrics();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Sales Report</h2>
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Sales</h5>
                            <p className="card-text">${totalSales.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Profit</h5>
                            <p className="card-text">${totalProfit.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Orders</h5>
                            <p className="card-text">{totalOrders}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Sales Breakdown</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Order Number</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Total Amount</th>
                        <th scope="col">Profit</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {salesData.map((order, index) => {
                        const profit = order.totalAmount - order.discount - order.tax - order.shippingCost;
                        return (
                            <tr key={index}>
                                <td>{order.orderNumber}</td>
                                <td>{order.customer.name}</td>
                                <td>₹{order.totalAmount.toFixed(2)}</td>
                                <td>₹{profit.toFixed(2)}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>
                                    <span
                                        className={`badge bg-${order.paymentStatus === 'completed' ? 'success' : order.paymentStatus === 'pending' ? 'warning' : 'danger'}`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SalesReports;
