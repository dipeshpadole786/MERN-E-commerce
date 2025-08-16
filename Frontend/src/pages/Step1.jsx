import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { api } from '../API_REQUEST/api';

export const Step1 = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const username = localStorage.getItem("username");

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });

    const [existingAddress, setExistingAddress] = useState(null);
    const [useExisting, setUseExisting] = useState(false);

    const cartItems = location.state?.cartItems || null;
    const total = location.state?.total || null;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get(`/getUser/${username}`);
                if (res.data?.Address?.length > 0) {
                    const addr = res.data.Address[0];
                    const saved = {
                        fullName: addr.name || '',
                        phone: addr.number || '',
                        address: addr.address || '',
                        city: addr.city || '',
                        state: addr.state || '',
                        zip: addr.Zip || '',
                    };
                    setExistingAddress(saved);
                    setFormData(saved);
                    setUseExisting(true);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchUserData();
    }, [username]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setUseExisting(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!useExisting) {
                await api.post(`/address-save/${username}`, formData);
            }

            alert("Proceeding to payment...");

            if (cartItems) {
                // Proceed with cart
                navigate("/payment", {
                    state: {
                        ...formData,
                        fromCart: true,
                        cartItems,
                        total
                    }
                });
            } else {
                // Proceed with single item
                navigate("/payment", {
                    state: {
                        ...formData,
                        fromCart: false,
                        itemId: id
                    }
                });
            }
        } catch (err) {
            console.error("Submission error:", err);
            alert("Failed to proceed. Please try again.");
        }
    };

    return (
        <div className="container mt-4">
            <div className="mb-4">
                <h5>
                    <span style={{ color: 'blue' }}>Step 1 ➤ Address</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    <span style={{ color: 'gray' }}>Step 2 ➤ Payment</span>
                </h5>
            </div>

            <h3>Shipping Address</h3>

            {existingAddress && (
                <div className="alert alert-info">
                    <p><strong>Saved Address:</strong></p>
                    <p>{existingAddress.fullName}, {existingAddress.phone}</p>
                    <p>{existingAddress.address}</p>
                    <p>{existingAddress.city}, {existingAddress.state} - {existingAddress.zip}</p>

                    <div className="form-check mt-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="useExisting"
                            checked={useExisting}
                            onChange={() => setUseExisting(!useExisting)}
                        />
                        <label className="form-check-label" htmlFor="useExisting">
                            Use this saved address
                        </label>
                    </div>
                </div>
            )}

            {!useExisting && (
                <form onSubmit={handleSubmit}>
                    {["fullName", "phone", "address", "city", "state", "zip"].map(field => (
                        <div className="mb-2" key={field}>
                            <label>{field[0].toUpperCase() + field.slice(1)}</label>
                            <input
                                type={field === "phone" || field === "zip" ? "tel" : "text"}
                                name={field}
                                className="form-control"
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}

                    <button type="submit" className="btn btn-primary">Continue</button>
                </form>
            )}

            {useExisting && (
                <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                    Continue with Saved Address
                </button>
            )}
        </div>
    );
};
