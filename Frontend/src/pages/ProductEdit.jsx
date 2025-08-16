import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../API_REQUEST/api";

export const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        Itemname: "",
        ItemPrice: "",
        ItemImage: "",
    });

    // Fetch existing product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/item/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Failed to fetch product", error);
                alert("Product not found");
                navigate("/admin/product-management");
            }
        };
        fetchProduct();
    }, [id, navigate]);

    // Handle form input change
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/item/${id}`, product);
            alert("Product updated successfully!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Failed to update product", error);
            alert("Update failed.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">✏️ Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="Itemname"
                        value={product.Itemname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price (₹)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="ItemPrice"
                        value={product.ItemPrice}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ItemImage"
                        value={product.ItemImage}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Update Product</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/admin/products")}>
                    Cancel
                </button>
            </form>
        </div>
    );
};
