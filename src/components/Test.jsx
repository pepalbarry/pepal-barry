import React from "react";
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { useAuth } from '../context/AuthProvider'; // 2. Import useAuth



export default function ProductSection({ product, reverse = false }) {
  const navigate = useNavigate(); // 3. Get the navigate function
  const { user } = useAuth(); // 4. Get user info

  const handleBuyNow = () => {
    if (!user) {
     
      navigate('/login', { state: { from: `/checkout?productId=${product._id}` } }); // Pass product ID or necessary info if needed immediately after login
    } else {
      navigate('/checkout', { state: { productToBuy: product } });
    }
  };


  return (
    <section
      // Using product._id assuming MongoDB IDs
      id={`product-${product._id || product.id}`}
      className={`min-h-[calc(100vh-10rem)] flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-center px-5 md:px-20 py-10 relative overflow-hidden`}
    >
      {/* Left or Right: Product Image */}
      <div className="md:w-1/2 flex justify-center md:justify-center z-10 mb-8 md:mb-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-72 md:w-[400px] rounded-xl shadow-2xl transform hover:rotate-3 hover:scale-105 transition-all duration-500"
        />
      </div>

      {/* Product Info */}
      <div className={`md:w-1/2 text-center ${reverse ? 'md:text-right' : 'md:text-left'} z-10`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-orange-600">
          {product.name}
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          {product.description}
        </p>
        <p className="text-2xl md:text-3xl font-semibold mb-6">
          ₹{product.price}
        </p>

        {/* Buttons */}
        <div className={`flex justify-center ${reverse ? 'md:justify-end' : 'md:justify-start'} gap-4`}>
          {/* We'll implement Add to Cart later */}
          <button
            className="btn btn-primary btn-lg transition-transform transform hover:scale-105 disabled:opacity-50"
            disabled // Disable Add to Cart for now
          >
            Add to Cart
          </button>
          <button
            className="btn btn-secondary btn-lg transition-transform transform hover:scale-105"
            onClick={handleBuyNow} // 6. Use the new handler
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}
