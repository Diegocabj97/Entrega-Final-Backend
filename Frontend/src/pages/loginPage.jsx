import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import "./registerPage.css";
import Button from "@mui/material/Button";
import { URLBACK } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import { CartContext } from "../context/cartContext.jsx";
import Box from "@mui/material/Box";
import { UserContext } from "../context/userContext.jsx";
const initialState = {
  email: "",
  password: "",
};

const loginPage = () => {
  const { setCartId } = useContext(CartContext);
  const { user, userId, setUser, setUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const handleIndexClick = () => {
    navigate("/");
  };
  const [values, setValues] = useState(initialState);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${URLBACK}/api/session/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(values),
    });
    if (response.status == 200) {
      setValues(initialState);
      const datos = await response.json();
      setUser(JSON.stringify(datos.userInfo));
      setUserId(JSON.stringify(datos.userInfo._id));
      localStorage.setItem("userData", JSON.stringify(datos.userInfo));
      localStorage.setItem("userEmail", JSON.stringify(datos.userInfo.email));
      const { token } = datos;
      const idCart = JSON.parse(datos.cart);
      setCartId(idCart);

      const cookieOptions = {
        maxAge: 86400000, // Duración de la cookie en milisegundos (1 día)
      };
      document.cookie = `jwtCookie=${token}; max-age=${cookieOptions.maxAge}; path=/`;
      document.cookie = `cartId=${idCart}; max-age=${cookieOptions.maxAge}; path=/`;

      navigate("/");
      alert("Has iniciado sesión!");
    } else if (response.status === 401) {
      alert("Usuario no existente");
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div className="regPage">
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

      <div className="regTitle">Ahora inicie sesion!</div>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
          "& button": { m: 1 },
        }}
      >
        <div>
          <TextField
            id="outlined-basic"
            label="Email"
            name="email"
            value={values.email}
            onChange={handleOnChange}
            variant="outlined"
            autoComplete="current-email"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            name="password"
            value={values.password}
            onChange={handleOnChange}
            type="password"
            autoComplete="current-password"
          />
        </div>
      </Box>
      <div>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          size="medium"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default loginPage;
