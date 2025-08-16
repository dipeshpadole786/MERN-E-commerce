import React, { useEffect, useState } from "react";
import { Slider } from "../components/Slider";
import "./Home.css";
import { api } from "../API_REQUEST/api";
import { useNavigate, useLocation } from "react-router-dom";

export const Home = () => {
    const username = localStorage.getItem("username");
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    const role = localStorage.getItem("role");
    const isAdmin = role === "admin";

    const navigate = useNavigate();
    const location = useLocation();

    const [items, setItems] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [priceSort, setPriceSort] = useState("");

    // Get search term from URL
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("search")?.toLowerCase() || "";

    const handlecart = async (id) => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            try {
                const data = await api.post(`/cart/${id}/`, { username });
                alert(data.data.message);
                window.location.reload();
            } catch (error) {
                console.error("Cart error:", error);
            }
        }
    };

    const handlebuy = (id) => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            navigate(`/buy/${id}`);
        }
    };

    useEffect(() => {
        api.get("/item")
            .then((res) => setItems(res.data))
            .catch((err) => console.error("Failed to fetch:", err));
    }, []);

    // Apply search + filter + sort
    let filteredItems = items.filter(item =>
        item.Itemname.toLowerCase().includes(searchTerm)
    );

    if (categoryFilter !== "all") {
        filteredItems = filteredItems.filter(item =>
            item.ItemCategory?.toLowerCase() === categoryFilter
        );
    }

    if (priceSort === "asc") {
        filteredItems.sort((a, b) => a.ItemPrice - b.ItemPrice);
    } else if (priceSort === "desc") {
        filteredItems.sort((a, b) => b.ItemPrice - a.ItemPrice);
    }

    return (
        <div>
            {!isAdmin && <Slider />}

            {isAdmin ? (
                <div className="container mt-5">
                    <h2 className="mb-4">👨‍💼 Admin Overview</h2>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card bg-light p-3 h-100">
                                <h5 className="card-title">Manage Products</h5>
                                <p className="card-text">Add, edit, or remove items from your store.</p>
                                <button className="btn btn-primary" onClick={() => navigate("/admin/products")}>
                                    Go to Product Management
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card bg-light p-3 h-100">
                                <h5 className="card-title">View Orders</h5>
                                <p className="card-text">See all orders placed by customers.</p>
                                <button className="btn btn-success" onClick={() => navigate("/admin/orders")}>
                                    Go to Orders
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card bg-light p-3 h-100">
                                <h5 className="card-title">Dashboard</h5>
                                <p className="card-text">Access analytics, user activity, and earnings overview.</p>
                                <button className="btn btn-dark" onClick={() => navigate("/admin/dashboard")}>
                                    Go to Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container mt-4">
                    {/* Filters */}
                    <div className="row mb-4">
                        <div className="col-md-6 mb-2">
                            <select
                                className="form-select"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="home">Home</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-2">
                            <select
                                className="form-select"
                                value={priceSort}
                                onChange={(e) => setPriceSort(e.target.value)}
                            >
                                <option value="">Sort by Price</option>
                                <option value="asc">Low to High</option>
                                <option value="desc">High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Listing */}
                    <div className="row">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, i) => (
                                <div key={i} className="col-md-4 mb-4">
                                    <div className="card h-100 shadow-sm">
                                        <img
                                            src={item.ItemImage}
                                            className="card-img-top"
                                            alt={item.Itemname}
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{item.Itemname}</h5>
                                            <p className="card-text text-muted">{item.Item_dis}</p>
                                            <p className="card-text fw-bold">₹{item.ItemPrice}</p>
                                            <div className="mt-auto d-flex justify-content-between">
                                                <button className="btn btn-outline-primary" onClick={() => handlecart(item._id)}>
                                                    Add to Cart
                                                </button>
                                                <button className="btn btn-success" onClick={() => handlebuy(item._id)}>
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center mt-5">
                                <h4>No products found</h4>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
