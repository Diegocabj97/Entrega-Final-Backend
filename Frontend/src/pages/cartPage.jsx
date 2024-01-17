import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import RestoreIcon from "@mui/icons-material/Restore";
import { CartContext } from "../context/cartContext.jsx";
import CartItems from "../components/cart/cartItems.jsx";

const CartPage = () => {
  const { cart, setCart, cartId } = useContext(CartContext);
  const navigate = useNavigate();
  const handleIndexClick = () => {
    navigate("/");
  };

  return cart.length < 0 ? (
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
      <div>Este es tu carrito </div>
      <CartItems key={id}></CartItems>
    </div>
  ) : (
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
      <h1>El carrito está vacío :(</h1>
      <CartItems key={`cart-items-${cartId}`} />
    </div>
  );
};

export default CartPage;
