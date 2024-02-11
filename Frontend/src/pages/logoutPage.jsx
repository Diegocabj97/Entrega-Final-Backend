import { Button, Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { useAuth } from "../context/authContext";

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Llama a la función al cargar la página de logout
  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      // Eliminar cookie y redirigir a la página de inicio
      document.cookie =
        "jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    };
    handleLogout();
  }, [logout, navigate]);
  const handleIndexClick = () => {
    navigate("/");
  };
  return (
    <div>
      <Stack marginTop={3} alignItems="center" spacing={3} direction="column">
        <div>Has cerrado sesión exitosamente.</div>
        <Button
          onClick={handleIndexClick}
          variant="contained"
          sx={{ width: "200px", height: "50px" }}
        >
          <div>Volver a la página principal</div>
        </Button>
      </Stack>
    </div>
  );
};

export default LogoutPage;
