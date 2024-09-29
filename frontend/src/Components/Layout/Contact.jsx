import React, { useState } from 'react'
import "../../style/contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contactNumber: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (send to backend or display alert)
        alert("Form submitted successfully!");
    };

    return (
        <div className="contact-us-container">
            <div className="form-section">
                <h1 className="title">Here to <span className="highlight">help</span></h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full name*</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name..."
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email address*</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address..."
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Contact number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            placeholder="Enter your contact number..."
                        />
                    </div>
                    <div className="input-group">
                        <label>Message*</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Type your message here..."
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Send message ➔
                    </button>
                </form>
            </div>
            <div className="newsletter-section">
                <h2>Join our newsletter</h2>
                <p>
                    Add your details and you'll receive our quarterly email, including
                    what's happening with the wildlife, nature, and communities around
                    Lewa House.
                </p>
                <form>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email address..."
                            required
                        />
                    </div>
                    <button className="signup-button">Sign up ➔</button>
                </form>
                <div className="contact-info">
                    <h4>For bookings, rates & reservations:</h4>
                    <a href="#">Bush and Beyond</a>
                    <h4>Legal:</h4>
                    <a href="#">Terms & Conditions</a> | <a href="#">Privacy Policy</a> |{" "}
                    <a href="#">Cookie Policy</a>
                </div>
            </div>
        </div>
    )
}

export default Contact
