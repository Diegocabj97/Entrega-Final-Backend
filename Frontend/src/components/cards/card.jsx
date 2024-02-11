import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CartContext } from "../../context/cartContext.jsx";
import { URLBACK } from "../../App.jsx";
import { useNavigate } from "react-router-dom";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import getCookieValue from "../../utils/getCookieValue.jsx";
import theme from "../../utils/theme.js";
import { useAuth } from "../../context/authContext.jsx";
const Cards = ({ product }) => {
  const { cart, setCart, fetchCart } = useContext(CartContext);
  const { token } = useAuth();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const navigate = useNavigate();
  const BuyButtonClick = () => {
    addToCart(product);
  };

  const addToCart = async (product) => {
    try {
      if (!token) {
        // Si no hay token, redirige a la página de inicio
        navigate("/login");
      } else {
        const cartId = token.cart;
        if (!cartId) {
          navigate("/login");
        } else {
          const response = await fetch(
            `${URLBACK}/api/carts/${cartId}/product/${product._id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                role: token.role,
              },
              body: JSON.stringify(product),
            }
          );
          if (response.ok) {
            // Actualizar el carrito en el estado local
            setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
            // Actualizar el carrito en el servidor
            fetchCart(cartId);
          }
        }
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };
  return (
    <div>
      <Card
        sx={{
          minWidth: 280,
          maxWidth: 280,
          maxHeight: 450,
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 0px 25px 0px rgba(15, 0, 90, 0.9)",
        }}
      >
        <CardContent
          sx={{ height: "fit-content", padding: "50px", textAlign: "center" }}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="150"
            image="https://i.ibb.co/5nqB61T/274-16-05-2023-06-05-49-placa-de-video-asus-3070-dual-oc.webp"
          />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px", maxHeight: 30 }}
          >
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <Button
            sx={{ backgroundColor: theme.secondaryColor }}
            onClick={() => {
              handleClick();
              BuyButtonClick();
            }}
            disabled={product.stock === 0}
            variant="contained"
          >
            Agregar al carrito
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Agregado al carrito!"
        action={action}
      />
    </div>
  );
};
export default Cards;
