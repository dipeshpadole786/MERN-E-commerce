import React, { useEffect, useState } from "react";
import { api } from "../API_REQUEST/api";
import "./AdminDashboard.css"; // ⬅️ Add this CSS file
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
    const [summary, setSummary] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        topProducts: [],
    });
    const username = localStorage.getItem("username");
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    const navigate = useNavigate();

    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/login");
        } else {
            const fetchSummary = async () => {
                try {
                    const res = await api.get("/admin/dashboard-summary");
                    setSummary(res.data);
                    console.log(res.data);
                } catch (err) {
                    console.error("Failed to load dashboard summary", err);
                }
            };
            fetchSummary();
        }


    }, []);

    return (
        <div className="admin-dashboard">
            <h2>📊 Admin Dashboard</h2>

            <div className="summary-cards">
                <div className="card">🛒 Orders: {summary.totalOrders}</div>
                <div className="card">📦 Products: {summary.totalProducts}</div>
                <div className="card">👥 Users: {summary.totalUsers}</div>
            </div>

            <div className="top-products">
                <h3>🔥 Top Selling Products</h3>
                {summary.topProducts.length === 0 ? (
                    <p>No orders yet.</p>
                ) : (
                    <ul>
                        {summary.topProducts.map((item) => (
                            <li key={item._id}>
                                {item.itemName} - {item.totalOrders} orders
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
