import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../API_REQUEST/api';

export const Step2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { fullName, phone, address, city, state, zip, itemId } = location.state || {};
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    const [itemData, setItemData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // ✅ loading state

    const getData = async (id) => {
        try {
            const res = await api.get(`/payment/${id}`);
            setItemData(res.data);
        } catch (err) {
            console.error(err);
            setError("Could not fetch item details.");
        }
    };

    useEffect(() => {
        if (itemId) getData(itemId);
    }, [itemId]);

    const deliveryCharge = 50;
    const taxRate = 0.18;
    const itemPrice = itemData?.ItemPrice || 0;
    const taxAmount = itemPrice * taxRate;
    const total = itemPrice + taxAmount + deliveryCharge;

    const handlepayment = async () => {
        setLoading(true); // ✅ Show loader
        const payload = {
            itemId: itemData._id,
            itemName: itemData.Itemname,
            itemPrice: itemData.ItemPrice,
            itemImage: itemData.ItemImage,
            fullName,
            phone,
            address,
            city,
            state,
            zip,
            username,
            email,
        };

        try {
            const res = await api.post("/payment", payload);
            alert(res.data.message);
            navigate("/step3");
        } catch (err) {
            console.error(err);
            alert("Payment failed or email sending error.");
        } finally {
            setLoading(false); // ✅ Hide loader
        }
    };

    return (
        <div className="container mt-4">
            <h5 className="mb-4">
                <span style={{ color: 'green' }}>Step 1 ✔ Address</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <span style={{ color: 'blue' }}>Step 2 ➤ Payment</span>
            </h5>

            <h3>Review & Payment</h3>
            {error && <p className="text-danger">{error}</p>}

            <div className="row mt-4">
                <div className="col-md-6">
                    {itemData && (
                        <div className="card p-3 mb-3">
                            <h5>Item Details</h5>
                            <img
                                src={itemData.ItemImage}
                                alt={itemData.Itemname}
                                className="img-fluid mb-3"
                                style={{ maxHeight: '200px', objectFit: 'cover' }}
                            />
                            <p><strong>Name:</strong> {itemData.Itemname}</p>
                            <p><strong>Description:</strong> {itemData.Item_dis}</p>
                            <p><strong>Price:</strong> ₹{itemData.ItemPrice}</p>
                        </div>
                    )}
                </div>

                <div className="col-md-6">
                    <div className="card p-3 mb-3">
                        <h5>Shipping Address</h5>
                        <p><strong>Full Name:</strong> {fullName}</p>
                        <p><strong>Phone:</strong> {phone}</p>
                        <p>
                            <strong>Address:</strong><br />
                            {address},<br />
                            {city}, {state} - {zip}
                        </p>
                    </div>

                    {itemData && (
                        <div className="card p-3">
                            <h5>Bill Summary</h5>
                            <div className="d-flex justify-content-between">
                                <span>Item Price</span>
                                <span>₹{itemPrice.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Tax (18%)</span>
                                <span>₹{taxAmount.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Delivery Charges</span>
                                <span>₹{deliveryCharge}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center mt-4">
                {loading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Processing...</span>
                    </div>
                ) : (
                    <button className="btn btn-success" onClick={handlepayment}>
                        Proceed to Confirm
                    </button>
                )}
            </div>
        </div>
    );
};
