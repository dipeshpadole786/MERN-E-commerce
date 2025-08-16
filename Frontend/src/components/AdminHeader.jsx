import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("role");
        alert("Logout Successful!");
        navigate("/home");
    };

    return (
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">Admin Panel</div>
                <nav className="space-x-6">
                    <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
                    <Link to="/admin/products" className="hover:text-gray-300">Products</Link>
                    <Link to="/admin/orders" className="hover:text-gray-300">Orders</Link>
                    <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;