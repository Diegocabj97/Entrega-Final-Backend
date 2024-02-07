import React, { useContext, useEffect } from "react";
import CardList from "../components/cards/cardList.jsx";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Navbar from "../components/navbar/navbar.jsx";
import { useNavigate } from "react-router-dom";
import getCookieValue from "../utils/getCookieValue.jsx";
import theme from "../utils/theme.js";
const ProductsPage = () => {
  const hasCookie = () => {
    return document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("jwtCookie="));
  };

  const handleIndexClick = () => {
    navigate("/");
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Redirige a la página de inicio después de 5 segundos si no hay usuario
    const redirectIfNoUser = setTimeout(() => {
      const token = getCookieValue("jwtCookie");
      if (!token) {
        navigate("/");
      }
    }, 2000);

    return () => clearTimeout(redirectIfNoUser);
  }, [navigate]);
  return (
    <div>
      <div style={{ margin: "auto" }}>
        <Navbar />
        {hasCookie() ? (
          <div>
            <h1>Todos los productos!</h1>
            <CardList></CardList>
          </div>
        ) : (
          <div>
            <h1>Debes iniciar sesion para ver nuestra lista de productos!</h1>
            <h2>Serás redireccionado a la pagina de inicio...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
