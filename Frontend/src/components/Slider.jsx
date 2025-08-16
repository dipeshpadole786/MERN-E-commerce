import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Slider.css"; // your custom styles

export const Slider = () => {
    return (
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="/images/Slider.png" className="d-block w-100 carousel-image" alt="Slide 1" />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                        <h5>Shop the Latest Gadgets</h5>
                        <p>Discover top tech at unbeatable prices.</p>
                    </div>
                </div>

                <div className="carousel-item">
                    <img src="/images/Slider2.png" className="d-block w-100 carousel-image" alt="Slide 2" />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                        <h5>New Arrivals in Store</h5>
                        <p>Check out our fresh electronics collection.</p>
                    </div>
                </div>

                <div className="carousel-item">
                    <img src="/images/slider3.png" className="d-block w-100 carousel-image" alt="Slide 3" />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                        <h5>Stylish & Smart</h5>
                        <p>Get the trendiest gadgets and wearables.</p>
                    </div>
                </div>

                <div className="carousel-item">
                    <img src="/images/slider4.png" className="d-block w-100 carousel-image" alt="Slide 4" />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                        <h5>Big Discounts</h5>
                        <p>Save more with our exclusive deals.</p>
                    </div>
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};
