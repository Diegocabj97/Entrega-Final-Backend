import React, { createContext, useEffect, useState } from "react";
import { URLBACK } from "../App.jsx";
import getCookieValue from "../utils/getCookieValue.jsx";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState();

  const fetchCart = async () => {
    try {
      const cartId = localStorage.getItem("cartId");
      const user = localStorage.getItem("userData");
      const userRole = JSON.parse(user).role;
      const token = getCookieValue("jwtCookie");
      const response = await fetch(`${URLBACK}/api/carts/${cartId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
          role: userRole,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener el carrito con FETCH");
      }

      const data = await response.json();
      const cartData = data.payload.products;
      setCartId(cartId);
      setCart(cartData);
      localStorage.setItem("cart", JSON.stringify(cartData));
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
      localStorage.setItem("cartId", cartId);
      // Configurar un intervalo para llamar a fetchCart cada 5 minutos (puedes ajustar el tiempo según tus necesidades)
      const intervalId = setInterval(fetchCart, 5 * 1000);

      // Limpieza del intervalo al desmontar el componente
      return () => clearInterval(intervalId);
    }
  }, [cartId]);

  return (
    <CartContext.Provider
      value={{ cart, cartId, fetchCart, setCart, setCartId }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
