import React, { createContext, useContext, useEffect, useState } from "react";
import { URLBACK } from "../App.jsx";
import { CartContext } from "./cartContext.jsx";

const ProductsContext = createContext();

const ProdsProvider = ({ children }) => {
  const [prod, setProds] = useState([]);
  const [prodId, setProdId] = useState();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${URLBACK}/api/products`);
        const data = await response.json();

        if (data) {
          setProds(data.payload.docs);
        } else {
          console.log({ error: "Productos no encontrados" });
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    getProducts();
  }, []);
  useEffect(() => {
    const prodIds = prod.map((product) => product._id).toString();
    setProdId(prodIds);
  });
  return (
    <ProductsContext.Provider value={{ setProdId, setProds, prodId, prod }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProdsProvider, ProductsContext };
