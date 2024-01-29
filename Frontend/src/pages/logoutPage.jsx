import { Button, Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";

const LogoutPage = () => {
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  // Llama a la función al cargar la página de logout
  useEffect(() => {
    setCart([]);
    deleteCookie("jwtCookie");
    deleteCookie("cartId");
    localStorage.removeItem("cartId");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("userData");
    localStorage.removeItem("userEmail");
    setCart([""]);
    navigate("/logout");
  }, []);
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
