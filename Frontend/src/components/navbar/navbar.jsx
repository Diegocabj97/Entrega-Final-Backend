import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const hasCookie = () => {
    return document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("jwtCookie="));
  };
  return (
    <nav>
      <ul className="menu">
        <li>
          <a onClick={() => navigate("/allprods")}>Products</a>
        </li>

        <li>
          <a>Sessions</a>
          <ul className="submenu">
            {hasCookie() ? null : (
              <li>
                <a
                  style={{ textDecoration: "" }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </a>
              </li>
            )}
            {hasCookie() ? (
              <li>
                <a onClick={() => navigate("/logout")}>Logout</a>
              </li>
            ) : (
              <li>
                <a onClick={() => navigate("/login")}>Login</a>
              </li>
            )}
          </ul>
        </li>
        <li>
          <a onClick={() => navigate("/users")}>Users</a>
        </li>
        <li>
          <a>Contact</a>
          <ul className="submenu">
            <li>
              <a href="https://wa.me/5491159148462?text=Hola!%20Me%20comunico%20porque...">
                Whatsapp
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
