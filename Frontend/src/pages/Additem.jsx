import React, { useState, useEffect } from "react";
import { api } from "../API_REQUEST/api";
import { useNavigate } from "react-router-dom";

export const Additem = () => {
    const [item, setItem] = useState({
        Itemname: "",
        ItemImage: "",
        ItemPrice: "",
        Item_dis: "",
        ItemCategory: "", // ✅ NEW FIELD
    });
    const username = localStorage.getItem("username");
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, []);

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/admin/add-item", item);
            setMessage("✅ Item added successfully!");
            setItem({
                Itemname: "",
                ItemImage: "",
                ItemPrice: "",
                Item_dis: "",
                ItemCategory: "", // reset
            });
        } catch (err) {
            console.error("Error adding item:", err);
            setMessage("❌ Failed to add item.");
        }
    };

    return (
        <div
            style={{
                maxWidth: "500px",
                margin: "50px auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
                fontFamily: "sans-serif",
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>➕ Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Item Name:</label>
                    <input
                        type="text"
                        name="Itemname"
                        value={item.Itemname}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="ItemPrice"
                        value={item.ItemPrice}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="ItemImage"
                        value={item.ItemImage}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Description:</label>
                    <textarea
                        name="Item_dis"
                        value={item.Item_dis}
                        onChange={handleChange}
                        rows="3"
                        style={inputStyle}
                        required
                    ></textarea>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Category:</label>
                    <select
                        name="ItemCategory"
                        value={item.ItemCategory}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home</option>
                    </select>
                </div>
                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "100%",
                        fontSize: "16px",
                    }}
                >
                    Add Item
                </button>
            </form>
            {message && (
                <p
                    style={{
                        marginTop: "15px",
                        textAlign: "center",
                        color: message.includes("success") ? "green" : "red",
                    }}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
};
