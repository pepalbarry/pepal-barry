import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const handleGetAllProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      );
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <section className="min-h-screen px-5 md:px-20 py-16 flex flex-col items-center justify-center space-y-24">
      {products.map((product, index) => (
        <div
          key={product._id || index}
          className={`flex flex-col md:flex-row items-center justify-between gap-10 ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Product Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-72 md:w-[400px] rounded-xl shadow-2xl transform hover:rotate-3 hover:scale-105 transition-all duration-500"
            />
          </div>

          {/* Product Info */}
          <div
            className={`md:w-1/2 text-center md:text-left ${
              index % 2 === 1 ? "md:text-right" : ""
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-heading">
              {product.name}
            </h2>

            <p className="text-lg md:text-xl text-subtle mb-6">
              {product.description}
            </p>

            <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
              ₹{product.price}
            </p>

            <div
              className={`flex justify-center ${
                index % 2 === 1 ? "md:justify-end" : "md:justify-start"
              } gap-4`}
            >

              <div className="flex items-center justify-center">
                <button 
                  className="px-8 py-3 border-2 border-secondary text-secondary font-semibold rounded-full text-lg hover:bg-secondary/10 transition-all"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
