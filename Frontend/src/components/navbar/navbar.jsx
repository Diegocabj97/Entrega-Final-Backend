import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestoreIcon from "@mui/icons-material/Restore";
import HomeIcon from "@mui/icons-material/Home";
import theme from "../../utils/theme";
const Navbar = () => {
  const navigate = useNavigate();
  const showCart = () => {
    navigate("/cart");
  };
  const handleIndexClick = () => {
    navigate("/");
  };
  const hasCookie = () => {
    return document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("jwtCookie="));
  };
  return (
    <nav>
      <ul className="menu">
        <li>
          <a>
            <BottomNavigation
              showLabels
              sx={{
                position: "absolute",
                justifySelf: "start",
                color: "white",
                width: "100%",
                backgroundColor: theme.primaryColor,
                borderRadius: "100px",
              }}
            >
              <BottomNavigationAction
                icon={<HomeIcon fontSize="large" />}
                sx={{ color: "inherit" }}
                label="Inicio"
                onClick={handleIndexClick}
                className="BackBtn"
              />
            </BottomNavigation>
          </a>
        </li>
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
        <li>
          <a>
            <BottomNavigation
              showLabels
              sx={{
                position: "relative",
                alignItems: "center",
                justifySelf: "end",
                width: "7%",
                borderRadius: "100px",
                backgroundColor: theme.primaryColor,
              }}
            >
              <BottomNavigationAction
                icon={<ShoppingCartIcon fontSize="large" />}
                sx={{ color: "inherit" }}
                onClick={showCart}
              />
            </BottomNavigation>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
