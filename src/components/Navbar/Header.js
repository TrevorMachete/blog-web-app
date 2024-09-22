import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Import your Firebase authentication instance
import { useUser } from '../../UserContext'; // Import UserContext
import "../../App.css";

const Header = ({ navVisible, setNavVisible }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user, setUser } = useUser(); // Get user and setUser from UserContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase sign out method
      setUser(null); // Clear user context
      navigate("/login"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const toggleNav = () => {
    setNavVisible(!navVisible);
    if (window.innerWidth <= 770) {
      setDropdownVisible(!navVisible);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header>
      <div className="logo">
        <h1 className="logo-text">
          <Link to="/"><span>SAMA</span>SKIES</Link>
        </h1>
      </div>

      <i className="fa fa-bars menu-toggle" onClick={toggleNav}></i>

      <ul className={`nav ${navVisible ? "showing" : ""}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact Us</Link>
        </li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>

        <li>
          <a onClick={toggleDropdown}>
            <i className="fa fa-user"></i>
            {user ? user.username : "Login"}
            <i className="fa fa-chevron-down" style={{ fontSize: "0.8em" }}></i>
          </a>

          <ul className={`dropdown-menu ${dropdownVisible ? "showing" : ""}`}>
            <li>
              <Link to="/login" className="login">
                Login
              </Link>
            </li>

            <li>
              <Link to="/create-post">Create Post</Link>
            </li>
            <li>
              <a href="/recent-posts">My Posts</a>
            </li>
            <li>
              <a href="#" className="logout" onClick={handleLogout}>Logout{" "}</a>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
};

export default Header;
