import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, address } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handlePayment = () => {
    if (paymentMethod === "cod") {
      // For COD, directly show success
      navigate("/order-success", { 
        state: { 
          product,
          address,
          paymentMethod 
        } 
      });
    }
    // Razorpay implementation will be added later
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="space-y-4">
          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-radio h-5 w-5 text-secondary"
            />
            <span className="font-medium">Cash on Delivery</span>
          </label>

          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="razorpay"
              checked={paymentMethod === "razorpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-radio h-5 w-5 text-secondary"
              disabled
            />
            <span className="font-medium text-gray-400">Razorpay (Coming Soon)</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Price ({product?.quantity || 1} {(product?.quantity || 1) === 1 ? 'item' : 'items'})</span>
            <span>₹{product?.price} × {product?.quantity || 1}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{(product?.price * (product?.quantity || 1)).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>₹{(product?.price * (product?.quantity || 1)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate("/checkout/address", { state: { product } })}
          className="px-6 py-2 border border-secondary rounded-full text-secondary hover:bg-secondary/10 transition-all"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          className="px-6 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-muted transition-all"
        >
          {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
        </button>
      </div>
    </div>
  );
}