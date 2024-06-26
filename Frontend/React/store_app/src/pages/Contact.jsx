import React from 'react';
import '../styles/contact.css';

const Contact = () => {
    return (
        <div>
            <div className="container">
                <h2>Contact Us</h2>
                
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>

                <button type="submit">Send</button>
            </div>
        </div>
    );
};

export default Contact;
