import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import { ProductsContext } from "../../context/prodsContext";
import { URLBACK } from "../../App.jsx";

const CartItems = () => {
  const { cart, cartId, setCartId, setCart } = useContext(CartContext);
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
 
  return cart.map((cartProduct) => (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <div key={cartProduct._id._id}>
        <div className="cartItem">
          <img
            className="cartItemImg"
            src={cartProduct._id.thumbnail}
            alt="products-card"
          />
          <div className="cartItem">
            <h3 className="cartItemName">{cartProduct._id.title}</h3>
            <h3 className="cartItemName">{cartProduct._id._id}</h3>
            <h4 className="cartItemPrice">${cartProduct._id.price}</h4>
            <p className="cartItemQuantity">Cantidad: {cartProduct.quantity}</p>
          </div>

          <div>
            <CloseIcon
              onClick={() => removeProductFromCart(cartProduct._id._id)}
              className="rmvBtn"
            />
          </div>
        </div>
      </div>
    </Grid>
  ));
};

export default CartItems;
