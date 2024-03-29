import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { URLBACK } from "../../App.jsx";
import "./cartItems.css";
import { useNavigate } from "react-router-dom";
import getCookieValue from "../../utils/getCookieValue.jsx";
import { UserContext } from "../../context/userContext.jsx";
import { useAuth } from "../../context/authContext.jsx";

const CartItems = () => {
  const { cart, fetchCart, setCart } = useContext(CartContext);
  const { token } = useAuth();
  const cartId = token.cart;
  const navigate = useNavigate();

  const createTicket = async () => {
    const userEmail = token.email;
    const response = await fetch(`${URLBACK}/api/carts/${cartId}/purchase`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "user-email": userEmail,
        authorization: `${token}`,
      },
    });
    if (response.status === 200) {
      alert("Muchas gracias por su compra. Recibirá un mail con los detalles.");
      navigate("/");
    }
    if (response.status === 401) {
      alert("Un elemento no tiene stock suficiente para finalizar la compra!");
    }
  };
  useEffect(() => {
    const intervalId = setInterval(fetchCart, 2000);
    return () => clearInterval(intervalId);
  }, [cart]);

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
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      fixed
    >
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
        marginTop="2rem"
      >
        {cart.map((cartProduct) => (
          <Grid item key={cartProduct._id._id} xs={12} sm={6} md={4} lg={3}>
            <Card className="cartItem">
              <div className="cartItemBody">
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="200"
                  image="https://i.ibb.co/5nqB61T/274-16-05-2023-06-05-49-placa-de-video-asus-3070-dual-oc.webp"
                />
                <Typography gutterBottom variant="h5" component="div">
                  {cartProduct._id.title}
                </Typography>
                <h4 className="cartItemPrice">${cartProduct._id.price}</h4>
                <p className="cartItemQuantity">
                  Cantidad: {cartProduct.quantity}
                </p>
              </div>
              <CloseIcon
                onClick={() => removeProductFromCart(cartProduct._id._id)}
                className="rmvBtn"
                sx={{
                  backgroundColor: "rgb(255, 116, 116);",
                  position: "relative",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={createTicket}
        disabled={cart.length === 0}
        variant="contained"
        color="success"
        margintop="2rem"
      >
        Finalizar Compra
      </Button>
    </Container>
  );
};

export default CartItems;
