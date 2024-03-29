import React, { createContext, useContext, useEffect, useState } from "react";
import { URLBACK } from "../App.jsx";
import { CartContext } from "./cartContext.jsx";

const ProductsContext = createContext();

const ProdsProvider = ({ children }) => {
  const [prods, setProds] = useState([]);
  const [prodId, setProdId] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${URLBACK}/api/products`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data) {
          setProds(data.payload.docs);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (prods.length > 0) {
      const prodIds = prods.map((product) => product._id).join(",");
      setProdId(prodIds);
    }
  }, [prods]);
  return (
    <ProductsContext.Provider value={{ setProdId, setProds, prodId, prods }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProdsProvider, ProductsContext };
