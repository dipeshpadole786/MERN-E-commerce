import "./Footer.css"

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* About Section */}
                <div className="footer-about">
                    <h2>Dipesh's E-Commerce</h2>
                    <p>Your one-stop shop for quality products at the best prices.</p>
                </div>

                {/* Contact Section */}
                <div className="footer-contact">
                    <h3>Contact Us</h3>
                    <p><strong>Name:</strong> Dipesh</p>
                    <p>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:dipeshpadole3@gmail.com">dipeshpadole3@gmail.com</a>
                    </p>
                    <p>
                        <strong>Phone:</strong>{" "}
                        <a href="tel:9356281561">9356281561</a>
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Shop</a></li>
                        <li><a href="#">Cart</a></li>
                        <li><a href="#">Orders</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Dipesh's E-Commerce | All Rights Reserved</p>
            </div>
        </footer>
    );
}

