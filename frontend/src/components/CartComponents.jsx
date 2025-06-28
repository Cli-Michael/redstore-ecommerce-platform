import React from "react";
import { Trash2 } from "lucide-react"; // Importing a trash bin icon from lucide-react

const CartTable = ({ cartItems, onRemove, onChangeQuantity, onChangeSize }) => {
  const availableSizes = ["S", "M", "L", "XL"]; // Example sizes

  return (
    <div className="cart-table">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            const productId = typeof item.productId === "object" ? item.productId._id : item.productId;

            return (
              <tr key={productId}>
                <td>
                  <div className="cart-info">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <small>Price: ₹{(item.price) || 0}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <select
                    value={item.size || ""}
                    onChange={(e) => onChangeSize(productId, e.target.value)}
                    aria-label={`Change size for ${item.name}`}
                  >
                    <option value="">Select Size</option>
                    {availableSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => onChangeQuantity(productId, e.target.value)}
                    aria-label={`Change quantity for ${item.name}`}
                  />
                </td>
               <td>₹{(item.price * item.quantity || 0).toFixed(2)}</td>

                <td>
                  <button
                    onClick={() => onRemove(productId)}
                    aria-label={`Remove ${item.name} from cart`}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#f00",
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const CartTotal = ({ cartItems, onCheckout }) => {
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );
  const tax = subtotal * 0.1; // Assuming a 10% tax rate, adjust logic dynamically as needed
  const total = subtotal + tax;

  return (
    <div className="total-price">
      <table>
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>₹{Math.round(subtotal)}</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td>₹{Math.round(tax)}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>₹{Math.round(total)}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <button
          className="btn"
          onClick={onCheckout}
          aria-label="Proceed to Checkout"
          style={{ cursor: "pointer", backgroundColor: "#4CAF50", color: "#fff" }}
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
};

export { CartTable, CartTotal };
