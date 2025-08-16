import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { api } from "../API_REQUEST/api";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import "./Header.css";

export const Header = () => {
    const username = localStorage.getItem("username");
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    const role = localStorage.getItem("role");
    const isAdmin = role === "admin";
    const navigate = useNavigate();
    const location = useLocation();

    const [cart, setCart] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await api.post("/cart", { username });
                const data = res.data.user.cart;
                setCart(data.length);
            } catch (error) {
                console.error("Error fetching cart:", error);
                setCart(0);
            }
        };

        if (isLoggedIn) getData();
    }, [isLoggedIn, username]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const term = params.get("search") || "";
        setSearch(term);
    }, [location.search]);

    useEffect(() => {
        api.get("/item")
            .then((res) => setItems(res.data))
            .catch((err) => console.error("Error fetching items:", err));
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        navigate(`/home?search=${encodeURIComponent(value)}`);
    };

    const handleSuggestionClick = (name) => {
        setSearch(name);
        navigate(`/home?search=${encodeURIComponent(name)}`);
    };

    const filteredSuggestions = items.filter((item) =>
        item.Itemname.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("role");
        alert("Logout Successful!");
        navigate("/home");
    };

    return (
        <header>
            {role === "admin" ? (
                <div className="admin-header bg-gray-800 text-white p-4 shadow-md">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="text-2xl font-bold">Admin Panel</div>

                        {/* Desktop Nav */}
                        <nav className="admin-nav hidden md:flex space-x-6">
                            <NavLink to="/home" className="hover:text-gray-300">Home</NavLink>
                            <NavLink to="/admin/dashboard" className="hover:text-gray-300">Dashboard</NavLink>
                            <NavLink to="/admin/products" className="hover:text-gray-300">Products</NavLink>
                            <NavLink to="/admin/orders" className="hover:text-gray-300">Orders</NavLink>
                            <NavLink to="/admin/add-item" className="hover:text-gray-300">Add Item</NavLink>
                            <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
                        </nav>

                        {/* Hamburger Icon */}
                        <div className="admin-hamburger md:hidden" onClick={() => setMenuOpen(true)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {menuOpen && (
                        <div className="admin-mobile-menu">
                            <div className="close-icon" onClick={() => setMenuOpen(false)}>
                                <IoMdClose size={24} />
                            </div>
                            <NavLink to="/home" onClick={() => setMenuOpen(false)}>Home</NavLink>
                            <NavLink to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
                            <NavLink to="/admin/products" onClick={() => setMenuOpen(false)}>Products</NavLink>
                            <NavLink to="/admin/orders" onClick={() => setMenuOpen(false)}>Orders</NavLink>
                            <NavLink to="/admin/add-item" onClick={() => setMenuOpen(false)}>Add Item</NavLink>
                            <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
                        </div>
                    )}
                </div>
            ) : (

                <div className="user-header bg-black text-white p-4 shadow-md">
                    <div className="container-fluid top-header">
                        <NavLink to="/home" className="text-decoration-none text-white">
                            <h1 className="logo">Shop</h1>
                        </NavLink>

                        <div className="search-wrapper" style={{ position: "relative" }}>
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                className="search-bar"
                                placeholder="Search products..."
                                value={search}
                                onChange={handleSearchChange}
                            />
                            {search && filteredSuggestions.length > 0 && (
                                <div className="suggestion-box">
                                    {filteredSuggestions.map((item, index) => (
                                        <div
                                            key={index}
                                            className="suggestion-item"
                                            onClick={() => handleSuggestionClick(item.Itemname)}
                                        >
                                            {item.Itemname}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="desktop-links">
                            <NavLink to="/home">Home</NavLink>
                            {isLoggedIn && <NavLink to="/profile">Profile</NavLink>}
                            {isLoggedIn && <NavLink to="/your-order">Your Order</NavLink>}
                            <NavLink to="/cart">
                                Cart {isLoggedIn && <span className="badge">{cart}</span>}
                            </NavLink>
                            {!isLoggedIn ? (
                                <>
                                    <NavLink to="/login">Login</NavLink>
                                    <NavLink to="/signup">Signup</NavLink>
                                </>
                            ) : (
                                <button onClick={handleLogout}>Logout</button>
                            )}
                        </div>


                        <div className="hamburger" onClick={() => setMenuOpen(true)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    {menuOpen && (
                        <div className="mobile-menu slide-in">
                            <div className="close-icon" onClick={() => setMenuOpen(false)}>
                                <IoMdClose size={24} />
                            </div>
                            <NavLink to="/home" onClick={() => setMenuOpen(false)}>Home</NavLink>
                            {isLoggedIn && <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>}
                            {isLoggedIn && <NavLink to="/your-order" onClick={() => setMenuOpen(false)}>Your Order</NavLink>}
                            <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
                                Cart {isLoggedIn && <span className="badge">{cart}</span>}
                            </NavLink>
                            {!isLoggedIn ? (
                                <>
                                    <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
                                    <NavLink to="/signup" onClick={() => setMenuOpen(false)}>Signup</NavLink>
                                </>
                            ) : (
                                <button onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}>Logout</button>
                            )}
                        </div>
                    )}

                </div>
            )}
        </header>
    );
};