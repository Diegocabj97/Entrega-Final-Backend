import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./registerPage.css";
import Button from "@mui/material/Button";
import { URLBACK } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};
const RegisterPage = () => {
  const navigate = useNavigate();
  const handleIndexClick = () => {
    navigate("/");
  };
  const [values, setValues] = useState(initialState);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${URLBACK}/api/session/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status == 200) {
      setValues(initialState);
      navigate("/login");
      alert("Usuario registrado");
    } else if (response.status === 401) {
      alert("Usuario ya existente.");
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
      <div className="regTitle">Bienvenido!</div>

      <div className="regTitle">Por favor registrese!</div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
          "& button": { m: 1 },
        }}
      >
        <div>
          <TextField
            id="outlined-basic1"
            label="Nombre"
            name="first_name"
            value={values.first_name}
            onChange={handleOnChange}
            variant="outlined"
            autoComplete="current-first-name"
          />
          <TextField
            id="outlined-basic2"
            label="Apellido"
            name="last_name"
            value={values.last_name}
            onChange={handleOnChange}
            variant="outlined"
            autoComplete="current-last-name"
          />
          <TextField
            id="outlined-basic3"
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

export default RegisterPage;
