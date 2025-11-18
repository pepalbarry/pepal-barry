import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <div>No product selected</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full rounded-lg"
            />
          </div>
          
          <div className="md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-600">Quantity: {product.quantity || 1}</span>
              <span className="text-2xl font-bold">₹{product.price} each</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Price Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Price ({product.quantity || 1} {(product.quantity || 1) === 1 ? 'item' : 'items'})</span>
            <span>₹{product.price} × {product.quantity || 1}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{(product.price * (product.quantity || 1)).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>₹{(product.price * (product.quantity || 1)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate("/checkout/address", { state: { product } })}
          className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-semibold hover:bg-muted transition-all"
        >
          Continue to Address
        </button>
      </div>
    </div>
  );
}