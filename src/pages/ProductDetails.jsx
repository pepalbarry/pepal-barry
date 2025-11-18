import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import BackButton from "../components/common/BackButton";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products/${productId}`
      );
      setProduct(response.data.product);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/login");
    } else {
      const productWithQuantity = { ...product, quantity };
      navigate("/checkout/order-summary", { state: { product: productWithQuantity } });
    }
  };

  const handleAddToCart = () => {
    // Cart functionality will be implemented later
    alert("Cart functionality coming soon!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <BackButton />
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-lg rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-secondary mb-2">₹{product.price}</h2>
                <p className="text-green-600">In Stock</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="mb-8">
                <p className="text-lg text-gray-700">
                  Total: <span className="font-bold text-xl">₹{(product.price * quantity).toFixed(2)}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-semibold hover:bg-muted transition-all text-center"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 border-2 border-secondary text-secondary px-6 py-3 rounded-full font-semibold hover:bg-secondary/10 transition-all text-center"
                >
                  Add to Cart
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Product Highlights</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>100% Natural Ingredients</li>
                  <li>High-Quality Product</li>
                  <li>Free Shipping</li>
                  <li>Secure Payment Options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}