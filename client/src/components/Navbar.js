import { Link } from "react-router-dom";
import { UserContext } from "../Usercontext";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost/api/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setRedirect("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light border-bottom border-bottom-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          JourneyGenius
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <ul className="navbar-nav ml-auto mx-2 d-flex align-items-center">
            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="btn btn-primary rounded-pill gradient-button mx-2"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-primary rounded-pill gradient-button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <div className="d-flex align-items-center">
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="rounded-circle mx-2"
                      style={{ width: "42px", height: "44px" }}
                    />
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="btn btn-primary rounded-pill mx-2 gradient-button"
                    to="/register"
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-primary rounded-pill gradient-button"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
