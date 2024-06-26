import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; 

const Navbar = () => {
    return (
        <nav className="nav">
            <div className="main">
                <Link to="/">Home</Link>
                <Link to="/reviews">Reviews</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;
