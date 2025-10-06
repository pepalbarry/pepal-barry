// src/components/ProductSection.jsx
import React from "react";

export default function ProductSection({ product, reverse=false }) {
  return (
    <section
      id={`product-${product.id}`}
      className={`h-screen flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-center px-5 md:px-20  relative overflow-hidden`}
    >
      {/* Left or Right: Product Image */}
      <div className="md:w-1/2 flex justify-center md:justify-center z-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-72 md:w-[400px] rounded-xl shadow-2xl transform hover:rotate-3 hover:scale-105 transition-all duration-500"
        />
      </div>

      {/* Product Info */}
      <div className={`md:w-1/2 text-center ${reverse? 'md:text-right':'md:text-left'} z-10 mt-6 md:mt-0`}>
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
        <div className={`flex justify-center ${reverse? 'md:justify-end':'md:justify-start'} gap-4`}>
          <button className="btn btn-primary btn-lg transition-transform transform hover:scale-105">
            Add to Cart
          </button>
          <button className="btn btn-secondary btn-lg transition-transform transform hover:scale-105">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}
