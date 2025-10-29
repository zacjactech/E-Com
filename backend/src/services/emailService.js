const nodemailer = require('nodemailer');
const { formatCurrency } = require('../utils/currency');

// Create reusable transporter
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  // For development: Use Ethereal (fake SMTP)
  // For production: Use real SMTP (Gmail, SendGrid, etc.)
  if (process.env.NODE_ENV === 'production' && process.env.SMTP_HOST) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Development: Log emails to console instead of sending
    transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    });
  }

  return transporter;
}

/**
 * Send receipt email
 */
async function sendReceiptEmail(receipt) {
  try {
    const transporter = getTransporter();

    const itemsList = receipt.items
      .map(
        (item) =>
          `<tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(item.price * 100)}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${formatCurrency(item.lineTotal * 100)}</td>
          </tr>`
      )
      .join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Receipt - Vibe Commerce</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #6366f1; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">🛒 Vibe Commerce</h1>
          <p style="margin: 10px 0 0 0;">Thank you for your order!</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
          <h2 style="color: #10b981; margin-top: 0;">✅ Order Confirmed</h2>
          
          <div style="background-color: white; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Receipt ID:</strong> ${receipt.receiptId}</p>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${receipt.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${receipt.email}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(receipt.timestamp).toLocaleString()}</p>
          </div>

          <h3 style="margin-top: 20px;">Order Items</h3>
          <table style="width: 100%; border-collapse: collapse; background-color: white; border-radius: 6px; overflow: hidden;">
            <thead>
              <tr style="background-color: #f1f5f9;">
                <th style="padding: 12px 8px; text-align: left; border-bottom: 2px solid #e2e8f0;">Product</th>
                <th style="padding: 12px 8px; text-align: center; border-bottom: 2px solid #e2e8f0;">Qty</th>
                <th style="padding: 12px 8px; text-align: right; border-bottom: 2px solid #e2e8f0;">Price</th>
                <th style="padding: 12px 8px; text-align: right; border-bottom: 2px solid #e2e8f0;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 12px 8px; text-align: right; font-weight: bold; border-top: 2px solid #e2e8f0;">Total:</td>
                <td style="padding: 12px 8px; text-align: right; font-weight: bold; font-size: 1.2em; color: #6366f1; border-top: 2px solid #e2e8f0;">${formatCurrency(receipt.total * 100)}</td>
              </tr>
            </tfoot>
          </table>

          <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
            <p style="margin: 0;"><strong>Note:</strong> This is a mock checkout. No payment was processed.</p>
          </div>

          <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 0.9em;">
            <p>Thank you for shopping with Vibe Commerce!</p>
            <p style="margin: 5px 0;">Questions? Contact us at support@vibecommerce.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
VIBE COMMERCE - ORDER RECEIPT
==============================

Order Confirmed! ✅

Receipt ID: ${receipt.receiptId}
Name: ${receipt.name}
Email: ${receipt.email}
Date: ${new Date(receipt.timestamp).toLocaleString()}

ORDER ITEMS
-----------
${receipt.items.map((item) => `${item.name} x${item.qty} - ${formatCurrency(item.price * 100)} = ${formatCurrency(item.lineTotal * 100)}`).join('\n')}

TOTAL: ${formatCurrency(receipt.total * 100)}

Note: This is a mock checkout. No payment was processed.

Thank you for shopping with Vibe Commerce!
Questions? Contact us at support@vibecommerce.com
    `;

    const mailOptions = {
      from: process.env.SMTP_FROM || '"Vibe Commerce" <noreply@vibecommerce.com>',
      to: receipt.email,
      subject: `Order Confirmation - Receipt #${receipt.receiptId}`,
      text: textContent,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    // In development, log the email content
    if (process.env.NODE_ENV !== 'production') {
      console.log('\n📧 Email sent (development mode):');
      console.log('To:', receipt.email);
      console.log('Subject:', mailOptions.subject);
      console.log('Preview:', info.message ? info.message.toString() : 'Email logged');
      console.log('---\n');
    }

    return {
      success: true,
      messageId: info.messageId,
      preview: info.message ? info.message.toString() : null,
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    // Don't throw error - email failure shouldn't break checkout
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = {
  sendReceiptEmail,
};
