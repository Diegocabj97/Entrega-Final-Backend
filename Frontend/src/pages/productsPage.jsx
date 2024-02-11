import React, { useContext, useEffect, useState } from "react";
import CardList from "../components/cards/cardList.jsx";
import {
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/navbar/navbar.jsx";
import { useNavigate } from "react-router-dom";
import getCookieValue from "../utils/getCookieValue.jsx";
import theme from "../utils/theme.js";
import HasCookie from "../utils/hasCookie.jsx";
import { useAuth } from "../context/authContext.jsx";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProds = async () => {
      try {
        // Simular un proceso de carga de 700ms antes de renderizar los productos
        setTimeout(() => {
          setLoading(false);
        }, 700);
      } catch (error) {
        setLoading(false); // Desactivar el loader en caso de error
      }
    };

    loadProds();
  }, []);
  return (
    <div>
      <div style={{ margin: "auto" }}>
        <Navbar />
        {loading ? (
          <CircularProgress size={48} />
        ) : (
          <div>
            <h1>Todos los productos!</h1>
            <CardList></CardList>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
