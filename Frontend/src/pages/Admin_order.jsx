import React, { useEffect, useState } from "react";
import { api } from "../API_REQUEST/api";
import { useNavigate } from "react-router-dom";

export const Admin_order = () => {
    const [data, setData] = useState([]);
    const username = localStorage.getItem("username");
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            const fetchCounts = async () => {
                try {
                    const res = await api.get("/admin/product-order-count");
                    setData(res.data);
                } catch (error) {
                    console.error("Error loading order counts:", error);
                }
            };
            fetchCounts();
        }

    }, []);

    return (
        <div
            style={{
                margin: "40px auto",
                padding: "20px",
                maxWidth: "800px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h2 style={{ marginBottom: "20px", fontSize: "24px" }}>
                🧾 Product Order Summary
            </h2>
            {data.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "#fff",
                        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={{ padding: "10px", border: "1px solid #ccc", textAlign: "left" }}>Product</th>
                            <th style={{ padding: "10px", border: "1px solid #ccc", textAlign: "left" }}>Price</th>
                            <th style={{ padding: "10px", border: "1px solid #ccc", textAlign: "left" }}>Total Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{item.itemName}</td>
                                <td style={{ padding: "10px", border: "1px solid #ccc" }}>₹{item.itemPrice}</td>
                                <td style={{ padding: "10px", border: "1px solid #ccc", fontWeight: "bold" }}>{item.totalOrders}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
