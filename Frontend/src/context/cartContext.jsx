import React, { createContext, useEffect, useState } from "react";
import { URLBACK } from "../App.jsx";
import getCookieValue from "../utils/getCookieValue.jsx";
import { useAuth } from "./authContext.jsx";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token } = useAuth();
  const cartId = token ? token.cart : null;

  const fetchCart = async () => {
    try {
      const response = await fetch(`${URLBACK}/api/carts/${cartId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
          role: token.role,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener el carrito con FETCH");
      }

      const data = await response.json();
      const cartData = data.payload.products;
      setCart(cartData);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

  useEffect(() => {
    const hasCookie = document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("jwtCookie="));

    if (hasCookie && cartId) {
      fetchCart();
      // Configurar un intervalo para llamar a fetchCart cada 5 minutos (puedes ajustar el tiempo según tus necesidades)
      const intervalId = setInterval(fetchCart, 5 * 1000);

      // Limpieza del intervalo al desmontar el componente
      return () => clearInterval(intervalId);
    }
  }, [cartId]);

  return (
    <CartContext.Provider value={{ cart, cartId, fetchCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
