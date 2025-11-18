import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "../components/common/BackButton";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, address, paymentMethod } = location.state || {};

  useEffect(() => {
    if (!product || !address) {
      navigate("/");
    }
  }, [product, address, navigate]);

  if (!product || !address) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BackButton />
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium">Product:</span> {product.name}
            </div>
            <div>
              <span className="font-medium">Amount:</span> ₹{product.price}
            </div>
            <div>
              <span className="font-medium">Payment Method:</span>{" "}
              {paymentMethod === "cod" ? "Cash on Delivery" : "Razorpay"}
            </div>
            <div>
              <span className="font-medium">Shipping Address:</span>
              <p className="mt-1">
                {address.fullName}
                <br />
                {address.houseNo}
                <br />
                {address.address}
                {address.landmark && (
                  <>
                    <br />
                    Landmark: {address.landmark}
                  </>
                )}
                <br />
                {address.city}, {address.state} {address.pincode}
                <br />
                Phone: {address.phoneNumber}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-secondary text-secondary-foreground px-8 py-3 rounded-full font-semibold hover:bg-muted transition-all"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}