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

  const handleRegisterClick = () => {
    navigate("/register");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoutClick = () => {
    navigate("/logout");
  };

  const hasCookie = () =>
    document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("jwtCookie="));
  return (
    <div>
      <Navbar />
      <div className="idxPage">
        <h2 sx={{ variant: "h1" }}>Bienvenido a mi entrega final de Backend</h2>
        <Stack marginTop={3} alignItems="center" spacing={3} direction="column">
          {hasCookie() ? (
            <div>
              <Button
                onClick={handleLogoutClick}
                variant="contained"
                sx={{ width: "150px" }}
              >
                <div>Hacer logout</div>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={handleRegisterClick}
                variant="contained"
                sx={{ width: "150px" }}
              >
                <div>Registrarse</div>
              </Button>
              <Button
                onClick={handleLoginClick}
                variant="contained"
                sx={{ width: "150px", marginLeft: "10px" }}
              >
                <div>Ir al login</div>
              </Button>
            </div>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default indexPage;
