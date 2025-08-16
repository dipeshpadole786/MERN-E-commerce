import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Error = ({ code = 404, message = "Page Not Found" }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h1 className="display-1 fw-bold text-danger">{code}</h1>
      <p className="fs-3"><span className="text-danger">Oops!</span> {message}</p>
      <p className="lead">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/home" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default Error;
