import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import OrderSummary from "../components/checkout/OrderSummary";
import AddressForm from "../components/checkout/AddressForm";
import Payment from "../components/checkout/Payment";
import BackButton from "../components/common/BackButton";

export default function Checkout() {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen py-10 bg-gray-50">
      <BackButton />
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Checkout Progress */}
          <div className="mb-8 px-4">
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              <CheckoutStep 
                number={1} 
                title="Order Summary" 
                active={location.pathname === "/checkout/order-summary"} 
              />
              <div className="flex-grow h-0.5 bg-gray-200"></div>
              <CheckoutStep 
                number={2} 
                title="Address" 
                active={location.pathname === "/checkout/address"} 
              />
              <div className="flex-grow h-0.5 bg-gray-200"></div>
              <CheckoutStep 
                number={3} 
                title="Payment" 
                active={location.pathname === "/checkout/payment"} 
              />
            </div>
          </div>

          <Routes>
            <Route index element={<Navigate to="order-summary" replace />} />
            <Route path="order-summary" element={<OrderSummary />} />
            <Route path="address" element={<AddressForm />} />
            <Route path="payment" element={<Payment />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function CheckoutStep({ number, title, active }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          active
            ? "bg-secondary text-secondary-foreground"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {number}
      </div>
      <span className={`text-sm ${active ? "text-secondary font-medium" : "text-gray-500"}`}>
        {title}
      </span>
    </div>
  );
}
