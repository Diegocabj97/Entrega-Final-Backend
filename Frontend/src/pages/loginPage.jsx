import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import Box from "@mui/material/Box";
import theme from "../utils/theme.js";
import { useAuth } from "../context/authContext.jsx";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isValidEmail = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    // Validaciones
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Ingrese un correo electrónico válido");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate("/allprods");
      window.location.reload();
      navigate("/allprods");
    } catch (error) {
      // Verifica si el error es por credenciales no válidas
      if (error.message.includes("Unauthorized")) {
        setError("Credenciales no válidas. Verifique su email y contraseña.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
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
          onClick={() => navigate("/")}
        />
      </BottomNavigation>

      <div className="regTitle">Inicio de sesión</div>

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

        <div>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Enviar"}
          </Button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </Box>
    </div>
  );
};

export default LoginPage;
