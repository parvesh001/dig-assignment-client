import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../context/authContext";

export default function Navbar() {
  const { isLogedIn, logout } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-primary fw-bolder" to="/">
          DIG SIDEKICK TASK
        </NavLink>
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
          <ul className="navbar-nav mb-2 ms-auto mb-lg-0">
            {isLogedIn && (
              <li className="nav-item">
                <NavLink
                  className={(navData) =>
                    navData.isActive ? `nav-link active` : "nav-link"
                  }
                  aria-current="page"
                  to="/users"
                >
                  Users
                </NavLink>
              </li>
            )}
            {isLogedIn && (
              <li className="nav-item">
                <NavLink
                  className={(navData) =>
                    navData.isActive ? `nav-link active` : "nav-link"
                  }
                  to="/profile"
                >
                  Profile
                </NavLink>
              </li>
            )}
            {isLogedIn && (
              <button
                type="button"
                className="btn btn-primary ms-2"
                onClick={() => logout()}
              >
                Logout
              </button>
            )}
            {!isLogedIn && (
              <li className="nav-item">
                <NavLink
                  className={(navData) =>
                    navData.isActive ? `nav-link active` : "nav-link"
                  }
                  to="/registration"
                >
                  Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
