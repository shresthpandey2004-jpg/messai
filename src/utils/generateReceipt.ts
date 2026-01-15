interface ReceiptData {
  userName: string;
  userEmail: string;
  roomNumber: string;
  totalMeals: number;
  mealRate: number;
  totalAmount: number;
  billMonth: string;
  transactionId?: string;
  paymentDate?: string;
}

export const generateReceipt = (data: ReceiptData) => {
  const {
    userName,
    userEmail,
    roomNumber,
    totalMeals,
    mealRate,
    totalAmount,
    billMonth,
    transactionId,
    paymentDate,
  } = data;

  // Create HTML content for the receipt
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>MessAI Receipt - ${billMonth}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          background: #f5f5f5;
        }
        .receipt {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #6366f1;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 5px;
        }
        .subtitle {
          color: #666;
          font-size: 14px;
        }
        .receipt-title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-bottom: 30px;
        }
        .info-section {
          margin-bottom: 30px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }
        .info-label {
          color: #666;
          font-weight: 500;
        }
        .info-value {
          color: #333;
          font-weight: 600;
        }
        .breakdown {
          background: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          margin: 30px 0;
        }
        .breakdown-title {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }
        .breakdown-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          color: #555;
        }
        .total-section {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin: 30px 0;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .total-label {
          font-size: 18px;
          font-weight: 500;
        }
        .total-amount {
          font-size: 32px;
          font-weight: bold;
        }
        .payment-info {
          background: #ecfdf5;
          border: 2px solid #10b981;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .payment-status {
          color: #059669;
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 10px;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #eee;
          color: #666;
          font-size: 12px;
        }
        .thank-you {
          font-size: 16px;
          color: #6366f1;
          font-weight: 600;
          margin-bottom: 10px;
        }
        @media print {
          body {
            background: white;
            padding: 0;
          }
          .receipt {
            box-shadow: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <div class="logo">MessAI Smart Hub</div>
          <div class="subtitle">Digital Mess Management System</div>
        </div>
        
        <div class="receipt-title">Payment Receipt</div>
        
        <div class="info-section">
          <div class="info-row">
            <span class="info-label">Student Name:</span>
            <span class="info-value">${userName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email:</span>
            <span class="info-value">${userEmail}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Room Number:</span>
            <span class="info-value">${roomNumber}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Bill Month:</span>
            <span class="info-value">${billMonth}</span>
          </div>
          ${transactionId ? `
          <div class="info-row">
            <span class="info-label">Transaction ID:</span>
            <span class="info-value">${transactionId}</span>
          </div>
          ` : ''}
          ${paymentDate ? `
          <div class="info-row">
            <span class="info-label">Payment Date:</span>
            <span class="info-value">${paymentDate}</span>
          </div>
          ` : ''}
        </div>
        
        <div class="breakdown">
          <div class="breakdown-title">Bill Breakdown</div>
          <div class="breakdown-row">
            <span>Total Meals Consumed:</span>
            <span><strong>${totalMeals} meals</strong></span>
          </div>
          <div class="breakdown-row">
            <span>Rate per Meal:</span>
            <span><strong>₹${mealRate.toFixed(2)}</strong></span>
          </div>
          <div class="breakdown-row">
            <span>Calculation:</span>
            <span>${totalMeals} × ₹${mealRate.toFixed(2)}</span>
          </div>
        </div>
        
        ${transactionId ? `
        <div class="payment-info">
          <div class="payment-status">✓ Payment Successful</div>
          <div style="color: #059669; font-size: 14px;">
            Your payment has been processed successfully. Thank you for using MessAI!
          </div>
        </div>
        ` : ''}
        
        <div class="total-section">
          <div class="total-row">
            <span class="total-label">Total Amount ${transactionId ? 'Paid' : 'Due'}:</span>
            <span class="total-amount">₹${totalAmount}</span>
          </div>
        </div>
        
        <div class="footer">
          <div class="thank-you">Thank you for choosing MessAI Smart Hub!</div>
          <div>For any queries, contact us at support@messai.com</div>
          <div style="margin-top: 10px;">
            Generated on ${new Date().toLocaleString('en-IN', { 
              dateStyle: 'long', 
              timeStyle: 'short',
              timeZone: 'Asia/Kolkata'
            })}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Create a new window and print
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  }
};
