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
import { Grid, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Cards = ({ product }) => {
  const { cart, setCart, cartId, fetchCart } = useContext(CartContext);
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
      if (cartId === undefined) {
        console.log("Debes iniciar sesión!");
        navigate("/login");
      } else {
        const response = await fetch(
          `${URLBACK}/api/carts/${cartId}/product/${product._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
        if (response.ok) {
          console.log(
            `${URLBACK}/api/carts/${cartId}/product/${product._id} ` +
              "Producto agregado al carrito"
          );
          // Actualizar el carrito en el estado local
          setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
          // Actualizar el carrito en el servidor
          fetchCart(cartId);
        }
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };
  return (
    <div>
      <Card sx={{ margin: "20px",minWidth: 220 ,maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <CardContent sx={{ height: 120 }}>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              handleClick();
              BuyButtonClick();
            }}
            disabled={product.stock === 0}
            variant="contained"
            color="success"
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
