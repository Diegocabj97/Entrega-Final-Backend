import React, { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import theme from "../../utils/theme";
import { styled } from "@mui/system";
import { red } from "@mui/material/colors";

const ResponsiveMenu = styled("ul")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  listStyleType: "none",
  padding: 0,
  backgroundColor: theme.primaryColor,
  borderRadius: "10px",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "center",
  },
});
const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);

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
  const handleRegisterClick = () => {
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
      navigate("/register");
    }, 500);
  };

  const handleLoginClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 500);
  };
  const handleLogoutClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading2(false);
      navigate("/logout");
    }, 500);
  };
  return (
    <nav>
      <ResponsiveMenu className="menu">
        <li>
          <a>
            <BottomNavigation
              showLabels
              sx={{
                position: "absolute",
                justifySelf: "start",
                color: "white",
                width: "50%",
                backgroundColor: theme.primaryColor,
                borderRadius: "100px",
                boxShadow: "0px 5px 15px 5px rgba(0, 0, 0, 0.24)",
              }}
            >
              <BottomNavigationAction
                icon={<HomeIcon fontSize="large" />}
                sx={{ color: "inherit", borderRadius: "100px" }}
                label="Inicio"
                onClick={handleIndexClick}
                className="BackBtn"
              />
            </BottomNavigation>
          </a>
        </li>
        <li className="menuItem">
          <a onClick={() => navigate("/allprods")}>Products</a>
        </li>
        <li className="menuItem">
          <a>Sessions</a>
          <ResponsiveMenu className="submenu">
            {hasCookie() ? null : (
              <li>
                <a onClick={() => handleRegisterClick()}>
                  {error && <div style={{ color: "red" }}>{error}</div>}
                  {loading2 && (
                    <CircularProgress sx={{ color: "white" }} size={24} />
                  )}
                  Registrarse
                </a>
              </li>
            )}
            {hasCookie() ? (
              <li>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <a onClick={() => handleLogoutClick()}>
                  {loading2 && (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  )}
                  Logout
                </a>
              </li>
            ) : (
              <li>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <a onClick={() => handleLoginClick()}>
                  {loading && (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  )}
                  Login
                </a>
              </li>
            )}
          </ResponsiveMenu>
        </li>
        <li className="menuItem">
          <a onClick={() => navigate("/users")}>Users</a>
        </li>
        <li className="menuItem">
          <a>Contact</a>
          <ResponsiveMenu className="submenu">
            <li>
              <a href="https://wa.me/5491159148462?text=Hola!%20Me%20comunico%20porque...">
                Whatsapp
              </a>
            </li>
          </ResponsiveMenu>
        </li>
        <li>
          <a>
            <BottomNavigation
              showLabels
              sx={{
                position: "relative",
                justifySelf: "end",
                color: "white",
                width: "50%",
                backgroundColor: theme.primaryColor,
                borderRadius: "100px",
                boxShadow: "0px 5px 15px 5px rgba(0, 0, 0, 0.24)",
              }}
            >
              <BottomNavigationAction
                icon={<ShoppingCartIcon fontSize="large" />}
                sx={{
                  color: "inherit",
                  borderRadius: "100px",
                }}
                onClick={showCart}
              />
            </BottomNavigation>
          </a>
        </li>
      </ResponsiveMenu>
    </nav>
  );
};

export default Navbar;
