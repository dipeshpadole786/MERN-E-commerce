import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../API_REQUEST/api"; // Make sure this points to your backend (e.g., baseURL: http://localhost:3000/api)

export const Profile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("profile");
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            const username = localStorage.getItem("username");
            if (!username) {
                setError("No username found in localStorage.");
                setLoading(false);
                return;
            }

            try {
                const res = await api.get(`/user/${username}`);
                setUserInfo(res.data.data); // ✅ Access 'data' inside 'res.data'
                console.log(res.data.data.Address[0].city);

            } catch (err) {
                setError("Failed to fetch user data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case "orders":
                return (
                    <>
                        <h4>📦 My Orders</h4>
                        <button className="btn btn-primary" onClick={() => navigate("/your-order")}>
                            View Orders
                        </button>
                    </>
                );
            case "cart":
                return (
                    <>
                        <h4>🛒 My Cart</h4>
                        <button className="btn btn-success" onClick={() => navigate("/cart")}>
                            Go to Cart
                        </button>
                    </>
                );
            case "profile":
            default:
                return userInfo?.Address?.length > 0 ? (
                    <>
                        <h4>📄 Account Summary</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Full Name:</strong> {userInfo.Address[0].name}</li>
                            <li className="list-group-item"><strong>Phone:</strong> {userInfo.Address[0].number}</li>
                            <li className="list-group-item"><strong>Location:</strong> {userInfo.Address[0].city}, {userInfo.Address[0].state} - {userInfo.Address[0].Zip}</li>
                            <li className="list-group-item"><strong>Address:</strong> {userInfo.Address[0].address}</li>
                            <li className="list-group-item"><strong>Email:</strong> {userInfo.email}</li>
                        </ul>

                    </>
                ) : (
                    <p>No additional profile details found.</p>
                );
        }
    };


    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left side card */}
                <div className="col-md-4 mb-4">
                    <div className="card text-white shadow" style={{ backgroundColor: "#3b6cb6", borderRadius: "12px" }}>
                        <div
                            style={{
                                background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
                                color: "#333",
                                padding: "20px",
                                borderTopLeftRadius: "12px",
                                borderTopRightRadius: "12px",
                                fontSize: "14px",
                                lineHeight: "1.6",
                                minHeight: "200px",
                            }}
                        >
                            {loading ? (
                                <p className="text-center">Loading user info...</p>
                            ) : error ? (
                                <p className="text-center text-danger">{error}</p>
                            ) : (
                                <>
                                    <h5 className="text-center text-primary fw-bold mb-3">👤 Profile Info</h5>
                                    <p><strong>Name:</strong> {userInfo.username}</p>
                                    <p><strong>Email:</strong> {userInfo.email}</p>
                                    {userInfo?.Address?.length > 0 && (
                                        <>
                                            <p><strong>Phone:</strong> {userInfo.Address[0].number}</p>
                                            <p><strong>Address:</strong>
                                                {userInfo.Address[0].address}, {userInfo.Address[0].city},
                                                {userInfo.Address[0].state} - {userInfo.Address[0].Zip}
                                            </p>
                                        </>
                                    )}





                                </>
                            )}
                        </div>

                        <div className="card-body">
                            <button
                                className={`btn w-100 mb-2 ${activeTab === "orders" ? "btn-dark" : "btn-outline-light"}`}
                                onClick={() => setActiveTab("orders")}
                            >
                                📦 My Orders
                            </button>
                            <button
                                className={`btn w-100 ${activeTab === "cart" ? "btn-dark" : "btn-outline-light"}`}
                                onClick={() => setActiveTab("cart")}
                            >
                                🛒 My Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right side content */}
                <div className="col-md-8 mb-4">
                    <div className="card p-4 shadow-sm">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};
