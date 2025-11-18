import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddressForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    houseNo: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to payment with both product and address details
    navigate("/checkout/payment", {
      state: { 
        product,
        address: formData
      }
    });
  };

  const RequiredStar = () => (
    <span className="text-red-500 ml-1">*</span>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Full Name
            <RequiredStar />
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Phone Number
            <RequiredStar />
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            House/Apartment/Building No.
            <RequiredStar />
          </label>
          <input
            type="text"
            name="houseNo"
            value={formData.houseNo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-secondary"
            placeholder="e.g., Flat 101, Building A"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Street Address
            <RequiredStar />
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="2"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-secondary"
            placeholder="Street name, Area"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Landmark
          </label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-secondary"
            placeholder="e.g., Near Post Office"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              City
              <RequiredStar />
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              State
              <RequiredStar />
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Pincode
            <RequiredStar />
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate("/checkout/order-summary", { state: { product } })}
            className="px-6 py-2 border border-secondary rounded-full text-secondary hover:bg-secondary/10 transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-muted transition-all"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
}