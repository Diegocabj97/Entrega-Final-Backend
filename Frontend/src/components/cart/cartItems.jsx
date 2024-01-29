import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Grid } from "@mui/material";
import { URLBACK } from "../../App.jsx";
import "./cartItems.css";
import { useNavigate } from "react-router-dom";
import CardList from "../cards/cardList.jsx";

const CartItems = () => {
  const { cart, cartId, setCartId, setCart, fetchCart } =
    useContext(CartContext);
  const navigate = useNavigate();
  const createTicket = async () => {
    const idCart = localStorage.getItem("cartId");
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch(`${URLBACK}/api/carts/${idCart}/purchase`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "user-email": userEmail.email,
      },
    });
    if (response.status === 200) {
      navigate("/");
    }
  };
  useEffect(() => {
    const idCart = localStorage.getItem("cartId");
    const fetchCart = async () => {
      try {
        const response = await fetch(`${URLBACK}/api/carts/${idCart}`);
        if (!response.ok) {
          throw new Error("Error al obtener el carrito con FETCH");
        }

        const data = await response.json();
        const cartData = data.payload.products;
        setCartId(idCart);
        setCart(cartData);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };

    fetchCart();
  }, [cartId, setCartId, setCart]);

  const removeProductFromCart = async (productId) => {
    try {
      const response = await fetch(
        `${URLBACK}/api/carts/${cartId}/product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Actualizar el carrito después de eliminar el producto
        fetchCart(cartId);
      } else {
        console.error("Error al eliminar el producto del carrito.");
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      {cart.map((cartProduct) => (
        <Grid key={cartProduct._id._id} item xs={6} md={3}>
          <div className="cartItem">
            <img
              className="cartItemImg"
              src={cartProduct._id.thumbnail}
              alt="products-card"
            />
            <div className="cartItemBody">
              <h3 className="cartItemName">{cartProduct._id.title}</h3>
              <h4 className="cartItemPrice">${cartProduct._id.price}</h4>
              <p className="cartItemQuantity">
                Cantidad: {cartProduct.quantity}
              </p>
            </div>
            <div>
              <CloseIcon
                onClick={() => removeProductFromCart(cartProduct._id._id)}
                className="rmvBtn"
                sx={{
                  backgroundColor: "rgb(255, 116, 116);",
                  marginBottom: "-50px",
                }}
              />
            </div>
          </div>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          onClick={createTicket}
          disabled={cart.length === 0}
          variant="contained"
          color="success"
        >
          Finalizar Compra
        </Button>
      </Grid>
    </Grid>
  );
};

export default CartItems;
