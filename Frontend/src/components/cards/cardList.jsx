import React, { useContext } from "react";
import { ProductsContext } from "../../context/prodsContext.jsx";
import { CartContext } from "../../context/cartContext.jsx";
import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import Cards from "./card.jsx";
const CardList = () => {
  const { cart, setCart } = useContext(CartContext);
  const { prods, prodId } = useContext(ProductsContext);
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "50px",
      }}
      fixed
    >
      {prods.map((prod) => (
        <div key={prod._id}>
          <Cards product={prod} prodId={prodId} />
        </div>
      ))}
    </Container>
  );
};

export default CardList;
