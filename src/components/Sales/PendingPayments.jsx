import React from "react";

function formatNumber(number) {
  return (number).toLocaleString('en-IN');
}
const PendingPayments = ({ payments }) => {
  return (
    <div className="container mt-4">
      {payments.length === 0 ? (
        <p className="text-muted"></p>
      ) : (
        <div>
          <h3 className="text-danger">Pending Payments</h3>
          <table className="table table-bordered table-striped">
            <thead className="table-danger">
              <tr>
                <th>SO</th>
                <th>Date</th>
                <th>Total</th>
                <th>Pending</th>
                {/* <th>Status</th> */}
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>SO-{payment.orderNumber}</td>
                  <td>{new Date(payment.orderDate).toLocaleString()}</td>
                  <td>₹{formatNumber(payment.totalAmount.toFixed(2) - 0)}</td>
                  <td>₹{formatNumber(payment.pendingPayment.toFixed(2) - 0)}</td>
                  {/* <td>
                    <span className="badge bg-warning text-dark">
                      {payment.paymentStatus.toUpperCase()}
                    </span>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingPayments;
