import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RestoreIcon from "@mui/icons-material/Restore";
import { CartContext } from "../context/cartContext.jsx";
import CartItems from "../components/cart/cartItems.jsx";
import getCookieValue from "../utils/getCookieValue.jsx";

const CartPage = () => {
  const { cart, setCart, cartId, fetchCart } = useContext(CartContext);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
    }
  }, [setCart]);
  const hasCookie = () => {
    const hasCookie = getCookieValue("jwtCookie");
    return hasCookie !== null;
  };
  const hasCartItems = cart && cart.length > 0;

  const navigate = useNavigate();
  const handleIndexClick = () => {
    navigate("/allprods");
  };

  return (
    <div>
      <BottomNavigation
        showLabels
        sx={{
          width: "10%",
          backgroundColor: "rgb(206, 206, 206)",
          borderRadius: "100px",
        }}
      >
        <BottomNavigationAction
          label="Volver"
          icon={<RestoreIcon />}
          onClick={handleIndexClick}
        />
      </BottomNavigation>
      {hasCookie() ? (
        <div>
          <h1>
            {hasCartItems ? "Este es tu carrito" : "Tu carrito está vacío"}
          </h1>
          {hasCartItems && <CartItems key={`cart-items-${cartId}`} />}
        </div>
      ) : (
        <h1>Tu carrito está vacío</h1>
      )}
    </div>
  );
};

export default CartPage;
