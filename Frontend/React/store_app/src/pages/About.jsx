import React from 'react';
import '../styles/about.css';

const About = () => {
    return (
        <div>
            <section className="about-section">
                <h2>Our Story</h2>
                <p>Welcome to our store! We are dedicated to providing you with the best products at the best prices. Our journey began with a simple idea: to create a place where people can find quality products they love and trust.</p>
                <p>Our store started as a small family-owned business, and over the years, we have grown into a trusted name in the industry. We believe in offering only the best to our customers, and we are committed to providing exceptional service and a great shopping experience.</p>
            </section>

            <section className="about-section">
                <h2>Our Values</h2>
                <ul>
                    <li><strong>Quality:</strong> We are committed to offering products of the highest quality.</li>
                    <li><strong>Customer Satisfaction:</strong> Your satisfaction is our top priority. We strive to provide exceptional customer service.</li>
                    <li><strong>Integrity:</strong> We conduct our business with honesty and transparency.</li>
                    <li><strong>Innovation:</strong> We continuously seek to improve and innovate in all aspects of our business.</li>
                </ul>
            </section>
        </div>
    );
};

export default About;
