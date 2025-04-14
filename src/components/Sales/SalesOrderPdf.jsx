import html2pdf from 'html2pdf.js';
const SalesOrderPdf = ({ orderNumber, orderDate, items, discount, tax, shippingFee, totalAmount, handlePdfDisplay }) => {

    const handleDownload = () => {
        const element = document.getElementById('purchase-order');
        const options = {
          filename: 'purchase_order.pdf',
          html2canvas: {
              useCORS: true, // Enable CORS for cross-origin images
              logging: true, // For debugging
          },
          jsPDF: {
              unit: 'mm',
              format: 'a4',
              orientation: 'portrait',
          },
      };
        html2pdf()
            .from(element)
            .set(options)
            .save()
            .then(
                handlePdfDisplay(false)
            );
    };

    const styles = {
        container: {
          padding: '30px',
          fontFamily: 'Arial, sans-serif',
        //   backgroundColor: '#f4f4f4',
          border: '1px solid #ccc',
          // width: '80%',
          // margin: 'auto',
          boxSizing: 'border-box',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        },
        header: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '2px solid #ddd',
          paddingBottom: '15px',
        },
        companyLogoSection: {
          flex: '0 0 20%',
          paddingRight: '20px',
        },
        companyLogo: {
          maxWidth: '100%',
          height: 'auto',
          maxHeight: '50px', // Adjust logo size
        },
        companyInfo: {
          fontSize: '14px',
          lineHeight: '1.6',
          flex: '1 1 60%',
        },
        companyName: {
          fontSize: '22px',
          fontWeight: 'bold',
          margin: '0',
          color: '#333',
        },
        challanInfo: {
          textAlign: 'right',
          fontSize: '14px',
          flex: '0 0 20%',
          paddingLeft: '20px',
        },
        sectionTitle: {
          fontSize: '18px',
          marginTop: '20px',
          marginBottom: '10px',
          borderBottom: '2px solid #000',
          paddingBottom: '5px',
          fontWeight: '600',
        },
        table: {
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px',
        },
        tableHeader: {
          border: '1px solid #000',
          padding: '12px',
          textAlign: 'center',
          backgroundColor: '#f0f0f0',
          fontWeight: 'bold',
          color: '#333',
        },
        tableCell: {
          border: '1px solid #ddd',
          padding: '12px',
          textAlign: 'center',
          fontSize: '14px',
        },
        summary: {
          fontSize: '16px',
          paddingLeft: '10px',
          borderTop: '1px solid #ddd',
          paddingTop: '15px',
          marginTop: '30px',
        },
        summaryItem: {
          marginBottom: '8px',
          fontSize: '16px',
          color: '#333',
        },
        footer: {
          textAlign: 'center',
          marginTop: '30px',
          fontSize: '12px',
          color: '#666',
          borderTop: '1px solid #ccc',
          paddingTop: '15px',
          marginBottom: '20px',
        },
        footerText: {
          margin: '5px 0',
        },
        buttonContainer: {
          display: 'flex',
          justifyContent: 'center',
          // marginTop: '30px',
        },
        button: {
          padding: '12px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          margin: '0 10px',
          transition: 'background-color 0.3s ease',
        },
        buttonHover: {
          backgroundColor: '#0056b3',
        },
      };
      
    return (
        <div>
          {/* Buttons */}
          <div style={styles.buttonContainer}>
                <button onClick={handleDownload} style={styles.button}><i class="fa-solid fa-download"></i> Download</button>
                {/* <button onClick={cancelDownload} style={styles.button}>Cancel</button> */}
            </div>
            {/* Purchase Order with Professional Layout */}
            <div id="purchase-order" style={styles.container}>
                {/* Header Section */}
                <div style={styles.header}>
                    <div style={styles.companyLogoSection}>
                        {/* Company Logo Section */}
                        <img src="https://companieslogo.com/img/orig/ACN-cce5b411.png?t=1720244490" alt="Company Logo" style={styles.companyLogo} />
                    </div>
                    <div style={styles.companyInfo}>
                        <h2 style={styles.companyName}>Your Company Name</h2>
                        <p>Address: Your Company Address, City, State, ZIP</p>
                        <p>Phone: +91-XXXXXXXXXX | Email: info@yourcompany.com</p>
                    </div>
                    <div style={styles.challanInfo}>
                        <p><strong>Order No.:</strong> {orderNumber}</p>
                        <p><strong>Date:</strong> {orderDate}</p>
                        {/* <p><strong>PO Number:</strong> {poNumber}</p> */}
                    </div>
                </div>

                {/* Middle Section: Purchase Order Details */}
                <div style={styles.detailsSection}>
                    <h3 style={styles.sectionTitle}>Purchase Order Details</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>Item Name</th>
                                <th style={styles.tableHeader}>Quantity</th>
                                <th style={styles.tableHeader}>Unit Price</th>
                                <th style={styles.tableHeader}>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td style={styles.tableCell}>{item.name}</td>
                                    <td style={styles.tableCell}>{item.quantity}</td>
                                    <td style={styles.tableCell}>₹{item.unitPrice}</td>
                                    <td style={styles.tableCell}>₹{item.totalPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3 style={styles.sectionTitle}>Summary</h3>
                    <div style={styles.summary}>
                        <p style={styles.summaryItem}><strong>Discount:</strong> ₹{discount}</p>
                        <p style={styles.summaryItem}><strong>Tax:</strong> ₹{tax}</p>
                        <p style={styles.summaryItem}><strong>Shipping Fee:</strong> ₹{shippingFee}</p>
                        <p style={styles.summaryItem}><strong>Total Amount:</strong> ₹{totalAmount}</p>
                    </div>
                </div>

                {/* Footer Section */}
                <div style={styles.footer}>
                    <p style={styles.footerText}>Thank you for doing business with us!</p>
                    <p style={styles.footerText}>Terms and Conditions apply. All rights reserved.</p>
                </div>
            </div>
        </div>

    )

}

export default SalesOrderPdf;