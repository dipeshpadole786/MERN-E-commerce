import { api } from '../API_REQUEST/api';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const username = localStorage.getItem("username");
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const res = await api.get(`/your-order/${username}`);
            setOrders(res.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            alert("Error fetching orders");
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            getData();
        }
    }, []);

    // Calculate total price
    const totalPayment = orders.reduce((acc, order) => acc + Number(order.itemPrice), 0);

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center fw-bold">🛍️ Your Orders</h2>

            {/* Summary Section */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="border rounded p-3 shadow-sm bg-light">
                        <h5>Total Orders: <span className="text-primary">{orders.length}</span></h5>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="border rounded p-3 shadow-sm bg-light">
                        <h5>Total Payment: <span className="text-success">₹{totalPayment}</span></h5>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            {orders.length === 0 ? (
                <p className="text-center text-muted">No orders found.</p>
            ) : (
                <div className="row">
                    {orders.map((order, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card h-100 shadow-sm border-0">
                                <img
                                    src={order.itemImage}
                                    className="card-img-top"
                                    alt={order.itemName}
                                    style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{order.itemName}</h5>
                                    <p className="card-text text-secondary">Price: ₹{order.itemPrice}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Order;
