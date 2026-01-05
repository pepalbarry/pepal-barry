import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/products";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";
import ProductSkeleton from "../components/common/ProductSkeleton";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="pt-32 pb-16 px-5 md:px-20 max-w-7xl mx-auto">
            <BackButton />
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <h1 className="font-display text-4xl md:text-5xl text-heading">
                    Shop the Collection
                </h1>
                <p className="text-lg text-subtle">
                    Handcrafted functional treats made with minimal ingredients and maximal
                    nourishment.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))
                    : products.map((product) => (
                        <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className="group block"
                        >
                            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted mb-4">
                                <img
                                    src={
                                        product.images?.[0] ||
                                        product.image ||
                                        "https://placehold.co/600x600?text=No+Image"
                                    }
                                    alt={product.name}
                                    className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                                />
                                {product.stock <= 0 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="bg-white text-heading px-3 py-1 rounded-full text-sm font-medium">
                                            Sold Out
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-semibold text-heading group-hover:text-primary transition">
                                        {product.name}
                                    </h3>
                                    <span className="text-lg font-medium text-heading">
                                        ₹{product.price}
                                    </span>
                                </div>
                                <p className="text-subtle line-clamp-2">{product.description}</p>
                            </div>
                        </Link>
                    ))}
            </div>

            {!loading && products.length === 0 && (
                <div className="text-center text-subtle py-20">
                    No products found. Check back soon!
                </div>
            )}
        </div>
    );
}
