import { formatCurrency } from '../utils/currency';
import '../styles/ReceiptModal.css';

function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  const date = new Date(receipt.timestamp);

  return (
    <div className="modal-overlay">
      <div className="modal-content receipt-modal">
        <div className="receipt-header">
          <h2>✅ Order Confirmed!</h2>
          <p className="receipt-id">Receipt #{receipt.receiptId}</p>
        </div>
        <div className="receipt-body">
          <div className="receipt-info">
            <p>
              <strong>Name:</strong> {receipt.name}
            </p>
            <p>
              <strong>Email:</strong> {receipt.email}
            </p>
            <p>
              <strong>Date:</strong> {date.toLocaleString()}
            </p>
          </div>
          <div className="receipt-items">
            <h3>Items</h3>
            {receipt.items.map((item) => (
              <div key={item.id} className="receipt-item">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>{formatCurrency(item.lineTotal * 100)}</span>
              </div>
            ))}
          </div>
          <div className="receipt-total">
            <strong>Total:</strong>
            <strong>{formatCurrency(receipt.total * 100)}</strong>
          </div>
        </div>
        <div className="receipt-footer">
          <p>Thank you for your order!</p>
          <button className="btn btn-primary" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;
