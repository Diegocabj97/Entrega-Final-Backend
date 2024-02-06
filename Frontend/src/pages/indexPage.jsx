import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Navbar from "../components/navbar/navbar";
import theme from "../utils/theme";
const indexPage = () => {
  const navigate = useNavigate();
  const handleIndexClick = () => {
    navigate("/");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoutClick = () => {
    navigate("/logout");
  };
  const showCart = () => {
    navigate("/cart");
  };
  const hasCookie = () => {
    return document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("jwtCookie="));
  };
  return (
    <div>
      <Navbar />
      <div className="idxPage">
        {hasCookie ? (
          <BottomNavigation
            showLabels
            sx={{
              position: "absolute",
              justifySelf: "end",

              width: "7%",
              right: "20%",
              backgroundColor: theme.secondaryColor,
              borderRadius: "100px",
            }}
          >
            <BottomNavigationAction
              label="Cart"
              icon={<ShoppingCartIcon />}
              onClick={showCart}
            />
          </BottomNavigation>
        ) : null}
        <h2 sx={{ variant: "h1" }}>Bienvenido a mi entrega final de Backend</h2>
        <Stack marginTop={3} alignItems="center" spacing={3} direction="column">
          {hasCookie() ? (
            <Button
              onClick={handleLogoutClick}
              variant="contained"
              sx={{ width: "150px" }}
            >
              <div>Hacer logout</div>
            </Button>
          ) : (
            <Button
              onClick={handleLoginClick}
              variant="contained"
              sx={{ width: "150px" }}
            >
              <div>Ir al login</div>
            </Button>
          )}{" "}
          {!hasCookie() && (
            <Button
              onClick={handleRegisterClick}
              variant="contained"
              sx={{ width: "150px" }}
            >
              <div>Registrarse</div>
            </Button>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default indexPage;
