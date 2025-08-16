import { Link } from "react-router-dom";

const Step3 = () => {
  return (
    <div className="container text-center mt-5">
      <h2 className="text-success">🎉 Thank You for Your Order!</h2>
      <p>Your order has been placed successfully. A confirmation email has been sent to your registered email.</p>
      <Link to="/home" className="btn btn-primary mt-3">Go to Homepage</Link>
    </div>
  );
};

export default Step3;
