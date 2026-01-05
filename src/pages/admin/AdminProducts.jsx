import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import PageLoader from "../../components/common/PageLoader";
import { useForm } from "react-hook-form";

export default function AdminProducts() {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/products`
            );
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("stock", data.stock);
        formData.append("category", data.category);

        // Handle images: react-hook-form returns a FileList here
        if (data.images && data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append("images", data.images[i]);
            }
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            };

            if (editingProduct) {
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/products/${editingProduct._id}`,
                    formData,
                    config
                );
            } else {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/products`,
                    formData,
                    config
                );
            }

            closeModal();
            fetchProducts();
        } catch (error) {
            console.error("Failed to save product", error);
            alert("Failed to save product");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            setDeletingId(id);
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/products/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            fetchProducts();
        } catch (error) {
            console.error("Failed to delete product", error);
            alert("Failed to delete product");
        } finally {
            setDeletingId(null);
        }
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            reset({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category || "General",
                images: null, // Reset file input
            });
        } else {
            setEditingProduct(null);
            reset({
                name: "",
                description: "",
                price: "",
                stock: "",
                category: "General",
                images: null,
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        reset(); // Clear form
    };

    if (loading) return <PageLoader />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-heading">Products</h1>
                <Button onClick={() => openModal()}>Add Product</Button>
            </div>

            <div className="bg-white rounded-3xl border border-primary/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted border-b border-primary/10">
                        <tr>
                            <th className="p-4 font-medium text-subtle">Image</th>
                            <th className="p-4 font-medium text-subtle">Name</th>
                            <th className="p-4 font-medium text-subtle">Price</th>
                            <th className="p-4 font-medium text-subtle">Stock</th>
                            <th className="p-4 font-medium text-subtle">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-muted/50">
                                <td className="p-4">
                                    <img
                                        src={
                                            product.images?.[0] ||
                                            product.image ||
                                            "https://placehold.co/100x100?text=No+Image"
                                        }
                                        alt={product.name}
                                        className="w-12 h-12 rounded-lg object-cover bg-muted"
                                    />
                                </td>
                                <td className="p-4 font-medium text-heading">{product.name}</td>
                                <td className="p-4 text-subtle">₹{product.price}</td>
                                <td className="p-4 text-subtle">{product.stock}</td>
                                <td className="p-4 space-x-2">
                                    <button
                                        onClick={() => openModal(product)}
                                        className="text-primary hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={deletingId === product._id}
                                    >
                                        {deletingId === product._id ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingProduct ? "Edit Product" : "Add Product"}
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-subtle mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-primary/20 px-4 py-2"
                                    {...register("name", { required: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-subtle mb-1">
                                    Description
                                </label>
                                <textarea
                                    className="w-full rounded-xl border border-primary/20 px-4 py-2"
                                    rows="3"
                                    {...register("description")}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-subtle mb-1">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full rounded-xl border border-primary/20 px-4 py-2"
                                        {...register("price", { required: true })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-subtle mb-1">
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full rounded-xl border border-primary/20 px-4 py-2"
                                        {...register("stock", { required: true })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-subtle mb-1">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-primary/20 px-4 py-2"
                                    {...register("category")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-subtle mb-1">
                                    Images {editingProduct && "(Leave empty to keep existing)"}
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="w-full"
                                    {...register("images")}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="ghost" onClick={closeModal} disabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button type="submit" loading={isSubmitting}>Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
