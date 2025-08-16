import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../API_REQUEST/api';

export const Cart = () => {
    const username = localStorage.getItem("username");
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    // Fetch cart data
    const getData = async () => {
        try {
            const res = await api.post("/cart", { username });
            setCartItems(res.data.user.cart);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setCartItems([]);
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        try {
            const res = await api.post("/remove-from-cart", { username, itemId });
            alert(res.data.message);
            getData();
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    // Navigate to checkout with cart data
    const handleProceedToCheckout = () => {
        const total = cartItems.reduce((sum, item) => sum + item.ItemPrice, 0);
        navigate(`/buy/${username}`, {
            state: { cartItems, total }
        });
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            getData();
        }
    }, []);

    const total = cartItems.reduce((sum, item) => sum + item.ItemPrice, 0);

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center">🛒 Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="alert alert-info text-center">Your cart is empty.</div>
            ) : (
                <>
                    <div className="row g-4">
                        {cartItems.map((item) => (
                            <div className="col-sm-12 col-md-6 col-lg-4" key={item._id}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={item.ItemImage}
                                        className="card-img-top"
                                        alt={item.Itemname}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h5 className="card-title text-primary">{item.Itemname}</h5>
                                        <p className="card-text text-muted">{item.Item_dis}</p>
                                        <h6 className="text-success fw-bold">₹{item.ItemPrice}</h6>
                                        <button
                                            className="btn btn-outline-danger btn-sm mt-2"
                                            onClick={() => removeFromCart(item._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total and Proceed Button */}
                    <div className="mt-5 text-end">
                        <h4 className="fw-bold">Total: ₹{total}</h4>
                        <button
                            className="btn btn-success mt-3 px-4"
                            onClick={handleProceedToCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
