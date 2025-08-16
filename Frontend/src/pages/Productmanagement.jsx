import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../API_REQUEST/api";
import "./ProductManagement.css";

export const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const username = localStorage.getItem("username");
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    const navigate = useNavigate();

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const res = await api.get("/item");
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("Failed to fetch products");
        }
    };

    // Delete product
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await api.delete(`/item/${id}`);
                alert("Product deleted successfully!");
                fetchProducts(); // Refresh product list
            } catch (error) {
                console.error("Failed to delete product:", error);
                alert("Failed to delete product.");
            }
        }
    };

    // Navigate to edit page
    const handleEdit = (id) => {
        navigate(`/admin/edit-product/${id}`);
    };

    // Initial load
    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/login");
        } else {
            fetchProducts();
        }


    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">🛠️ Product Management</h2>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <div className="row">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={product.ItemImage}
                                    className="card-img-top"
                                    alt={product.Itemname}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.Itemname}</h5>
                                    <p className="card-text text-success fw-bold">₹{product.ItemPrice}</p>
                                    <div className="mt-auto d-flex justify-content-between">
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => handleEdit(product._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
