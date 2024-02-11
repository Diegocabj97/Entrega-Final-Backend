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
import theme from "../utils/theme.js";
import { CircularProgress } from "@mui/material";
import PasswordStr from "./pwStrong.jsx";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const RegisterPage = ({ score }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleIndexClick = () => {
    navigate("/");
  };
  const [values, setValues] = useState(initialState);

  const isUpperCase = (str) => /[A-Z]/.test(str);

  const isValidEmail = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (
      !values.first_name ||
      !values.last_name ||
      !values.email ||
      !values.password
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!isUpperCase(values.password)) {
      setError("La contraseña debe contener al menos una mayúscula");
      return;
    }

    if (!isValidEmail(values.email)) {
      setError("Ingrese un correo electrónico válido");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${URLBACK}/api/session/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        setValues(initialState);
        navigate("/login");
      } else if (response.status === 401) {
        setError("Error de autenticación");
      } else if (response.status === 400) {
        setError("Error en la solicitud");
      }

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setValues((prevValues) => ({ ...prevValues, password: value }));
  };

  return (
    <div className="regPage">
      <BottomNavigation
        showLabels
        sx={{
          position: "absolute",
          justifySelf: "end",
          width: "7%",
          right: "20%",
          backgroundColor: theme.primaryColor,
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

      <div className="regTitle">Por favor regístrese!</div>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
            label="Contraseña"
            name="password"
            value={values.password}
            onChange={(handleOnChange, handlePasswordChange)}
            type="password"
            autoComplete="current-password"
          />
          <div className="pwStrRow">
            {values.password.length >= 1 && (
              <div>
                <PasswordStr length={values.password.length} />
                <br></br>
              </div>
            )}
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Enviar"}
          </Button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      </Box>
    </div>
  );
};

export default RegisterPage;
